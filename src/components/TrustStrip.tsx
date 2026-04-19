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
    <section className="bg-[#0F172A] border-b border-amber-500/20">
      <div className="container-page">
        <div className="flex items-center justify-center divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col items-center py-6 px-8 sm:px-12 md:px-16 gap-1"
            >
              {/* Von Restorff: amber number stands out against dark bg */}
              <span
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{ color: "#F59E0B" }}
              >
                {stat.number}
              </span>
              {/* Law of Proximity: label immediately below number */}
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-white/50">
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
