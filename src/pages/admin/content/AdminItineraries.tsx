import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus, Search, Pencil, Trash2, AlertCircle, ArrowLeft, Save,
  FileText, ChevronUp, ChevronDown, GripVertical, ExternalLink,
} from "lucide-react";
import {
  listAdminItineraries, deleteAdminItinerary, getAdminItineraryById,
  getAdminItineraryBySlug, createAdminItinerary, updateAdminItinerary,
  listItineraryDays, replaceItineraryDays,
  type AdminItinerary, type AdminItineraryInsert,
} from "@/services/itineraryService";
import { MediaInput } from "@/components/admin/MediaInput";
import { itineraries as staticItineraries } from "@/data/itineraries";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) =>
  <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

const REGIONS = [
  "North India", "East India", "Central India", "West India", "South India",
] as const;

// ─── List ─────────────────────────────────────────────────────────────────────

export function AdminItineraries() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminItinerary | null>(null);

  const filters = {
    search: search || undefined,
    region: regionFilter === "all" ? undefined : regionFilter,
  };

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-itineraries", search, regionFilter],
    queryFn: () => listAdminItineraries(filters).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminItinerary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-itineraries"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Itinerary deleted");
    },
    onError: () => toast.error("Failed to delete itinerary"),
  });

  const importMutation = useMutation({
    mutationFn: async () => {
      let imported = 0;
      for (const it of staticItineraries) {
        const { data: existing } = await getAdminItineraryBySlug(it.slug);
        if (existing) continue;

        const payload: AdminItineraryInsert = {
          slug: it.slug,
          package_name: it.packageName,
          region: it.region,
          duration_label: it.duration,
          days: it.days,
          nights: it.nights,
          places_covered: it.placesCovered,
          starting_point: it.startingPoint,
          ending_point: it.endingPoint,
          short_description: it.shortDescription,
          image_url: it.image || null,
          highlights: it.highlights,
          inclusions: it.inclusions,
          exclusions: it.exclusions,
          category_tags: it.categoryTags,
          starting_price: it.pricing.startingPrice,
          price_label: it.pricing.priceLabel,
          price_disclaimer: it.pricing.priceDisclaimer,
          seo_title: it.seoTitle,
          seo_description: it.seoDescription,
          active: true,
          featured: false,
          sort_order: 0,
        };
        const { data: created, error } = await createAdminItinerary(payload);
        if (error || !created) continue;

        await replaceItineraryDays(
          created.id,
          it.dayWiseItinerary.map(d => ({
            day_number: d.day,
            title: d.title,
            description: d.description,
          }))
        );
        imported++;
      }
      return imported;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["admin-itineraries"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(`Imported ${count} itineraries from static data`);
    },
    onError: () => toast.error("Import failed — check console"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Itineraries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage full day-wise itineraries shown on /itineraries.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => importMutation.mutate()}
            disabled={importMutation.isPending}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {importMutation.isPending ? "Importing…" : "Import Static"}
          </button>
          <Link to="/admin/content/itineraries/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
            <Plus size={16} /> Add Itinerary
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search itineraries…" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className={inputCls + " w-auto pr-8"}>
          <option value="all">All Regions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : !items?.length ? (
          <div className="p-12 text-center text-gray-400">
            <FileText size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No itineraries yet</p>
            <p className="text-sm mt-1">Click "Import Static" to load existing itineraries, or add a new one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Package", "Region", "Duration", "Status", "Featured", "Actions"].map(h =>
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800 max-w-xs truncate">{it.package_name}</div>
                      <div className="text-xs text-gray-400 font-mono">{it.slug}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{it.region}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{it.duration_label || `${it.days}D / ${it.nights}N`}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${it.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                        {it.active ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${it.featured ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                        {it.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <a
                        href={`/itineraries/${it.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={it.active ? "View on site (new tab)" : "View on site — publish first for DB version; static fallback may still show"}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <Link to={`/admin/content/itineraries/${it.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><Pencil size={15} /></Link>
                      <button onClick={() => setDeleteTarget(it)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={15} /></button>
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
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.package_name}"?</h3>
            <p className="text-sm text-gray-400 mb-6">This will also delete all day-wise entries. Cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
                {deleteMutation.isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Day editor type ──────────────────────────────────────────────────────────

interface DayDraft {
  day_number: number;
  title: string;
  description: string;
}

// ─── Form ─────────────────────────────────────────────────────────────────────

const defaultForm: AdminItineraryInsert = {
  slug: "", package_name: "", region: "North India",
  duration_label: "", days: 1, nights: 0,
  places_covered: [], starting_point: "", ending_point: "",
  short_description: "", image_url: null,
  highlights: [], inclusions: [], exclusions: [], category_tags: [],
  starting_price: null, price_label: "", price_disclaimer: "",
  seo_title: "", seo_description: "",
  active: false, featured: false, sort_order: 0,
};

function slugify(t: string) {
  return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function ItineraryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminItineraryInsert>(defaultForm);
  const [days, setDays] = useState<DayDraft[]>([]);
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [newListVal, setNewListVal] = useState({
    highlights: "", inclusions: "", exclusions: "", category_tags: "", places_covered: "",
  });

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-itinerary", id],
    queryFn: () => getAdminItineraryById(id!).then(r => r.data),
    enabled: isEdit,
  });

  const { data: existingDays } = useQuery({
    queryKey: ["admin-itinerary-days", id],
    queryFn: () => listItineraryDays(id!).then(r => r.data ?? []),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  useEffect(() => {
    if (existingDays) {
      setDays(existingDays.map(d => ({
        day_number: d.day_number,
        title: d.title,
        description: d.description,
      })));
    }
  }, [existingDays]);

  const set = (key: keyof AdminItineraryInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as AdminItineraryInsert;
      if (key === "package_name" && autoSlug) (next as any).slug = slugify(String(value));
      return next;
    });
  };

  const addToList = (field: "highlights" | "inclusions" | "exclusions" | "category_tags" | "places_covered") => {
    const val = newListVal[field].trim();
    if (val) {
      set(field, [...(form[field] || []), val]);
      setNewListVal(p => ({ ...p, [field]: "" }));
    }
  };

  // Day editor helpers
  const addDay = () => {
    const next = days.length + 1;
    setDays(prev => [...prev, { day_number: next, title: `Day ${next}:`, description: "" }]);
  };

  const removeDay = (idx: number) => {
    setDays(prev => prev.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day_number: i + 1 })));
  };

  const moveDay = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= days.length) return;
    setDays(prev => {
      const arr = [...prev];
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr.map((d, i) => ({ ...d, day_number: i + 1 }));
    });
  };

  const updateDay = (idx: number, field: keyof DayDraft, value: string | number) => {
    setDays(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const result = isEdit
        ? await updateAdminItinerary(id!, form)
        : await createAdminItinerary(form);
      if (result.error || !result.data) throw result.error ?? new Error("Save failed");
      const itineraryId = result.data.id;
      const dayResult = await replaceItineraryDays(itineraryId, days);
      if (dayResult.error) throw dayResult.error;
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-itineraries"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Itinerary updated" : "Itinerary created");
      navigate("/admin/content/itineraries");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading…</div>;

  const seoPreview = {
    title: form.seo_title || `${form.package_name} | MyQuickTrippers`,
    desc: form.seo_description || form.short_description || "",
    url: `myquicktrippers.com/itineraries/${form.slug || "slug"}`,
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => navigate("/admin/content/itineraries")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg shrink-0"><ArrowLeft size={18} /></button>
          <h1 className="text-2xl font-display font-bold text-gray-900 truncate">{isEdit ? "Edit Itinerary" : "New Itinerary"}</h1>
        </div>
        {isEdit && form.slug && (
          <a
            href={`/itineraries/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 shrink-0 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={15} /> View on site
          </a>
        )}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (!form.package_name || !form.slug) return toast.error("Package name and slug are required");
          mutation.mutate();
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ── Left column ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Core */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Core Details</h2>
            <Field label="Package Name *">
              <input type="text" value={form.package_name} onChange={e => set("package_name", e.target.value)} placeholder="e.g. Golden Triangle" className={inputCls} required />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="URL Slug *">
                <div className="flex gap-2">
                  <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} className={inputCls + " flex-1"} required />
                  <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.package_name)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
                </div>
              </Field>
              <Field label="Region *">
                <select value={form.region} onChange={e => set("region", e.target.value)} className={inputCls} required>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Days"><input type="number" min={1} value={form.days} onChange={e => set("days", Number(e.target.value))} className={inputCls} /></Field>
              <Field label="Nights"><input type="number" min={0} value={form.nights} onChange={e => set("nights", Number(e.target.value))} className={inputCls} /></Field>
              <Field label="Duration Label"><input type="text" value={form.duration_label ?? ""} onChange={e => set("duration_label", e.target.value)} placeholder="5 Nights / 6 Days" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Starting Point"><input type="text" value={form.starting_point ?? ""} onChange={e => set("starting_point", e.target.value)} placeholder="Delhi" className={inputCls} /></Field>
              <Field label="Ending Point"><input type="text" value={form.ending_point ?? ""} onChange={e => set("ending_point", e.target.value)} placeholder="Delhi" className={inputCls} /></Field>
            </div>
            <Field label="Short Description">
              <textarea value={form.short_description ?? ""} onChange={e => set("short_description", e.target.value)} rows={2} className={inputCls} />
            </Field>
            <Field label="Hero Image">
              <MediaInput value={form.image_url ?? ""} onChange={v => set("image_url", v)} defaultBucket="package-images" placeholder="package-images/golden-triangle/hero.jpg" />
            </Field>
          </section>

          {/* Day-wise editor */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-semibold text-gray-700 text-sm">Day-wise Itinerary ({days.length} days)</h2>
              <button type="button" onClick={addDay} className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                <Plus size={14} /> Add Day
              </button>
            </div>
            {days.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No days yet — click "Add Day" to start building the itinerary.</p>
            )}
            {days.map((day, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <GripVertical size={14} className="text-gray-300 shrink-0" />
                  <span className="text-xs font-bold text-gray-500 w-12">Day {day.day_number}</span>
                  <input
                    type="text"
                    value={day.title}
                    onChange={e => updateDay(idx, "title", e.target.value)}
                    placeholder="Day title…"
                    className={inputCls + " flex-1"}
                  />
                  <div className="flex gap-1 shrink-0">
                    <button type="button" onClick={() => moveDay(idx, -1)} disabled={idx === 0} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp size={14} /></button>
                    <button type="button" onClick={() => moveDay(idx, 1)} disabled={idx === days.length - 1} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown size={14} /></button>
                    <button type="button" onClick={() => removeDay(idx)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
                <textarea
                  value={day.description}
                  onChange={e => updateDay(idx, "description", e.target.value)}
                  rows={3}
                  placeholder="Full day description…"
                  className={inputCls}
                />
              </div>
            ))}
          </section>

          {/* Pricing */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Starting Price (₹)"><input type="number" value={form.starting_price ?? ""} onChange={e => set("starting_price", e.target.value ? Number(e.target.value) : null)} className={inputCls} /></Field>
              <Field label="Price Label"><input type="text" value={form.price_label ?? ""} onChange={e => set("price_label", e.target.value)} placeholder="₹30,400" className={inputCls} /></Field>
            </div>
            <Field label="Price Disclaimer"><textarea value={form.price_disclaimer ?? ""} onChange={e => set("price_disclaimer", e.target.value)} rows={2} className={inputCls} /></Field>
          </section>

          {/* Array fields */}
          {(["places_covered", "highlights", "inclusions", "exclusions", "category_tags"] as const).map(field => (
            <section key={field} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3 capitalize">{field.replace(/_/g, " ")}</h2>
              <div className="space-y-2">
                {(form[field] || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">{item}</span>
                    <button type="button" onClick={() => set(field, (form[field] || []).filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newListVal[field]}
                  onChange={e => setNewListVal(p => ({ ...p, [field]: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addToList(field); } }}
                  placeholder={`Add ${field.replace(/_/g, " ").slice(0, -1)}…`}
                  className={inputCls + " flex-1"}
                />
                <button type="button" onClick={() => addToList(field)} className="px-4 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200"><Plus size={14} /></button>
              </div>
            </section>
          ))}

          {/* SEO */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <Field label="SEO Title"><input type="text" value={form.seo_title ?? ""} onChange={e => set("seo_title", e.target.value)} className={inputCls} /></Field>
            <Field label="Meta Description"><textarea value={form.seo_description ?? ""} onChange={e => set("seo_description", e.target.value)} rows={2} className={inputCls} /></Field>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Google Preview</p>
              <p className="text-blue-700 text-sm font-medium truncate">{seoPreview.title}</p>
              <p className="text-green-700 text-xs truncate">{seoPreview.url}</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{seoPreview.desc}</p>
            </div>
          </section>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Publish</h2>
            {[
              { label: "Published (visible on site)", key: "active" },
              { label: "Featured", key: "featured" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <Toggle checked={!!(form as any)[key]} onChange={v => set(key as any, v)} />
              </label>
            ))}
            <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls} /></Field>
          </section>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16} />{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Itinerary"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/itineraries")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>

          {!isEdit && (
            <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>Save as <strong>Draft</strong> first, then publish when ready. Draft itineraries are not visible on the public site.</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
