import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getBlogImage } from "@/lib/imageMap";

const BlogPreview = () => {
  return (
    <section className="section-y-compact" style={{ background: 'linear-gradient(180deg, #f3efe7 0%, #f8f6f2 100%)' }}>
      <div className="container-page">
        <div className="section-header-center">
          <h2 className="section-heading">Travel Inspiration &amp; Guides</h2>
          <p className="section-subheading mx-auto">Expert tips and guides to help you plan your next adventure</p>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 sm:pb-6 -mx-4 px-4 md:grid md:grid-cols-3 gap-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 items-stretch">
          {blogPosts.slice(0, 3).map((post) => {
            const { src, fallbackSrc } = getBlogImage(post.slug, 'hero', post.image);
            return (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto md:max-w-none">
                <div className="bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <ImgWithFallback
                      src={src}
                      fallbackSrc={fallbackSrc}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full z-10">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-body font-semibold text-base text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <span className="inline-block mt-auto pt-3 text-sm font-medium text-primary group-hover:underline">Read More →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center py-3 px-8 rounded-xl bg-white border border-border text-foreground font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
