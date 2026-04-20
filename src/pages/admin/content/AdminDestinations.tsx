import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { Plus, Search, Pencil, Trash2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import {
  listAdminDestinations, deleteAdminDestination, getAdminDestinationById,
  createAdminDestination, updateAdminDestination, type AdminDestination, type AdminDestinationInsert
} from "@/services/adminDestinationService";
import { MediaInput } from "@/components/admin/MediaInput";
import { useValidatedImage } from "@/hooks/useValidatedImage";

function DestinationImagePreview({ dest }: { dest: AdminDestination }) {
  const { src, onError } = useValidatedImage(dest.hero_image_url || dest.image_url, dest.slug);
  return <img src={src} onError={onError} alt={dest.name} className="w-12 h-12 min-w-[3rem] object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50" />;
}

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

// ─── List ─────────────────────────────────────────────────────────────────────

export function AdminDestinations() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminDestination | null>(null);

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["admin-destinations", search],
    queryFn: () => listAdminDestinations({ search }).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminDestination(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Destination deleted");
    },
    onError: () => toast.error("Failed to delete destination"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Destinations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all travel destinations with content, imagery, and SEO metadata.</p>
        </div>
        <Link to="/admin/content/destinations/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add Destination
        </Link>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search destinations..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !destinations?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No destinations found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Image", "Name","State","Featured","Trending","Active","Actions"].map(h=>(
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0 items-center">
                    <td className="px-5 py-3"><DestinationImagePreview dest={dest as AdminDestination} /></td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">{dest.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{dest.slug}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{dest.state}</td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${dest.featured ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>{dest.featured ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${dest.trending ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-400"}`}>{dest.trending ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${dest.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{dest.active ? "Active" : "Inactive"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/destinations/${dest.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(dest)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
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
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.name}"?</h3>
            <p className="text-sm text-gray-400 mb-6">This will permanently remove this destination. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{deleteMutation.isPending ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

const defaultForm: AdminDestinationInsert = {
  name: "", slug: "", tagline: "", state: "", short_description: "", best_season: "",
  ideal_duration: "", difficulty: "Easy", image_url: "", hero_image_url: "",
  featured: false, active: true, trending: false, popularity_score: 50, sort_order: 0,
  seo_title: "", seo_description: "", overview: [], highlights: [], travel_tips: [],
};

function slugify(t: string) { return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
}

export function DestinationForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminDestinationInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [newTip, setNewTip] = useState("");

  const { data: existing, isLoading: editLoading } = useQuery({
    queryKey: ["admin-destination", id],
    queryFn: () => getAdminDestinationById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof AdminDestinationInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as AdminDestinationInsert;
      if (key === "name" && autoSlug) (next as any).slug = slugify(String(value));
      return next;
    });
  };

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateAdminDestination(id!, form) : createAdminDestination(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Destination updated" : "Destination created");
      navigate("/admin/content/destinations");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && editLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/destinations")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Destination" : "Add Destination"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Changes affect the live destination pages and mega menu.</p>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.name || !form.slug) return toast.error("Name and slug required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Core Details</h2>
            <Field label="Name *"><input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Varanasi" className={inputCls} required /></Field>
            <Field label="URL Slug *">
              <div className="flex gap-2">
                <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} className={inputCls + " flex-1"} required />
                <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.name)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
              </div>
              <p className="text-xs text-gray-400 mt-1">/destinations/[state-slug]/<strong>{form.slug || "slug"}</strong></p>
            </Field>
            <Field label="Tagline"><input type="text" value={form.tagline ?? ""} onChange={e => set("tagline", e.target.value)} placeholder="e.g. Where Eternity Meets the River Ganga" className={inputCls} /></Field>
            <Field label="State"><input type="text" value={form.state ?? ""} onChange={e => set("state", e.target.value)} placeholder="e.g. Uttar Pradesh" className={inputCls} /></Field>
            <Field label="Short Description"><textarea value={form.short_description ?? ""} onChange={e => set("short_description", e.target.value)} rows={3} className={inputCls} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Best Season"><input type="text" value={form.best_season ?? ""} onChange={e => set("best_season", e.target.value)} placeholder="October to March" className={inputCls} /></Field>
              <Field label="Ideal Duration"><input type="text" value={form.ideal_duration ?? ""} onChange={e => set("ideal_duration", e.target.value)} placeholder="3-5 days" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Difficulty">
                <select value={form.difficulty ?? "Easy"} onChange={e => set("difficulty", e.target.value as any)} className={inputCls}>
                  <option>Easy</option><option>Moderate</option><option>Challenging</option>
                </select>
              </Field>
              <Field label="Popularity Score (0–100)"><input type="number" min="0" max="100" value={form.popularity_score ?? 50} onChange={e => set("popularity_score", Number(e.target.value))} className={inputCls} /></Field>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Images</h2>
            <Field label="Card Image Path"><MediaInput value={form.image_url ?? ""} onChange={v => set("image_url", v)} defaultBucket="destination-images" placeholder="destination-images/varanasi/card.webp" /></Field>
            <Field label="Hero Image Path"><MediaInput value={form.hero_image_url ?? ""} onChange={v => set("hero_image_url", v)} defaultBucket="destination-images" placeholder="destination-images/varanasi/hero.webp" /></Field>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Travel Tips</h2>
            <div className="space-y-2">
              {(form.travel_tips ?? []).map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">{tip}</span>
                  <button type="button" onClick={() => set("travel_tips", (form.travel_tips ?? []).filter((_,j) => j !== i))} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newTip} onChange={e => setNewTip(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (newTip.trim()) { set("travel_tips", [...(form.travel_tips ?? []), newTip.trim()]); setNewTip(""); }}}} placeholder="Add a travel tip (Enter to add)..." className={inputCls + " flex-1"} />
              <button type="button" onClick={() => { if (newTip.trim()) { set("travel_tips", [...(form.travel_tips ?? []), newTip.trim()]); setNewTip(""); }}} className="px-4 py-2.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200"><Plus size={14}/></button>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <Field label="SEO Title"><input type="text" value={form.seo_title ?? ""} onChange={e => set("seo_title", e.target.value)} className={inputCls} /></Field>
            <Field label="SEO Description"><textarea value={form.seo_description ?? ""} onChange={e => set("seo_description", e.target.value)} rows={2} className={inputCls} /></Field>
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Publish Settings</h2>
            {[
              { label: "Active on site", key: "active" },
              { label: "Featured", key: "featured" },
              { label: "Trending", key: "trending" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <Toggle checked={!!(form as any)[key]} onChange={v => set(key as any, v)} />
              </label>
            ))}
            <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls + " w-24"} /></Field>
          </section>
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Destination"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/destinations")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
