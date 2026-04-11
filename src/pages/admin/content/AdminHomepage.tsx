import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, HelpCircle } from "lucide-react";
import { listHomepageSections, upsertHomepageSection, type HomepageSection } from "@/services/settingsService";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

export default function AdminHomepage() {
  const queryClient = useQueryClient();
  const [sections, setSections] = useState<Record<string, Partial<HomepageSection>>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["homepage-sections"],
    queryFn: () => listHomepageSections().then(r => r.data ?? []),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (data?.length) {
      const parsed: Record<string, Partial<HomepageSection>> = {};
      data.forEach(s => {
        parsed[s.section_key] = s;
      });
      setSections(parsed);
    }
  }, [data]);

  const updateSectionState = (key: string, updates: Partial<HomepageSection>) => {
    setSections(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates
      }
    }));
  };

  const updatePayloadField = (key: string, field: string, value: any) => {
    updateSectionState(key, {
      payload: { ...(sections[key]?.payload || {}), [field]: value }
    });
  };

  const saveMutation = useMutation({
    mutationFn: async (key: string) => {
      const sectionData = sections[key];
      // Default fallback values if never initialized in DB
      return upsertHomepageSection(key, {
        title: sectionData?.title || "",
        subtitle: sectionData?.subtitle || "",
        active: sectionData?.active ?? true,
        sort_order: sectionData?.sort_order ?? 0,
        payload: sectionData?.payload || {}
      });
    },
    onSuccess: (res, key) => {
      queryClient.invalidateQueries({ queryKey: ["homepage-sections"] });
      toast.success(`Section updated successfully`);
    },
    onError: () => toast.error("Failed to save section settings")
  });

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading modules...</div>;

  const getSection = (k: string) => sections[k] || {};
  const getPayload = (k: string) => sections[k]?.payload || {};

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Homepage Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Control the display, order, and titles of the live website's homepage sections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* HERO SECTION */}
          <SectionCard 
            title="Hero Banner" 
            sectionKey="hero" 
            data={getSection("hero")} 
            onUpdate={(updates) => updateSectionState("hero", updates)}
            onSave={() => saveMutation.mutate("hero")}
            isSaving={saveMutation.isPending && saveMutation.variables === "hero"}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hero Headline (Title)</label>
                <input value={getSection("hero").title || ""} onChange={e => updateSectionState("hero", { title: e.target.value })} className={inputCls} placeholder="e.g. Discover India's Magic" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hero Subtitle</label>
                <textarea value={getSection("hero").subtitle || ""} onChange={e => updateSectionState("hero", { subtitle: e.target.value })} rows={2} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Background Image URL</label>
                <input value={(getPayload("hero")?.bg_image as string) || ""} onChange={e => updatePayloadField("hero", "bg_image", e.target.value)} className={inputCls} placeholder="e.g. site-assets/hero-bg.jpg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">CTA Button Text</label>
                  <input value={(getPayload("hero")?.cta_text as string) || ""} onChange={e => updatePayloadField("hero", "cta_text", e.target.value)} className={inputCls} placeholder="e.g. Explore Packages" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">CTA Button Link</label>
                  <input value={(getPayload("hero")?.cta_link as string) || "/packages"} onChange={e => updatePayloadField("hero", "cta_link", e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* DESTINATIONS CAROUSEL */}
          <SectionCard 
            title="Destinations Carousel" 
            sectionKey="destinations_carousel" 
            data={getSection("destinations_carousel")} 
            onUpdate={(updates) => updateSectionState("destinations_carousel", updates)}
            onSave={() => saveMutation.mutate("destinations_carousel")}
            isSaving={saveMutation.isPending && saveMutation.variables === "destinations_carousel"}
          >
             <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Title</label>
                <input value={getSection("destinations_carousel").title || ""} onChange={e => updateSectionState("destinations_carousel", { title: e.target.value })} className={inputCls} placeholder="e.g. Popular Destinations" />
              </div>
               <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Subtitle</label>
                 <textarea value={getSection("destinations_carousel").subtitle || ""} onChange={e => updateSectionState("destinations_carousel", { subtitle: e.target.value })} rows={2} className={inputCls} />
              </div>
            </div>
          </SectionCard>

          {/* TRENDING PACKAGES */}
          <SectionCard 
            title="Trending Packages" 
            sectionKey="trending_packages" 
            data={getSection("trending_packages")} 
            onUpdate={(updates) => updateSectionState("trending_packages", updates)}
            onSave={() => saveMutation.mutate("trending_packages")}
            isSaving={saveMutation.isPending && saveMutation.variables === "trending_packages"}
          >
             <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Title</label>
                <input value={getSection("trending_packages").title || ""} onChange={e => updateSectionState("trending_packages", { title: e.target.value })} className={inputCls} placeholder="e.g. Trending Tour Packages" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Subtitle</label>
                <textarea value={getSection("trending_packages").subtitle || ""} onChange={e => updateSectionState("trending_packages", { subtitle: e.target.value })} rows={2} className={inputCls} />
              </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Display Limit (How many packages to show)</label>
                  <input type="number" value={(getPayload("trending_packages")?.limit as number) || 6} onChange={e => updatePayloadField("trending_packages", "limit", Number(e.target.value))} className={inputCls + " w-32"} />
                </div>
            </div>
          </SectionCard>

           {/* WHY CHOOSE US (FEATURES) */}
           <SectionCard 
            title="Why Choose Us" 
            sectionKey="why_choose_us" 
            data={getSection("why_choose_us")} 
            onUpdate={(updates) => updateSectionState("why_choose_us", updates)}
            onSave={() => saveMutation.mutate("why_choose_us")}
            isSaving={saveMutation.isPending && saveMutation.variables === "why_choose_us"}
          >
             <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Title</label>
                <input value={getSection("why_choose_us").title || ""} onChange={e => updateSectionState("why_choose_us", { title: e.target.value })} className={inputCls} placeholder="e.g. Why Travel With Us?" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Section Subtitle</label>
                <textarea value={getSection("why_choose_us").subtitle || ""} onChange={e => updateSectionState("why_choose_us", { subtitle: e.target.value })} rows={2} className={inputCls} />
              </div>
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100 flex gap-3">
                <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>Features and icons for this section are managed separately in the feature dictionary via API or generic CMS tools. Here you can control its visibility and titles.</p>
              </div>
            </div>
          </SectionCard>

        </div>

        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
             <h3 className="font-semibold text-gray-900 mb-1">Architecture Note</h3>
             <p className="text-xs text-gray-500 mb-4">
               Each section acts as an independent module. Saving a section updates it immediately on the live Next.js front-end. Changing "Active" will instantly hide/show the block.
             </p>
             <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 flex justify-between font-mono">
                  <span>Hero Banner</span> <span>sort: {sections["hero"]?.sort_order ?? 0}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 flex justify-between font-mono">
                  <span>Destinations</span> <span>sort: {sections["destinations_carousel"]?.sort_order ?? 0}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 flex justify-between font-mono">
                  <span>Packages</span> <span>sort: {sections["trending_packages"]?.sort_order ?? 0}</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Reusable Card Component ──────────────────────────────────────────────────

function SectionCard({ 
  title, 
  sectionKey, 
  data, 
  onUpdate, 
  onSave, 
  isSaving,
  children 
}: { 
  title: string; 
  sectionKey: string; 
  data: Partial<HomepageSection>; 
  onUpdate: (u: Partial<HomepageSection>) => void; 
  onSave: () => void;
  isSaving: boolean;
  children: React.ReactNode; 
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-base">{title}</h2>
          <p className="text-xs text-gray-400 font-mono mt-0.5">key: {sectionKey}</p>
        </div>
        <div className="flex items-center gap-4">
           <label className="flex items-center gap-2 cursor-pointer border-r border-gray-100 pr-4">
             <span className="text-xs font-semibold text-gray-500">Active</span>
             <Toggle checked={data.active ?? true} onChange={v => onUpdate({ active: v })} />
           </label>
           <button onClick={onSave} disabled={isSaving} className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50">
            <Save size={14}/> {isSaving ? "Saving..." : "Save Module"}
           </button>
        </div>
      </div>
      
      {children}
      
      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 mt-5">
         <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Module Sort Order</label>
            <input type="number" value={data.sort_order ?? 0} onChange={e => onUpdate({ sort_order: Number(e.target.value) })} className={inputCls + " w-24"} />
            <p className="text-[10px] text-gray-400 mt-1.5">Lower numbers render higher on the page</p>
         </div>
      </div>
    </section>
  );
}
