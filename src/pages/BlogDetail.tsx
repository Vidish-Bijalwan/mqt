import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import { blogPosts } from "@/data/blog";
import { tourPackages } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Calendar, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { track } = useAnalytics();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);
  
  // Try to find packages matching the blog's primary tag or category
  const relatedPackages = useMemo(() => {
    if (!post) return [];
    const keywords = [...post.tags, post.category.toLowerCase()];
    // Simple mock logic to get related packages based on blog tags
    return tourPackages.filter(pkg => 
      keywords.some(k => pkg.destination.toLowerCase().includes(k) || pkg.categories.includes(k))
    ).slice(0, 3);
  }, [post]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | MyQuickTrippers`;
      const checkMeta = document.querySelector('meta[name="description"]');
      if (checkMeta) checkMeta.setAttribute("content", post.metaDescription);
      
      window.scrollTo(0, 0);
      track("page_view", { type: "blog", slug: post.slug });
    }
  }, [post, track]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const handleShare = (platform: string) => {
    track("social_share", { platform, slug: post.slug });
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <PageLayout>
      <PageHero
        title={post.title}
        backgroundImage={post.image}
        breadcrumb={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
        badge={post.category}
        quickFacts={[
          { label: "Published", value: post.date },
          { label: "Read Time", value: post.readTime },
        ]}
      />

      <article className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          {/* Post Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-border mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
              <span className="text-primary font-medium px-2 py-0.5 bg-primary/10 rounded">{post.category}</span>
            </div>
            
            {/* Share Links */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mr-2">Share:</span>
              <button onClick={() => handleShare('facebook')} className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => handleShare('twitter')} className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
              <button onClick={() => handleShare('linkedin')} className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
              <button onClick={() => handleShare('copy')} className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Copy link"><LinkIcon className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg dark:prose-invert max-w-none font-body">
            {post.content.map((section, idx) => {
              switch (section.type) {
                case "heading":
                  return <h2 key={idx} className="font-display text-2xl font-semibold mt-10 mb-4 text-foreground">{section.content}</h2>;
                case "paragraph":
                  return <p key={idx} className="text-muted-foreground leading-relaxed mb-6">{section.content}</p>;
                case "list":
                  return (
                    <div key={idx} className="mb-8">
                      {section.content && <p className="font-medium text-foreground mb-3">{section.content}</p>}
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        {section.items?.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  );
                case "tip_box":
                  return (
                    <div key={idx} className="bg-surface-2 border-l-4 border-primary p-6 rounded-r-lg my-8">
                      <p className="text-foreground font-medium m-0">{section.content}</p>
                    </div>
                  );
                case "callout":
                  return (
                    <div key={idx} className="bg-primary/10 border border-primary/20 p-6 rounded-xl text-center my-10">
                      <p className="text-primary font-semibold text-lg m-0">{section.content}</p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-2">
            <span className="text-sm font-semibold mr-2 py-1">Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface rounded-full text-xs font-medium text-muted-foreground hover:bg-surface-2 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Internal Linking / Conversion Hook */}
      {relatedPackages.length > 0 && (
        <YouMayAlsoLike packages={relatedPackages} title="Ready to Experience This?" />
      )}

      <InquiryBanner 
        title="Stop reading, start traveling."
        subtitle="Turn your inspiration into reality. Our experts can plan this exact trip for you."
      />
    </PageLayout>
  );
};

export default BlogDetail;
