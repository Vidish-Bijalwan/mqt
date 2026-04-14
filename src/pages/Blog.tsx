import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EmptyState from "@/components/EmptyState";
import { getBlogPosts } from "@/services/blogService";
import { getBlogImage } from "@/lib/imageMap";
import { useQuery } from "@tanstack/react-query";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { Calendar, User, ArrowRight } from "lucide-react";
import blogHero from "@/assets/dest-ladakh.jpg";

const Blog = () => {
  useEffect(() => {
    document.title = "Travel Blog & Guides | MQT";
    window.scrollTo(0, 0);
  }, []);

  const { data: fetchResult, isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: () => getBlogPosts(),
    staleTime: 60_000,
  });

  const blogPosts = fetchResult?.data || [];

  return (
    <PageLayout>
      <PageHero
        title="Travel Guides & Insights"
        subtitle="Expert tips, deep-dive itineraries, and inspiring stories from the Himalayas and beyond."
        backgroundImage={blogHero}
        breadcrumb={[{ label: "Blog" }]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {Array.from({ length: 6 }).map((_, i) => (
                 <div key={i} className="aspect-[16/10] bg-gray-100/50 rounded-2xl animate-pulse" />
               ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border card-hover shadow-soft"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {(() => {
                      const { src, fallbackSrc } = getBlogImage(post.slug, 'card', post.image);
                      return (
                        <ImgWithFallback
                          src={src}
                          fallbackSrc={fallbackSrc}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      );
                    })()}
                    <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-xl leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-primary group-hover:underline">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="No posts yet" subtitle="Check back later for exciting travel guides." showSuggestions={false} />
          )}
        </div>
      </section>

      <InquiryBanner title="Inspired to travel?" />
    </PageLayout>
  );
};

export default Blog;
