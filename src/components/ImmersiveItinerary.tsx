import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sunrise, Compass, Mountain, Car, Plane, Coffee, Camera, Moon } from "lucide-react";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import type { GalleryEntry } from "@/data/packageGalleries";

interface ItineraryDay {
  day: number;
  title: string; // Full itinerary highlight string e.g. "Day 1: Arrival in Kedarnath..."
  gallery: GalleryEntry[];
}

interface ImmersiveItineraryProps {
  days: ItineraryDay[];
}

// ─── Infer day type from title keywords ───────────────────────────────────
type DayType = "arrival" | "trek" | "sightseeing" | "temple" | "leisure" | "departure" | "adventure";

function inferDayType(title: string): DayType {
  const t = title.toLowerCase();
  if (t.includes("arrival") || t.includes("check-in") || t.includes("transit")) return "arrival";
  if (t.includes("trek") || t.includes("hike") || t.includes("walk")) return "trek";
  if (t.includes("temple") || t.includes("darshan") || t.includes("pilgrimage") || t.includes("aarti") || t.includes("dham")) return "temple";
  if (t.includes("departure") || t.includes("return") || t.includes("descent") || t.includes("drop")) return "departure";
  if (t.includes("safari") || t.includes("rafting") || t.includes("skiing") || t.includes("bungee") || t.includes("gondola")) return "adventure";
  if (t.includes("free") || t.includes("relax") || t.includes("leisure") || t.includes("rest")) return "leisure";
  return "sightseeing";
}

const DAY_META: Record<DayType, { icon: React.ReactNode; color: string; label: string; gradient: string }> = {
  arrival: {
    icon: <Plane className="w-4 h-4" />,
    color: "bg-sky-500",
    label: "Arrival",
    gradient: "from-sky-500/10 to-sky-500/5",
  },
  trek: {
    icon: <Mountain className="w-4 h-4" />,
    color: "bg-emerald-600",
    label: "Trek Day",
    gradient: "from-emerald-600/10 to-emerald-600/5",
  },
  temple: {
    icon: <Sunrise className="w-4 h-4" />,
    color: "bg-amber-500",
    label: "Pilgrimage",
    gradient: "from-amber-500/10 to-amber-500/5",
  },
  sightseeing: {
    icon: <Camera className="w-4 h-4" />,
    color: "bg-violet-500",
    label: "Sightseeing",
    gradient: "from-violet-500/10 to-violet-500/5",
  },
  leisure: {
    icon: <Coffee className="w-4 h-4" />,
    color: "bg-orange-400",
    label: "Leisure",
    gradient: "from-orange-400/10 to-orange-400/5",
  },
  departure: {
    icon: <Moon className="w-4 h-4" />,
    color: "bg-slate-500",
    label: "Departure",
    gradient: "from-slate-500/10 to-slate-500/5",
  },
  adventure: {
    icon: <Compass className="w-4 h-4" />,
    color: "bg-rose-500",
    label: "Adventure",
    gradient: "from-rose-500/10 to-rose-500/5",
  },
};

// Parse the title string — may start with "Day N: actual title"
function parseTitle(raw: string): { label: string; rest: string } {
  // Match "Day N:" or "HH:MM AM —" patterns
  const colonMatch = raw.match(/^Day\s+\d+:\s*(.+)$/i);
  if (colonMatch) return { label: "", rest: colonMatch[1] };
  const timeMatch = raw.match(/^(\d{2}:\d{2}\s*[AP]M\s*—\s*)(.+)$/);
  if (timeMatch) return { label: timeMatch[1].trim(), rest: timeMatch[2] };
  return { label: "", rest: raw };
}

