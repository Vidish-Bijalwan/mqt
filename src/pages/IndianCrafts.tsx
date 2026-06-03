import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ShoppingBag, ChevronLeft, Trophy, Compass, Star, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { craftsData, Craft } from "@/data/crafts";
import { getCraftWhatsAppUrl } from "@/lib/contact";
import { useQuery } from "@tanstack/react-query";
import { listAdminCrafts } from "@/services/adminCraftService";

// ── Region Config (colors only used as accent, not dark bg) ──────────
const REGIONS: Record<string, { color: string; lightBg: string; emoji: string; tagline: string; states: string[] }> = {
  "North India":     { color: "#3B82F6", lightBg: "bg-blue-50",   emoji: "🏔️", tagline: "Peaks & Valleys",    states: ["Haryana", "Himachal Pradesh", "Punjab", "Rajasthan"] },
  "South India":     { color: "#10B981", lightBg: "bg-emerald-50", emoji: "🌴", tagline: "Coastal Heritage",    states: ["Karnataka", "Kerala", "Tamil Nadu"] },
  "East India":      { color: "#F59E0B", lightBg: "bg-amber-50",   emoji: "🌊", tagline: "Temple Traditions",   states: ["Odisha"] },
  "West India":      { color: "#8B5CF6", lightBg: "bg-violet-50",  emoji: "🏙️", tagline: "Vibrant & Bold",      states: ["Maharashtra"] },
  "Northeast India": { color: "#EF4444", lightBg: "bg-red-50",     emoji: "🎋", tagline: "Wild & Woven",        states: ["Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim"] },
  "Central India":   { color: "#F97316", lightBg: "bg-orange-50",  emoji: "🏛️", tagline: "Tribal Grandeur",     states: ["Jharkhand", "Madhya Pradesh"] },
};

const getRegion = (state: string) => {
  for (const [name, cfg] of Object.entries(REGIONS)) {
    if (cfg.states.includes(state)) return { name, ...cfg };
  }
  return { name: "India", color: "#F59E0B", lightBg: "bg-amber-50", emoji: "🇮🇳", tagline: "Incredible India", states: [] };
};

// ── State Territory Card ──────────────────────────────────────────────
const StateCard = ({
  state, crafts, region, claimedCount, index, onClick,
}: {
  state: string; crafts: Craft[]; region: ReturnType<typeof getRegion>;
  claimedCount: number; index: number; onClick: () => void;
}) => {
  const pct = crafts.length > 0 ? Math.round((claimedCount / crafts.length) * 100) : 0;
  const completed = claimedCount === crafts.length && crafts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group border-2"
      style={{ borderColor: completed ? region.color : "transparent" }}
    >
      {/* Decorative background pattern/gradient */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.06]" 
        style={{ backgroundImage: `radial-gradient(circle at top right, ${region.color} 0%, transparent 60%)` }}
      />

      {/* Completed star badge */}
      {completed && (
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 bg-amber-400 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
            <Star className="w-2.5 h-2.5 fill-white" /> Complete
          </span>
        </div>
      )}

      <div className="p-5 relative z-10">
        {/* Region icon with glowing background */}
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500"
          style={{ background: `linear-gradient(135deg, ${region.color}20 0%, ${region.color}05 100%)` }}
        >
          {region.emoji}
        </div>

        <h3 className="font-display text-xl font-bold text-gray-900 leading-tight mb-1">{state}</h3>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: region.color }}>
          {region.tagline}
        </p>

        {/* Mini progress bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
          <span>{claimedCount} of {crafts.length} collected</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4 shadow-inner">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${region.color}, ${region.color}dd)` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        <div 
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: region.color }}
        >
          Enter Territory →
        </div>
      </div>
    </motion.div>
  );
};

// ── Flip Craft Card ───────────────────────────────────────────────────
const CraftCard = ({
  craft, claimed, onClaim,
}: {
  craft: Craft; claimed: boolean; onClaim: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);
  const region = getRegion(craft.state);

  return (
    <div
      className="relative h-[340px] cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image with color fallback */}
          <div className="w-full h-full relative" style={{ background: `linear-gradient(135deg, ${craft.colorHex}55, ${craft.colorHex}22)` }}>
            <img
              src={craft.image}
              alt={craft.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Claimed badge */}
          {claimed && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              <Star className="w-3 h-3 fill-white" /> Claimed
            </div>
          )}

          {/* Flip hint */}
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full border border-white/30 font-medium">
            TAP TO REVEAL
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <p className="text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1">{craft.city}</p>
            <h3 className="font-display text-lg font-bold text-white leading-tight">{craft.name}</h3>
          </div>
        </div>

        {/* ── BACK (keeps dark for contrast — intentional "wax seal" effect) ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col p-5 border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderColor: claimed ? "#22C55E" : `${craft.colorHex}50`,
          }}
        >
          {/* Color accent */}
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: craft.colorHex }} />

          <h3 className="font-display text-xl font-bold text-white mb-1 leading-tight">{craft.name}</h3>
          <div className="flex items-center gap-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="text-amber-300 text-xs font-medium">{craft.city}, {craft.state}</span>
          </div>

          <p className="text-sm text-white/65 leading-relaxed flex-1 line-clamp-4">{craft.description}</p>

          <div className="mt-4 space-y-2">
            <a
              href={getCraftWhatsAppUrl(craft.name, `${craft.city}, ${craft.state}`)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => { e.stopPropagation(); onClaim(); }}
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2.5 rounded-xl transition-colors text-sm shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              {claimed ? "Enquire Again" : "Claim This Treasure"}
            </a>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              className="w-full text-xs text-white/30 hover:text-white/60 transition-colors py-1"
            >
              ← Flip back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────
