import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getBlogImage } from "@/lib/imageMap";

const BlogPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">Travel Inspiration &amp; Guides</h2>
          <p className="section-subheading mx-auto">Expert tips and guides to help you plan your next adventure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => {
            const { src, fallbackSrc } = getBlogImage(post.slug, 'hero', post.image);
            return (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft">
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
                  <div className="p-5">
                    <h3 className="font-body font-semibold text-base text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <span className="inline-block mt-3 text-sm font-medium text-primary group-hover:underline">Read More →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
