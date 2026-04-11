import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { getCategoryById, createCategory, updateCategory, type CategoryInsert } from "@/services/categoryService";

const defaultForm: CategoryInsert = {
  name: "", slug: "", summary: "", best_for: [], hero_image_url: "",
  featured: false, active: true, sort_order: 0, seo_title: "", seo_description: "",
};

function slugify(t: string) { return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

export default function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<CategoryInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [newTag, setNewTag] = useState("");

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-category", id],
    queryFn: () => getCategoryById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof CategoryInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as CategoryInsert;
      if (key === "name" && autoSlug) (next as any).slug = slugify(String(value));
      return next;
    });
  };

  const addBestFor = () => {
    if (!newTag.trim()) return;
    set("best_for", [...(form.best_for ?? []), newTag.trim()]);
    setNewTag("");
  };

  const removeBestFor = (idx: number) => {
    set("best_for", (form.best_for ?? []).filter((_, i) => i !== idx));
  };

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateCategory(id!, form) : createCategory(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Category updated" : "Category created");
      navigate("/admin/content/categories");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/categories")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Category" : "Add Category"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Changes affect the package mega menu and discovery section.</p>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.name || !form.slug) return toast.error("Name and slug required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Category Details</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name *</label>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Heritage Trails" className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">URL Slug *</label>
              <div className="flex gap-2">
                <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} className={inputCls + " flex-1"} required />
                <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.name)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Summary</label>
              <textarea value={form.summary} onChange={e => set("summary", e.target.value)} rows={3} placeholder="Curated editorial summary for package discovery..." className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Best For Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(form.best_for ?? []).map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeBestFor(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={11}/></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addBestFor())} placeholder="Add tag (Enter to add)..." className={inputCls + " flex-1"} />
                <button type="button" onClick={addBestFor} className="px-3 py-2.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200"><Plus size={14}/></button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hero Image Path</label>
              <input type="text" value={form.hero_image_url ?? ""} onChange={e => set("hero_image_url", e.target.value)} placeholder="categories/heritage-trails/hero.webp" className={inputCls} />
            </div>
          </section>
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">SEO Title</label>
              <input type="text" value={form.seo_title ?? ""} onChange={e => set("seo_title", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">SEO Description</label>
              <textarea value={form.seo_description ?? ""} onChange={e => set("seo_description", e.target.value)} rows={2} className={inputCls} />
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Settings</h2>
            {[
              { label: "Active on site", key: "active" as keyof CategoryInsert },
              { label: "Featured", key: "featured" as keyof CategoryInsert },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <button type="button" onClick={() => set(key, !form[key])} className={`relative w-10 h-5 rounded-full transition-colors ${form[key] ? "bg-emerald-500" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </label>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls + " w-24"} />
            </div>
          </section>
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Category"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/categories")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
