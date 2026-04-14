import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Flame, Music, Leaf, Coffee, Palette, Castle, Binoculars, ChefHat, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchTravelExperiences = async () => {
  const { data, error } = await supabase
    .from("travel_experiences")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
};

const iconMap: Record<string, any> = {
  Flame,
  Music,
  Leaf,
  Coffee,
  Palette,
  Castle,
  Binoculars,
  ChefHat,
  CheckCircle
};

const defaultExperiences = [
  {
    id: "e1",
    icon_name: "Flame",
    title: "Varanasi Ganga Aarti",
    location: "Dashashwamedh Ghat, Varanasi",
    description: "7 priests, large brass lamps, fire rituals at 7 PM daily. Book a boat ride for front-row views.",
    tag: "Most Photographed",
    color_gradient: "from-orange-500/10 to-amber-500/10",
    border_color: "border-orange-200",
    planner_hint: "varanasi",
  },
  {
    id: "e2",
    icon_name: "Music",
    title: "Rajasthan Folk Music",
    location: "Jaisalmer, Jodhpur & Pushkar",
    description: "UNESCO heritage Manganiyar musicians and Kalbeliya snake dancers in black swirling skirts.",
    tag: "UNESCO Heritage",
    color_gradient: "from-red-500/10 to-pink-500/10",
    border_color: "border-red-200",
    planner_hint: "rajasthan",
  },
  {
    id: "e3",
    icon_name: "Leaf",
    title: "Yoga & Meditation Retreats",
    location: "Rishikesh, Dharamsala & Mysore",
    description: "3-day to 1-month programs. Rishikesh International Yoga Festival in March is unmissable.",
    tag: "Wellness",
    color_gradient: "from-green-500/10 to-teal-500/10",
    border_color: "border-green-200",
    planner_hint: "rishikesh",
  },
  {
    id: "e4",
    icon_name: "Coffee",
    title: "Tea Estate Bungalow Stays",
    location: "Darjeeling, Munnar & Coorg",
    description: "Colonial-era planter bungalows inside working estates — morning plucking walks + factory tour.",
    tag: "Luxury",
    color_gradient: "from-amber-500/10 to-yellow-500/10",
    border_color: "border-amber-200",
    planner_hint: "munnar",
  },
];

const TravelExperiences = () => {
  const { openPlanner } = useTripPlanner();
  const { data } = useQuery({
    queryKey: ["public-travel-experiences"],
    queryFn: fetchTravelExperiences,
  });

  const displayExperiences = data && data.length > 0 ? data : defaultExperiences;

  return (
    <section className="section-y bg-background">
      <div className="container-page mx-auto">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Go Deeper
          </span>
          <h2 className="section-heading">Curated Travel Experiences</h2>
          <p className="section-subheading mx-auto">
            Beyond sightseeing — immersive encounters that become the stories you tell for years.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayExperiences.map((exp: any, i: number) => {
            const Icon = iconMap[exp.icon_name || "CheckCircle"] || CheckCircle;
            return (
              <ScrollReveal key={exp.id} delay={i < 4 ? i * 0.08 : 0}>
                <button
                  onClick={() => openPlanner({ destination_interest: exp.planner_hint } as any, "experiences_section")}
                  className={`group w-full text-left rounded-2xl p-5 border bg-gradient-to-br ${exp.color_gradient || "from-primary/5 to-surface-2"} ${exp.border_color || "border-border"} hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                      {exp.tag || "Experience"}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-1 leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">{exp.location}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                    Plan this experience <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelExperiences;