/** Single day accordion card */
const DayCard = ({ entry, index, total }: { entry: ItineraryDay; index: number; total: number }) => {
  const [open, setOpen] = useState(index === 0); // First day open by default
  const type = inferDayType(entry.title);
  const meta = DAY_META[type];
  const { label: timeLabel, rest: titleText } = parseTitle(entry.title);
  const img = entry.gallery[index % entry.gallery.length] ?? entry.gallery[0];

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      {/* Vertical timeline connector */}
      {!isLast && (
        <div className="absolute left-[23px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 to-transparent z-0" />
      )}

      <div
        className={`relative z-10 rounded-2xl border transition-all duration-300 overflow-hidden
          ${open ? `border-slate-200 shadow-lg bg-gradient-to-br ${meta.gradient}` : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"}`}
      >
        {/* ─── Accordion Header ─── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-4 p-4 text-left group"
          aria-expanded={open}
        >
          {/* Day bubble */}
          <div
            className={`shrink-0 w-11 h-11 rounded-full ${meta.color} text-white flex flex-col items-center justify-center shadow-sm`}
          >
            <span className="text-[9px] font-bold uppercase tracking-widest leading-none opacity-80">Day</span>
            <span className="text-sm font-bold leading-none">{entry.day}</span>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white ${meta.color}`}
              >
                {meta.icon} {meta.label}
              </span>
              {timeLabel && (
                <span className="text-[11px] text-slate-400 font-mono">{timeLabel}</span>
              )}
            </div>
            <p className="font-semibold text-slate-800 text-[14px] leading-snug line-clamp-1 group-hover:text-slate-900 transition-colors">
              {titleText}
            </p>
          </div>

          {/* Chevron */}
          <ChevronDown
            className={`shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* ─── Accordion Body ─── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="flex flex-col sm:flex-row gap-0 border-t border-slate-100/80">
                {/* Image panel */}
                <div className="sm:w-56 shrink-0 h-44 sm:h-auto relative overflow-hidden">
                  <ImgWithFallback
                    src={img.src}
                    fallbackSrc="/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg"
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <p className="text-white text-[11px] leading-snug font-medium">{img.caption || img.alt}</p>
                  </div>
                  {/* Day badge on image */}
                  {(isFirst || isLast) && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full">
                      {isFirst ? "🏁 Day 1" : "🎯 Last Day"}
                    </div>
                  )}
                </div>

                {/* Text panel */}
                <div className="flex-1 p-4 sm:p-5">
                  <h5 className="font-semibold text-slate-800 text-sm mb-2">{titleText}</h5>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {isFirst
                      ? `Your journey begins. Arrive at ${img.alt.split(',')[0] || 'your destination'} and check into your premium accommodation. Our representative will ensure a seamless start to your adventure.`
                      : isLast
                      ? `A final unhurried morning to soak in the last views. Enjoy a traditional breakfast before your private transfer for your onward journey — memories packed for life.`
                      : timeLabel
                      ? `Carefully timed activity as part of your day itinerary. Every moment is curated for maximum experience.`
                      : `Explore the highlights of the day with your expert local guide. Every detail — from transport to entry tickets — is pre-arranged.`}
                  </p>

                  {/* Day tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {type === "trek" && (
                      <>
                        <Tag icon="🥾" text="Trekking" />
                        <Tag icon="🧭" text="Guided" />
                        <Tag icon="💧" text="Water included" />
                      </>
                    )}
                    {type === "temple" && (
                      <>
                        <Tag icon="🛕" text="Darshan" />
                        <Tag icon="🕯" text="Aarti" />
                        <Tag icon="🙏" text="Spiritual" />
                      </>
                    )}
                    {type === "arrival" && (
                      <>
                        <Tag icon="🏨" text="Hotel check-in" />
                        <Tag icon="🚗" text="Transfer included" />
                        <Tag icon="🍽" text="Welcome dinner" />
                      </>
                    )}
                    {type === "sightseeing" && (
                      <>
                        <Tag icon="📸" text="Photography" />
                        <Tag icon="🗺" text="Guided tour" />
                        <Tag icon="🚌" text="Transport" />
                      </>
                    )}
                    {type === "adventure" && (
                      <>
                        <Tag icon="⚡" text="Adrenaline" />
                        <Tag icon="🛡" text="Safety gear" />
                        <Tag icon="🎯" text="Expert led" />
                      </>
                    )}
                    {type === "departure" && (
                      <>
                        <Tag icon="🧳" text="Packed memories" />
                        <Tag icon="🚌" text="Drop transfer" />
                      </>
                    )}
                    {type === "leisure" && (
                      <>
                        <Tag icon="☕" text="Free time" />
                        <Tag icon="🛍" text="Shopping" />
                        <Tag icon="🌿" text="Relax" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Tag = ({ icon, text }: { icon: string; text: string }) => (
  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
    {icon} {text}
  </span>
);

/** Main exported component */
export const ImmersiveItinerary = ({ days }: ImmersiveItineraryProps) => {
  if (!days || days.length === 0) return null;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900">Day-by-Day Itinerary</h3>
          <p className="text-sm text-slate-500 mt-0.5">Click any day to expand — every moment is pre-planned</p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <Car className="w-3.5 h-3.5" />
          <span>All transfers included</span>
        </div>
      </div>

      {/* Legend pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.entries(DAY_META) as [DayType, typeof DAY_META[DayType]][]).map(([key, val]) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-2.5 py-1 rounded-full ${val.color}`}
          >
            {val.icon} {val.label}
          </span>
        ))}
      </div>

      {/* Day cards stack */}
      <div className="space-y-3">
        {days.map((entry, i) => (
          <DayCard key={entry.day} entry={entry} index={i} total={days.length} />
        ))}
      </div>
    </div>
  );
};

// ─── Builder helper — used in PackageDetail ──────────────────────────────
export function buildItineraryDays(
  itineraryHighlights: string[],
  gallery: GalleryEntry[]
): ItineraryDay[] {
  return itineraryHighlights.map((line, i) => ({
    day: i + 1,
    title: line,
    gallery,
  }));
}
