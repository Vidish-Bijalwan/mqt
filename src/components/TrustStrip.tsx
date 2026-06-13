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
    <section className="bg-transparent border-b border-amber-900/10 relative z-10">
      <div className="container-page">
        <div className="grid grid-cols-3 divide-x divide-slate-300">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col items-center justify-center py-5 px-4 sm:px-8 gap-1 min-w-0 text-center"
            >
              <span
                className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-amber-700 drop-shadow-sm"
              >
                {stat.number}
              </span>
              <span className="text-[9px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wide sm:tracking-widest text-slate-500 leading-tight">
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