const IndianCrafts = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [claimedCrafts, setClaimedCrafts] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const c = localStorage.getItem("mqt-claimed-crafts");
      if (c) setClaimedCrafts(new Set(JSON.parse(c)));
    } catch {}
  }, []);

  const { data: dbCrafts } = useQuery({
    queryKey: ["public-crafts"],
    queryFn: () => listAdminCrafts().then(r => r.data ?? []),
  });

  const activeCraftsData = useMemo(() => {
    if (dbCrafts && dbCrafts.length > 0) {
      return dbCrafts.map((c) => ({
        id: c.craft_id,
        name: c.name,
        state: c.state,
        city: c.city,
        description: c.description,
        image: c.image,
        colorHex: c.color_hex,
      })) as Craft[];
    }
    return craftsData;
  }, [dbCrafts]);

  const craftsByState = useMemo(() => {
    const g: Record<string, Craft[]> = {};
    activeCraftsData.forEach((c) => { if (!g[c.state]) g[c.state] = []; g[c.state].push(c); });
    return g;
  }, [activeCraftsData]);

  const allStates = useMemo(() => Object.keys(craftsByState).sort(), [craftsByState]);

  const filteredStates = useMemo(() => {
    if (activeRegion === "All") return allStates;
    return allStates.filter((s) => REGIONS[activeRegion]?.states.includes(s));
  }, [activeRegion, allStates]);

  const stateClaimedCount = (state: string) =>
    (craftsByState[state] || []).filter((c) => claimedCrafts.has(c.id)).length;

  const handleEnterState = (state: string) => {
    setSelectedState(state);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClaimCraft = (craftId: string) => {
    const updated = new Set(claimedCrafts).add(craftId);
    setClaimedCrafts(updated);
    localStorage.setItem("mqt-claimed-crafts", JSON.stringify([...updated]));
  };

  const totalCrafts = activeCraftsData.length;
  const claimedCount = claimedCrafts.size;
  const progressPct = Math.round((claimedCount / totalCrafts) * 100);
  const currentRegion = selectedState ? getRegion(selectedState) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 lg:pb-0">
      <SEO
        title="Indian Handicrafts Craft Trail"
        description="Explore authentic Indian handicrafts from every state — 160+ artisan crafts across 16 states. Part of the MyQuickTrippers India experience."
        canonical="/crafts"
      />
      <Navbar />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          title={selectedState ? `${selectedState} — Craft Trail` : "Indian Handicraft Trail"}
          subtitle={
            selectedState
              ? `${currentRegion?.emoji} ${currentRegion?.tagline} · ${craftsByState[selectedState]?.length} treasures await`
              : "Explore authentic artisan crafts from every corner of India."
          }
          backgroundImage="https://commons.wikimedia.org/wiki/Special:FilePath/Phulkari_Embroidery.jpg"
          badge="Heritage · Artisanal · India"
        />

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <section className="section-y bg-gray-50 relative overflow-hidden">
          {/* Subtle ambient orbs — same pattern as WhyChooseUs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[40%] rounded-full bg-amber-200/20 blur-[120px]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[35%] rounded-full bg-blue-200/20 blur-[100px]" />
          </div>

          <div className="container-page relative z-10">

            {/* ── TOP STRIP: back button + progress ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              {/* Back button or eyebrow */}
              <div>
                <AnimatePresence mode="wait">
                  {selectedState ? (
                    <motion.button
                      key="back"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      onClick={() => setSelectedState(null)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> All States
                    </motion.button>
                  ) : (
                    <motion.div
                      key="eyebrow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="inline-block py-1 px-3 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold tracking-widest uppercase mb-1 shadow-sm border border-amber-200/50">
                        Exquisite Crafts
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                        Choose Your Territory
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/50 shadow-sm flex items-center gap-4 min-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium mb-1">Your Journey</p>
                  <div className="flex items-end gap-1 mb-1.5">
                    <span className="text-xl font-bold text-gray-900">{claimedCount}</span>
                    <span className="text-gray-400 text-sm mb-0.5">/ {totalCrafts} crafts</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* ── HUB VIEW ── */}
              {!selectedState && (
                <motion.div
                  key="hub"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Region Filter Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
                    {["All", ...Object.keys(REGIONS)].map((region) => (
                      <button
                        key={region}
                        onClick={() => setActiveRegion(region)}
                        className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border"
                        style={
                          activeRegion === region
                            ? {
                                background: region === "All" ? "hsl(var(--primary))" : REGIONS[region]?.color,
                                color: "#fff",
                                borderColor: "transparent",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              }
                            : {
                                background: "rgba(255,255,255,0.8)",
                                color: "#6B7280",
                                borderColor: "#E5E7EB",
                              }
                        }
                      >
                        {region === "All" ? "🌏 All" : `${REGIONS[region].emoji} ${region}`}
                      </button>
                    ))}
                  </div>

                  {/* State Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
                    {filteredStates.map((state, i) => (
                      <StateCard
                        key={state}
                        state={state}
                        crafts={craftsByState[state]}
                        region={getRegion(state)}
                        claimedCount={stateClaimedCount(state)}
                        index={i}
                        onClick={() => handleEnterState(state)}
                      />
                    ))}
                  </div>

                  {/* How to play info strip */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-gray-900 mb-1">How to Explore</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Click any state to enter its territory. Tap craft cards to reveal their story, then
                        {" "}<span className="text-green-600 font-semibold">Claim the Treasure</span> to enquire via WhatsApp.
                        Your progress saves automatically — collect crafts across all 16 states!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STATE DETAIL VIEW ── */}
              {selectedState && (
                <motion.div
                  key={selectedState}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* State header strip */}
                  <div
                    className="rounded-2xl p-5 mb-8 border bg-white/80 backdrop-blur-md shadow-sm flex items-center gap-4"
                    style={{ borderColor: `${currentRegion?.color}30` }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: `${currentRegion?.color}18` }}
                    >
                      {currentRegion?.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: currentRegion?.color }}>
                        {currentRegion?.name} · {currentRegion?.tagline}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stateClaimedCount(selectedState)} / {craftsByState[selectedState]?.length} crafts claimed from this territory
                      </p>
                    </div>
                    {stateClaimedCount(selectedState) === craftsByState[selectedState]?.length && craftsByState[selectedState]?.length > 0 && (
                      <span className="flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        <Star className="w-3.5 h-3.5 fill-white" /> Complete!
                      </span>
                    )}
                  </div>

                  {/* Craft Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {craftsByState[selectedState]?.map((craft, i) => (
                      <motion.div
                        key={craft.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                      >
                        <CraftCard
                          craft={craft}
                          claimed={claimedCrafts.has(craft.id)}
                          onClaim={() => handleClaimCraft(craft.id)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Back CTA */}
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setSelectedState(null)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" /> Explore Another State
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IndianCrafts;
