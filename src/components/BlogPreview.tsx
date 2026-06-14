import { Link } from "react-router-dom";
import { Calendar, Clock, Feather } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getBlogImage } from "@/lib/imageMap";
import { CinematicSection } from "./ui/CinematicSection";

const BlogPreview = () => {
  const posts = blogPosts.slice(0, 4);

  return (
    <CinematicSection variant="journal" className="section-y">
      <div className="section-header-center section-intro-center mb-10 md:mb-14">
        <div className="flex items-center gap-2 text-amber-700 mb-2">
           <Feather className="w-5 h-5" />
           <span className="section-eyebrow !mb-0 !text-amber-700">Latest Guides from the Road</span>
        </div>
        <h2 className="section-heading text-4xl md:text-5xl font-serif">Travel Inspiration &amp; Journals</h2>
        <p className="section-subheading mx-auto">
          Expert tips, hidden gems, and stories to fuel your next adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6">
        {posts.map((post) => {
          const { src, fallbackSrc } = getBlogImage(post.slug, "hero", post.image);
          return (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block h-full">
              {/* Travel Journal / Polaroid Card Style */}
              <div className="bg-[#FFFCF8] rounded-xl overflow-hidden border border-amber-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-elevated transition-all duration-400 h-full flex flex-col hover:-translate-y-2 p-3 sm:p-4">
                <div className="relative overflow-hidden aspect-[4/3] rounded-lg shadow-inner">
                  <ImgWithFallback
                    src={src}
                    fallbackSrc={fallbackSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none" />
                  <span className="absolute top-3 right-3 bg-[#FFFCF8]/90 backdrop-blur-sm text-amber-900 border border-amber-900/20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm z-10">
                    {post.category}
                  </span>
                </div>
                
                <div className="pt-5 pb-2 flex flex-col flex-1 gap-2">
                  <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">{post.excerpt}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-amber-900/10 border-dashed">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700 group-hover:text-amber-500 transition-colors">
                      Read Entry
                    </span>
                    <span className="text-amber-700 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center justify-center min-h-12 py-3 px-8 rounded-full bg-transparent border-2 border-amber-900/20 text-amber-900 font-bold uppercase tracking-widest text-xs shadow-sm hover:shadow-md hover:bg-amber-900 hover:text-white transition-all duration-300"
        >
          View All Journals
        </Link>
      </div>
    </CinematicSection>
  );
};

export default BlogPreview;
