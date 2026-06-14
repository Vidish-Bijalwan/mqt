import React, { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import {
  Map, Search, Filter, Tag, ArrowRight, ChevronLeft, Calendar, Compass,
  Mountain, Sunrise, TreePine, Waves, Heart, Users, Ship, Sparkles,
  MapPin, Clock, Check, X, Phone, MessageCircle, Shield, Star,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { ItineraryCard } from "@/components/itineraries/ItineraryCard";
import { itineraries as staticItineraries, getRegions, getCategoryTags, getRelatedItineraries } from "@/data/itineraries";
import { getMergedItineraries } from "@/lib/itineraryContent";
import { Button } from "@/components/ui/button";
import { useTripPlanner } from "@/contexts/TripPlannerContext";

// ─── Region metadata ──────────────────────────────────────────────────────────
const REGION_META: Record<string, { icon: React.ReactNode; examples: string; desc: string; count: number }> = {
  "North India": { icon: <Mountain className="w-6 h-6" />, examples: "Delhi, Agra, Jaipur, Himachal, Kashmir", desc: "Best for heritage, mountains & spiritual trips", count: 0 },
  "East India": { icon: <TreePine className="w-6 h-6" />, examples: "Darjeeling, Gangtok, Assam, Odisha", desc: "Best for tea hills, monasteries & nature", count: 0 },
  "Central India": { icon: <Compass className="w-6 h-6" />, examples: "Madhya Pradesh, Khajuraho, Orchha", desc: "Best for heritage, temples & wildlife", count: 0 },
  "West India": { icon: <Sunrise className="w-6 h-6" />, examples: "Rajasthan, Gujarat, Goa, Maharashtra", desc: "Best for deserts, beaches & royal cities", count: 0 },
  "South India": { icon: <Waves className="w-6 h-6" />, examples: "Kerala, Coorg, Andaman, Tamil Nadu, Karnataka", desc: "Best for beaches, backwaters & hill stations", count: 0 },
};
// Populate counts (static baseline; updated at runtime via merged list)
staticItineraries.forEach(i => { if (REGION_META[i.region]) REGION_META[i.region].count++; });

// ─── Experience categories (mapped to actual categoryTags) ─────────────────
const EXPERIENCE_OPTIONS = [
  { id: "Heritage", label: "Heritage & Culture", icon: <Sunrise className="w-6 h-6" />, desc: "Forts, palaces, temples, and historic cities", tags: ["Heritage", "Culture"] },
  { id: "Nature", label: "Wildlife & Nature", icon: <TreePine className="w-6 h-6" />, desc: "Tigers, national parks, forests, and sanctuaries", tags: ["Nature"] },
  { id: "Hill Station", label: "Mountains & Hill Stations", icon: <Mountain className="w-6 h-6" />, desc: "Cool escapes, hill retreats, and misty valleys", tags: ["Hill Station"] },
  { id: "Beach", label: "Beaches & Islands", icon: <Waves className="w-6 h-6" />, desc: "Goa, Andaman, Lakshadweep, Kovalam", tags: ["Beach"] },
  { id: "Leisure", label: "Leisure & Family", icon: <Users className="w-6 h-6" />, desc: "Relaxed getaways, family-friendly routes", tags: ["Leisure"] },
];

// ─── Duration options ─────────────────────────────────────────────────────────
const DURATION_OPTIONS = [
  { id: "weekend", label: "Weekend Escape", range: "1–3 Days", bestFor: "Quick city breaks & nearby getaways", min: 1, max: 3 },
  { id: "short", label: "Short Break", range: "4–5 Days", bestFor: "Single-destination deep dives", min: 4, max: 5 },
  { id: "classic", label: "Classic Trip", range: "6–7 Days", bestFor: "Complete regional circuits", min: 6, max: 7 },
  { id: "extended", label: "Extended Journey", range: "8–12 Days", bestFor: "Multi-region explorations", min: 8, max: 12 },
  { id: "grand", label: "Grand India Tour", range: "13+ Days", bestFor: "The ultimate cross-India adventure", min: 13, max: 999 },
];

// ─── Progress steps ───────────────────────────────────────────────────────────
const STEPS = [
  { key: "region", label: "Region" },
  { key: "experience", label: "Experience" },
  { key: "duration", label: "Duration" },
  { key: "results", label: "Matches" },
];

const Itineraries = () => {
  const { openPlanner } = useTripPlanner();
  const resultsRef = useRef<HTMLDivElement>(null);

  const { data: mergedItineraries } = useQuery({
    queryKey: ["public-itineraries"],
    queryFn: getMergedItineraries,
    staleTime: 60_000,
  });

  const itineraries = mergedItineraries ?? staticItineraries;

  // Wizard state: 0 = hero/start, 1 = region, 2 = experience, 3 = duration, 4 = results
  const [wizardStep, setWizardStep] = useState(0);

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedExperience, setSelectedExperience] = useState<string>("All");
  const [selectedDuration, setSelectedDuration] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = getRegions();

  // Filtering logic
  const filteredItineraries = useMemo(() => {
    return itineraries.filter(itinerary => {
      const matchesRegion = selectedRegion === "All" || itinerary.region === selectedRegion;

      let matchesExperience = true;
      if (selectedExperience !== "All") {
        const exp = EXPERIENCE_OPTIONS.find(e => e.id === selectedExperience);
        if (exp) {
          matchesExperience = itinerary.categoryTags.some(t => exp.tags.includes(t));
        }
      }

      let matchesDuration = true;
      if (selectedDuration !== "All") {
        const dur = DURATION_OPTIONS.find(d => d.id === selectedDuration);
        if (dur) {
          matchesDuration = itinerary.days >= dur.min && itinerary.days <= dur.max;
        }
      }

      const matchesSearch = !searchQuery ||
        itinerary.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itinerary.placesCovered.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesRegion && matchesExperience && matchesDuration && matchesSearch;
    });
  }, [selectedRegion, selectedExperience, selectedDuration, searchQuery]);

  // Fallback popular itineraries
  const fallbackItineraries = useMemo(() => {
    if (filteredItineraries.length > 0 && filteredItineraries.length < 3) {
      const firstMatch = filteredItineraries[0];
      return getRelatedItineraries(firstMatch, 6)
        .filter(r => !filteredItineraries.some(f => f.id === r.id));
    }
    return itineraries.slice(0, 6);
  }, [filteredItineraries]);

  // Scroll to results when step 4
  useEffect(() => {
    if (wizardStep === 4 && resultsRef.current) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [wizardStep]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-section, .reveal-child");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [wizardStep]); // Re-run when wizardStep changes as new elements might appear

  // ── Handlers ──
  const handleSelectRegion = (region: string) => { setSelectedRegion(region); setWizardStep(2); };
  const handleSelectExperience = (exp: string) => { setSelectedExperience(exp); setWizardStep(3); };
  const handleSelectDuration = (dur: string) => { setSelectedDuration(dur); setWizardStep(4); };

  const handleSkipToResults = () => {
    setSelectedRegion("All"); setSelectedExperience("All"); setSelectedDuration("All");
    setWizardStep(4);
  };

  const resetWizard = () => {
    setSelectedRegion("All"); setSelectedExperience("All"); setSelectedDuration("All"); setSearchQuery("");
    setWizardStep(0);
  };

  // ── Labels ──
  const regionLabel = selectedRegion === "All" ? "All Regions" : selectedRegion;
  const experienceLabel = selectedExperience === "All" ? "All Experiences" : (EXPERIENCE_OPTIONS.find(e => e.id === selectedExperience)?.label || selectedExperience);
  const durationLabel = selectedDuration === "All" ? "Any Duration" : (DURATION_OPTIONS.find(d => d.id === selectedDuration)?.label || selectedDuration);

  // ── Progress Bar Component ──
  const ProgressBar = ({ current }: { current: number }) => (
    <div className="flex items-center justify-center gap-0 px-4 py-8">
      {STEPS.map((step, i) => (
        <React.Fragment key={step.key}>
          <button
            onClick={() => { if (i + 1 <= current) setWizardStep(i + 1); }}
            disabled={i + 1 > current}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
              ${i + 1 < current ? "bg-amber-100 text-amber-700 cursor-pointer hover:bg-amber-200" : ""}
              ${i + 1 === current ? "bg-amber-500 text-white shadow-md ring-2 ring-amber-500/20 ring-offset-2" : ""}
              ${i + 1 > current ? "bg-gray-100 text-gray-400 cursor-default" : ""}
            `}
            aria-label={`Step ${i + 1}: ${step.label}`}
            aria-current={i + 1 === current ? "step" : undefined}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${i + 1 < current ? "bg-amber-500 text-white" : ""}
              ${i + 1 === current ? "bg-white text-amber-600" : ""}
              ${i + 1 > current ? "bg-gray-200 text-gray-400" : ""}
            `}>
              {i + 1 < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
          {i < STEPS.length - 1 && (
            <div className={`w-8 md:w-16 h-1 mx-2 rounded-full ${i + 1 < current ? "bg-amber-400" : "bg-gray-200"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // ── Preference Summary Chips ──
  const PreferenceSummary = () => {
    const chips = [];
    if (selectedRegion !== "All") chips.push({ label: regionLabel, onClear: () => { setSelectedRegion("All"); if (wizardStep > 1) setWizardStep(1); } });
    if (selectedExperience !== "All") chips.push({ label: experienceLabel, onClear: () => { setSelectedExperience("All"); if (wizardStep > 2) setWizardStep(2); } });
    if (selectedDuration !== "All") chips.push({ label: durationLabel, onClear: () => { setSelectedDuration("All"); if (wizardStep > 3) setWizardStep(3); } });

    if (chips.length === 0) return null;
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 px-6 pb-6 border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your preferences:</span>
        {chips.map(c => (
          <span key={c.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 shadow-sm">
            {c.label}
            <button onClick={c.onClear} className="ml-0.5 hover:text-amber-900 transition-colors" aria-label={`Remove ${c.label}`}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <SEO
        title="India Itinerary Planner"
        description="Find your perfect India itinerary — heritage, mountains, beaches & spiritual routes. Answer a few questions for handpicked MQT tour plans."
        canonical="/itineraries"
        image="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=1200"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=2000"
          alt="India landscape"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#faf7f1]" />

        <div className="relative z-10 container mx-auto px-4 py-10 sm:py-16 text-center -mt-6 sm:-mt-10 md:-mt-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> 50+ Curated Packages
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto mb-4 sm:mb-5">
            Find Your Perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">India Itinerary</span>
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed font-medium">
            Answer a few quick questions and we'll match you with handpicked India travel routes across heritage cities, mountains, beaches, wildlife escapes, and spiritual journeys.
          </p>
          {wizardStep === 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setWizardStep(1)}
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full shadow-xl shadow-amber-500/25 text-white font-bold group"
              >
                Start Trip Finder <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={handleSkipToResults}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold backdrop-blur-sm transition-all"
              >
                Browse All Itineraries
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: TRIP FINDER WIZARD (Steps 1-3)
          ═══════════════════════════════════════════════════════════════════════ */}
      {wizardStep >= 1 && wizardStep <= 3 && (
        <section className="bg-[#faf7f1] pb-10 md:pb-20 relative z-20 reveal-section -mt-16 sm:-mt-24 md:-mt-[120px]">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden relative"
              style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(251,191,36,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(249,115,22,0.03) 0%, transparent 50%)" }}
            >
              {/* Progress bar */}
              <ProgressBar current={wizardStep} />

              <div className="border-t border-gray-100" />

              {/* Preference summary */}
              <PreferenceSummary />

              {/* ── STEP 1: Region ── */}
              {wizardStep === 1 && (
                <div className="px-4 sm:px-6 md:px-12 pb-8 sm:pb-12 pt-6 sm:pt-10">
                  <div className="text-center wizard-section-mb">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-3">
                      Where would you like to begin your India journey?
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">Choose a region to explore, or let us surprise you with the best from across India.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wizard-section-gap">
                    {regions.map(region => {
                      const meta = REGION_META[region];
                      return (
                        <button
                          key={region}
                          onClick={() => handleSelectRegion(region)}
                          aria-label={`Select ${region}`}
                          className="group relative bg-white border-2 border-gray-100 hover:border-amber-400 hover:bg-amber-50/30 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                              {meta?.icon || <Map className="w-6 h-6" />}
                            </div>
                            <div>
                              <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors leading-tight">{region}</div>
                              <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-amber-500">{meta?.count} packages</span>
                            </div>
                          </div>
                          <div className="mt-auto">
                            <p className="text-sm font-medium text-gray-700 mb-1">{meta?.examples}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{meta?.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleSelectRegion("All")}
                      aria-label="Show all regions"
                      className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                    >
                      <div className="absolute top-4 right-4 px-2 py-0.5 bg-amber-200/50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">Recommended</div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                          <Compass className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors leading-tight">I'm Flexible</div>
                          <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600/70">{itineraries.length} packages</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm font-medium text-gray-800 mb-1">Show me the best options</p>
                        <p className="text-xs text-amber-700/80 leading-relaxed">Explore top itineraries from across all of India without restrictions.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Experience ── */}
              {wizardStep === 2 && (
                <div className="px-4 sm:px-6 md:px-12 pb-8 sm:pb-12 pt-6 sm:pt-10">
                  <div className="text-center wizard-section-mb">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-3">
                      What kind of trip feels right for you?
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">Pick a theme that excites you most — or see a mix of everything.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wizard-section-gap">
                    {EXPERIENCE_OPTIONS.map(exp => (
                      <button
                        key={exp.id}
                        onClick={() => handleSelectExperience(exp.id)}
                        aria-label={`Select ${exp.label}`}
                        className="group relative bg-white border-2 border-gray-100 hover:border-amber-400 hover:bg-amber-50/30 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          {exp.icon}
                        </div>
                        <div className="mt-auto">
                          <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors mb-1">{exp.label}</div>
                          <p className="text-sm text-gray-500 leading-relaxed">{exp.desc}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSelectExperience("All")}
                      aria-label="Show all experiences"
                      className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                    >
                      <div className="absolute top-4 right-4 px-2 py-0.5 bg-amber-200/50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">Recommended</div>
                      <div className="w-12 h-12 rounded-xl bg-white text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="mt-auto">
                        <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors mb-1">A Mix of Everything</div>
                        <p className="text-sm text-amber-700/80 leading-relaxed">Show me all types of travel experiences available.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Duration ── */}
              {wizardStep === 3 && (
                <div className="px-4 sm:px-6 md:px-12 pb-8 sm:pb-12 pt-6 sm:pt-10">
                  <div className="text-center wizard-section-mb">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-3">
                      How much time do you have for this trip?
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">Select a duration that suits your schedule — we'll match the best routes.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wizard-section-gap">
                    {DURATION_OPTIONS.map(dur => (
                      <button
                        key={dur.id}
                        onClick={() => handleSelectDuration(dur.id)}
                        aria-label={`Select ${dur.label}: ${dur.range}`}
                        className="group relative bg-white border-2 border-gray-100 hover:border-amber-400 hover:bg-amber-50/30 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                            {dur.range}
                          </span>
                        </div>
                        <div className="mt-auto">
                          <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors mb-1">{dur.label}</div>
                          <p className="text-sm text-gray-500 leading-relaxed">{dur.bestFor}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSelectDuration("All")}
                      aria-label="Any duration"
                      className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl wizard-tile text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                    >
                      <div className="absolute top-4 right-4 px-2 py-0.5 bg-amber-200/50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">Recommended</div>
                      <div className="w-12 h-12 rounded-xl bg-white text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                        <Compass className="w-6 h-6" />
                      </div>
                      <div className="mt-auto">
                        <div className="font-bold text-[#111111] text-base sm:text-lg group-hover:text-amber-700 transition-colors mb-1">I Haven't Decided</div>
                        <p className="text-sm text-amber-700/80 leading-relaxed">Show me itineraries of all durations to get inspired.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom nav for steps > 1 */}
              {wizardStep > 0 && wizardStep < 4 && (
                <div className="px-6 md:px-12 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button onClick={() => setWizardStep(wizardStep - 1)} className="w-full sm:w-auto px-6 py-3 text-gray-500 hover:text-gray-900 font-semibold flex items-center justify-center gap-2 text-sm transition-colors rounded-full hover:bg-gray-100">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  {wizardStep === 3 ? (
                    <Button
                      onClick={() => handleSelectDuration(selectedDuration === "All" ? "All" : selectedDuration)}
                      className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 font-bold shadow-lg shadow-amber-500/20 group"
                    >
                      Show My Matches <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <button onClick={handleSkipToResults} className="w-full sm:w-auto px-6 py-3 text-amber-600 hover:text-amber-800 font-semibold text-sm transition-colors text-center">
                      Skip & browse all →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: RESULTS
          ═══════════════════════════════════════════════════════════════════════ */}
      {wizardStep === 4 && (
        <section ref={resultsRef} className="bg-[#faf7f1] pb-10 md:pb-20 relative z-20 reveal-section -mt-12 sm:-mt-16 md:-mt-20">
          <div className="container mx-auto px-4">

            {/* Results header card */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 p-8 md:p-12 max-w-5xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#111111] mb-3">
                  {filteredItineraries.length > 0 ? "Recommended Itineraries for You" : "No Perfect Match Found Yet"}
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                  {filteredItineraries.length > 0
                    ? "We'll recommend the best matching routes from 50+ curated itineraries."
                    : "Your preferences are unique. Share your travel dates and interests, and our team will create a custom itinerary for you."
                  }
                </p>
              </div>

              {/* Selected filter chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {selectedRegion !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold rounded-full shadow-sm">
                    <MapPin className="w-4 h-4" /> {regionLabel}
                    <button onClick={() => setSelectedRegion("All")} className="ml-1 hover:text-amber-900"><X className="w-4 h-4" /></button>
                  </span>
                )}
                {selectedExperience !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold rounded-full shadow-sm">
                    <Star className="w-4 h-4" /> {experienceLabel}
                    <button onClick={() => setSelectedExperience("All")} className="ml-1 hover:text-amber-900"><X className="w-4 h-4" /></button>
                  </span>
                )}
                {selectedDuration !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold rounded-full shadow-sm">
                    <Clock className="w-4 h-4" /> {durationLabel}
                    <button onClick={() => setSelectedDuration("All")} className="ml-1 hover:text-amber-900"><X className="w-4 h-4" /></button>
                  </span>
                )}
                <button onClick={resetWizard} className="px-4 py-2 text-sm text-gray-500 hover:text-amber-600 font-bold transition-colors underline underline-offset-2">
                  Start new search
                </button>
              </div>

              {/* Inline search + filter bar */}
              <div className="bg-gray-50/80 rounded-2xl border border-gray-100 p-2 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-grow relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Refine by package name or destination..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="appearance-none w-full sm:w-auto bg-white border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-gray-700 text-sm pr-8"
                      aria-label="Filter by region"
                    >
                      <option value="All">All Regions</option>
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="appearance-none w-full sm:w-auto bg-white border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-gray-700 text-sm pr-8"
                      aria-label="Filter by experience"
                    >
                      <option value="All">All Types</option>
                      {EXPERIENCE_OPTIONS.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto px-2">
              <h3 className="text-xl font-bold text-[#111111]">
                {filteredItineraries.length} {filteredItineraries.length === 1 ? "Itinerary" : "Itineraries"} Found
              </h3>
            </div>

            {/* Results grid */}
            {filteredItineraries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                {filteredItineraries.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-gray-100 shadow-sm max-w-3xl mx-auto">
                <Map className="w-16 h-16 mx-auto text-amber-300 mb-5" />
                <h3 className="text-3xl font-bold text-[#111111] mb-3">No perfect match found yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8 text-base">
                  Your preferences are unique — that's a good thing! Share your travel dates and interests, and our team will create a custom itinerary just for you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => openPlanner({}, "itinerary_empty_state")}
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base font-bold shadow-lg shadow-amber-500/20"
                  >
                    Request Custom Itinerary
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => { setSelectedRegion("All"); setSelectedExperience("All"); setSelectedDuration("All"); setSearchQuery(""); }}
                    className="rounded-full border-gray-200 text-gray-600 px-6 sm:px-8 py-4 sm:py-6 text-base font-bold"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Fallback popular packages */}
            {wizardStep === 4 && filteredItineraries.length < 4 && (
              <div className="mt-20 max-w-7xl mx-auto">
                <div className="text-center wizard-section-mb">
                  <h4 className="text-3xl font-display font-bold text-[#111111] mb-2">Popular Itineraries You Might Like</h4>
                  <p className="text-base text-gray-500">These are some of our most-loved travel routes across India</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {fallbackItineraries.slice(0, 4).map(it => (
                    <ItineraryCard key={it.id} itinerary={it} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: TRUST STRIP
          ═══════════════════════════════════════════════════════════════════════ */}
      {wizardStep === 4 && (
        <section className="bg-white border-y border-gray-100 py-12 md:py-16 reveal-section">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { icon: <Map className="w-8 h-8" />, title: "50+ Curated Packages", desc: "Handpicked by local experts" },
                { icon: <Sparkles className="w-8 h-8" />, title: "Fully Customizable", desc: "Tailor any route to your style" },
                { icon: <Phone className="w-8 h-8" />, title: "Local Travel Support", desc: "On-ground assistance 24/7" },
                { icon: <Shield className="w-8 h-8" />, title: "Complete Assistance", desc: "Hotel + Cab + Sightseeing" },
              ].map(item => (
                <div key={item.title} className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">{item.icon}</div>
                  <h4 className="font-bold text-base text-[#111111] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: CUSTOM TRIP CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      {wizardStep === 4 && (
        <section className="bg-gradient-to-br from-[#111827] to-[#1e293b] py-16 md:py-24 relative overflow-hidden reveal-section">
          {/* Subtle background patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
            <MessageCircle className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Need Something More Specific?</h3>
            <p className="text-gray-300 mb-10 leading-relaxed text-base md:text-lg">
              Tell us your budget, dates, and travel style — our team will customize the perfect route for you. No upfront payment required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => openPlanner({}, "itinerary_custom_cta")}
                size="lg"
                className="w-full sm:w-auto px-10 py-7 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full shadow-xl shadow-amber-500/20 text-white font-bold"
              >
                Request Custom Itinerary
              </Button>
              <a
                href="https://wa.me/918171158569?text=Hi!%20I%20need%20a%20custom%20India%20itinerary."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-7 text-base font-bold text-white border-2 border-white/20 rounded-full hover:bg-white hover:text-[#111827] transition-all backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default Itineraries;
