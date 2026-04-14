import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchSections = async () => {
  const { data, error } = await supabase
    .from("domestic_international")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
};

const DomesticInternational = () => {
  const { data: sections, isLoading } = useQuery({
    queryKey: ["public-domestic-international"],
    queryFn: fetchSections,
  });

  if (isLoading) {
    return <section className="section-padding bg-background"><div className="container mx-auto h-[280px] animate-pulse bg-surface rounded-xl"></div></section>;
  }

  if (!sections || sections.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section: any) => (
            <Link key={section.id} to={section.cta_link || "/packages"} className="group relative rounded-xl overflow-hidden aspect-[16/9] min-h-[280px]">
              <ImgWithFallback
                src={section.image_url || `https://images.unsplash.com/photo-${section.type === 'international' ? '1544735716-392fe2489ffa' : '1444858291040-58f756a3bdd6'}?auto=format&fit=crop&q=80&w=1200`}
                fallbackSrc="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"
                alt={section.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                lazy={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <h3 className="font-display text-3xl font-semibold text-background mb-2">{section.title}</h3>
                <p className="text-background/80 text-sm mb-4">{section.subtitle || section.description}</p>
                <Button size="sm" className="gradient-accent text-accent-foreground font-medium">{section.cta_text} →</Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomesticInternational;
