import { useEffect, useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import RelatedCards from "@/components/RelatedCards";
import EmptyState from "@/components/EmptyState";
import InquiryBanner from "@/components/InquiryBanner";
import SkeletonCard from "@/components/SkeletonCard";
import { getPackages } from "@/services/packageService";
import { useQuery } from "@tanstack/react-query";
import { experienceCategories } from "@/data/experiences";
import { useLocation } from "react-router-dom";
import heroImg from "@/assets/dest-kashmir.jpg";

const Packages = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    document.title = "Tour Packages | MQT";
    window.scrollTo(0, 0);
  }, []);

  const { data: fetchResult, isLoading } = useQuery({
    queryKey: ["public-packages"],
    queryFn: () => getPackages(),
    staleTime: 60_000,
  });

  const tourPackages = fetchResult?.data || [];

  const filteredPackages = useMemo(() => {
    if (activeCategory === "all") return tourPackages;
    return tourPackages.filter((pkg) => pkg.categories.includes(activeCategory));
  }, [activeCategory, tourPackages]);

  return (
    <PageLayout>
      <PageHero
        title="Our Tour Packages"
        subtitle="Discover our handcrafted itineraries designed for every type of traveler. From weekend getaways to grand Himalayan expeditions."
        backgroundImage={heroImg}
        breadcrumb={[{ label: "Packages" }]}
      />

      <section className="section-padding bg-surface pt-8">
        <div className="container mx-auto">
          {/* Filters Bar */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide snap-x">
            <button
              onClick={() => setActiveCategory("all")}
              className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full font-body font-medium text-sm transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All Packages
            </button>
            {experienceCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full font-body font-medium text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {Array.from({ length: 8 }).map((_, i) => (
                 <SkeletonCard key={i} />
               ))}
            </div>
          ) : filteredPackages.length > 0 ? (
            <RelatedCards type="package" items={filteredPackages} plainGrid />
          ) : (
            <EmptyState 
              title="No packages found" 
              subtitle={`We couldn't prioritize any packages for the category you selected. Check out our trending packages below.`} 
            />
          )}
        </div>
      </section>

      <InquiryBanner />
    </PageLayout>
  );
};

export default Packages;
