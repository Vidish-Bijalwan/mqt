import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { getStateById, createState, updateState, type StateUTInsert } from "@/services/stateService";

const REGIONS = ["North India", "South India", "East India", "West India", "Central India", "North East India", "Island Territories"];

const defaultForm: StateUTInsert = {
  name: "", slug: "", type: "State", region: "North India",
  short_description: "", best_season: "", featured: false, active: true,
  sort_order: 0, image_url: "",
};

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function StateForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<StateUTInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const { data: existing, isLoading: editLoading } = useQuery({
    queryKey: ["admin-state", id],
    queryFn: () => getStateById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof StateUTInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as StateUTInsert;
      if (key === "name" && autoSlug) {
        (next as any).slug = slugify(String(value));
      }
      return next;
    });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (isEdit) return updateState(id!, form);
      return createState(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-states"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "State updated" : "State created");
      navigate("/admin/content/states");
    },
    onError: (e: Error) => toast.error(e.message ?? "Failed to save"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) return toast.error("Name and slug are required");
    mutation.mutate();
  };

  if (isEdit && editLoading) {
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/states")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit State / UT" : "Add State / UT"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">All changes affect the live public website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Basic Information</h2>

            <Field label="Name *">
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Rajasthan" className={inputCls} required />
            </Field>

            <Field label="URL Slug *">
              <div className="flex items-center gap-2">
                <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} placeholder="e.g. rajasthan" className={inputCls + " flex-1"} required />
                <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.name)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Used in URL: /destinations/<strong>{form.slug || "slug"}</strong></p>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Type">
                <select value={form.type} onChange={e => set("type", e.target.value)} className={inputCls}>
                  <option value="State">State</option>
                  <option value="Union Territory">Union Territory</option>
                </select>
              </Field>
              <Field label="Region">
                <select value={form.region} onChange={e => set("region", e.target.value)} className={inputCls}>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Short Description">
              <textarea value={form.short_description ?? ""} onChange={e => set("short_description", e.target.value)} rows={3} placeholder="Brief description for cards and SEO..." className={inputCls} />
            </Field>

            <Field label="Best Season">
              <input type="text" value={form.best_season ?? ""} onChange={e => set("best_season", e.target.value)} placeholder="e.g. October to March" className={inputCls} />
            </Field>

            <Field label="Hero Image URL">
              <input type="text" value={form.image_url ?? ""} onChange={e => set("image_url", e.target.value)} placeholder="e.g. states/rajasthan/hero.webp" className={inputCls} />
            </Field>

            <Field label="Sort Order">
              <input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls + " w-24"} />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Publish Settings</h2>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-600">Active on site</span>
              <Toggle checked={form.active} onChange={v => set("active", v)} />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-600">Featured</span>
              <Toggle checked={form.featured} onChange={v => set("featured", v)} />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors">
              <Save size={16} />
              {mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create State"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/states")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}
