import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, AlertCircle, ArrowLeft, Save, FileText } from "lucide-react";
import {
  listAdminPackages, deleteAdminPackage, getAdminPackageById,
  createAdminPackage, updateAdminPackage, type AdminPackage, type AdminPackageInsert
} from "@/services/adminPackageService";
import { listCategories } from "@/services/categoryService";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) =>
  <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

// ─── List ─────────────────────────────────────────────────────────────────────

export function AdminPackages() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminPackage | null>(null);

  const filters = categoryFilter === "all" ? { search } : { search, category_id: categoryFilter };

  const { data: packages, isLoading } = useQuery({
    queryKey: ["admin-packages", search, categoryFilter],
    queryFn: () => listAdminPackages(filters).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories", ""],
    queryFn: () => listCategories("").then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminPackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Package deleted");
    },
    onError: () => toast.error("Failed to delete package"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Packages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage tour packages, itineraries, and inclusions.</p>
        </div>
        <Link to="/admin/content/packages/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add Package
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search packages..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={inputCls + " w-auto pr-8"}>
          <option value="all">All Categories</option>
          {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !packages?.length ? (
          <div className="p-12 text-center text-gray-400"><FileText size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No packages found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Title","Destination","Duration","Status","Featured","Actions"].map(h=><th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800 max-w-xs truncate">{pkg.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{pkg.slug}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {pkg.destination || "—"} {pkg.state ? `(${pkg.state})` : ""}
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{pkg.duration_label || "—"}</td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${pkg.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{pkg.active ? "Active" : "Inactive"}</span></td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${pkg.featured ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>{pkg.featured ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/packages/${pkg.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(pkg)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.title}"?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{deleteMutation.isPending ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

const defaultForm: AdminPackageInsert = {
  title: "", slug: "", destination: "", state: "", short_description: "", overview: "",
  duration_label: "", best_season: "", group_suitability: "", hotel_category_hint: "",
  image_url: "", badge: "", customizable: true, featured: false, active: true, trending: false,
  popularity_score: 50, sort_order: 0, seo_title: "", seo_description: "",
  highlights: [], inclusions: [], exclusions: [],
};

function slugify(t: string) { return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

export function PackageForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminPackageInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [newListVal, setNewListVal] = useState({ highlights: "", inclusions: "", exclusions: "" });

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-package", id],
    queryFn: () => getAdminPackageById(id!).then(r => r.data),
    enabled: isEdit,
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories", ""],
    queryFn: () => listCategories("").then(r => r.data ?? []),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof AdminPackageInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as AdminPackageInsert;
      if (key === "title" && autoSlug) (next as any).slug = slugify(String(value));
      return next;
    });
  };

  const addToList = (field: "highlights" | "inclusions" | "exclusions") => {
    const val = newListVal[field].trim();
    if (val) {
      set(field, [...(form[field] || []), val]);
      setNewListVal(p => ({ ...p, [field]: "" }));
    }
  };

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateAdminPackage(id!, form) : createAdminPackage(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Package updated" : "Package created");
      navigate("/admin/content/packages");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/packages")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Package" : "New Package"}</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.title || !form.slug || !form.category_id) return toast.error("Title, slug, and category required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Core Details</h2>
            <Field label="Title *"><input type="text" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Majestic Kashmir Tour" className={inputCls} required /></Field>
            
            <div className="grid grid-cols-2 gap-4">
              <Field label="URL Slug *">
                <div className="flex gap-2">
                  <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} className={inputCls + " flex-1"} required />
                  <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.title)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
                </div>
              </Field>
              <Field label="Category *">
                <select value={form.category_id || ""} onChange={e => set("category_id", e.target.value)} className={inputCls} required>
                  <option value="" disabled>Select category...</option>
                  {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Primary Destination"><input type="text" value={form.destination ?? ""} onChange={e => set("destination", e.target.value)} placeholder="e.g. Srinagar" className={inputCls} /></Field>
              <Field label="State/Region"><input type="text" value={form.state ?? ""} onChange={e => set("state", e.target.value)} placeholder="e.g. Jammu & Kashmir" className={inputCls} /></Field>
            </div>

            <Field label="Short Description"><textarea value={form.short_description ?? ""} onChange={e => set("short_description", e.target.value)} rows={2} className={inputCls} /></Field>
            <Field label="Main Image Path"><input type="text" value={form.image_url ?? ""} onChange={e => set("image_url", e.target.value)} placeholder="package-images/kashmir/card.webp" className={inputCls} /></Field>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">At A Glance</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Duration Label"><input type="text" value={form.duration_label ?? ""} onChange={e => set("duration_label", e.target.value)} placeholder="e.g. 5 Days / 4 Nights" className={inputCls} /></Field>
              <Field label="Best Season"><input type="text" value={form.best_season ?? ""} onChange={e => set("best_season", e.target.value)} placeholder="e.g. April to October" className={inputCls} /></Field>
              <Field label="Group Suitability"><input type="text" value={form.group_suitability ?? ""} onChange={e => set("group_suitability", e.target.value)} placeholder="e.g. Family, Couples" className={inputCls} /></Field>
              <Field label="Hotel Category"><input type="text" value={form.hotel_category_hint ?? ""} onChange={e => set("hotel_category_hint", e.target.value)} placeholder="e.g. Premium (4-Star)" className={inputCls} /></Field>
            </div>
          </section>

          {(["highlights", "inclusions", "exclusions"] as const).map(field => (
            <section key={field} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3 capitalize">{field}</h2>
              <div className="space-y-2">
                {(form[field] || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">{item}</span>
                    <button type="button" onClick={() => set(field, (form[field] || []).filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newListVal[field]} onChange={e => setNewListVal(p => ({ ...p, [field]: e.target.value }))} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addToList(field); } }} placeholder={`Add ${field.slice(0, -1)}...`} className={inputCls + " flex-1"} />
                <button type="button" onClick={() => addToList(field)} className="px-4 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200"><Plus size={14}/></button>
              </div>
            </section>
          ))}
          
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <Field label="SEO Title"><input type="text" value={form.seo_title ?? ""} onChange={e => set("seo_title", e.target.value)} className={inputCls} /></Field>
            <Field label="Meta Description"><textarea value={form.seo_description ?? ""} onChange={e => set("seo_description", e.target.value)} rows={2} className={inputCls} /></Field>
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Internal / Admin</h2>
            <Field label="Base Cost Pricing (Internal)">
              <input type="number" value={form.internal_base_price ?? ""} onChange={e => set("internal_base_price", e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g. 15000" className={inputCls} />
              <p className="text-[10px] text-gray-400 mt-1">Never shown to customers, used for quoting margins.</p>
            </Field>
            <Field label="Internal Ops Notes">
              <textarea value={form.internal_notes ?? ""} onChange={e => set("internal_notes", e.target.value)} rows={4} placeholder="Vendor contacts, margin notes..." className={inputCls} />
            </Field>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Publish</h2>
            {[
              { label: "Active on site", key: "active" },
              { label: "Featured", key: "featured" },
              { label: "Trending", key: "trending" },
              { label: "Customizable", key: "customizable" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <Toggle checked={!!(form as any)[key]} onChange={v => set(key as any, v)} />
              </label>
            ))}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls} /></Field>
              <Field label="Popularity"><input type="number" min="0" max="100" value={form.popularity_score} onChange={e => set("popularity_score", Number(e.target.value))} className={inputCls} /></Field>
            </div>
            <Field label="Card Badge Text"><input type="text" value={form.badge ?? ""} onChange={e => set("badge", e.target.value)} placeholder="e.g. Best Seller" className={inputCls} /></Field>
          </section>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Package"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/packages")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
