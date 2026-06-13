import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

// Fetch from DB — if data exists, override defaults
const fetchTrustStrip = async () => {
  try {
    const { data } = await supabase
      .from("trust_strip")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .limit(3);
    return data || [];
  } catch {
    return [];
  }
};

// Miller's Law: 3 numbers only. Von Restorff: amber on dark.
const DEFAULT_STATS = [
  { number: "500+", label: "Happy Travellers" },
  { number: "28", label: "States Covered" },
  { number: "2019", label: "Trusted Since" },
];

const TrustStrip = () => {
  const { data } = useQuery({
    queryKey: ["public-trust-strip"],
    queryFn: fetchTrustStrip,
  });

  // Use DB data if it has number/label fields, otherwise use defaults
  const stats =
    data && data.length > 0 && (data[0] as any).number
      ? (data as any[]).slice(0, 3).map((d) => ({
          number: d.number,
          label: d.label,
        }))
      : DEFAULT_STATS;

  return (
    <section className="bg-transparent relative z-20 -mt-8 sm:-mt-12 pb-8">
      <div className="container-page relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-6 px-4 bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl gap-1 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <span
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 drop-shadow-sm"
              >
                {stat.number}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
