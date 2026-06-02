import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { getAdminCraftById, createAdminCraft, updateAdminCraft, AdminCraftInsert } from "@/services/adminCraftService";
import { MediaInput } from "@/components/admin/MediaInput";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

const defaultForm: AdminCraftInsert = {
  craft_id: "",
  name: "",
  state: "",
  city: "",
  description: "",
  image: "",
  color_hex: "#F59E0B"
};

function slugify(t: string) { return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
}

export function CraftForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminCraftInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const { data: existing, isLoading: editLoading } = useQuery({
    queryKey: ["admin-craft", id],
    queryFn: () => getAdminCraftById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof AdminCraftInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as AdminCraftInsert;
      if (key === "name" && autoSlug) (next as any).craft_id = slugify(String(value));
      return next;
    });
  };

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateAdminCraft(id!, form) : createAdminCraft(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-crafts"] });
      toast.success(isEdit ? "Craft updated" : "Craft created");
      navigate("/admin/content/crafts");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && editLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/crafts")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Craft" : "Add Craft"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Changes reflect directly on the Indian Crafts page.</p>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.name || !form.craft_id) return toast.error("Name and ID required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Core Details</h2>
            <Field label="Craft Name *"><input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Phulkari Embroidery" className={inputCls} required /></Field>
            <Field label="Unique ID / Slug *">
              <div className="flex gap-2">
                <input type="text" value={form.craft_id} onChange={e => { setAutoSlug(false); set("craft_id", e.target.value); }} className={inputCls + " flex-1"} required />
                <button type="button" onClick={() => { setAutoSlug(true); set("craft_id", slugify(form.name)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="State *"><input type="text" value={form.state} onChange={e => set("state", e.target.value)} placeholder="e.g. Punjab" className={inputCls} required /></Field>
              <Field label="City"><input type="text" value={form.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Patiala" className={inputCls} /></Field>
            </div>
            <Field label="Description *"><textarea value={form.description} onChange={e => set("description", e.target.value)} rows={4} placeholder="Describe the craft and its history..." className={inputCls} required /></Field>
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Media & Appearance</h2>
            <Field label="Image Path or URL *">
              <MediaInput value={form.image} onChange={v => set("image", v)} defaultBucket="site-assets" placeholder="e.g. https://commons.wikimedia..." />
            </Field>
            <Field label="Accent Color Hex *">
              <div className="flex gap-2 items-center">
                <input type="color" value={form.color_hex} onChange={e => set("color_hex", e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" value={form.color_hex} onChange={e => set("color_hex", e.target.value)} className={inputCls + " flex-1"} required />
              </div>
            </Field>
          </section>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Craft"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/crafts")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
