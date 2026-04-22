import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, User, Calendar, CheckCircle2, ThumbsUp, Filter, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  helpful_votes: number;
  is_verified_booking: boolean;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

export default function PackageReviews({ packageSlug }: { packageSlug: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [packageId, setPackageId] = useState<string | null>(null);

  // Review System State
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtering & Sorting State
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("helpful");
  const [visibleCount, setVisibleCount] = useState(5);
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const { data: pkgData, error: pkgError } = await supabase
          .from("packages")
          .select("id")
          .eq("slug", packageSlug)
          .single();

        if (pkgError || !pkgData) return;

        setPackageId((pkgData as any).id);

        const { data: reviewData, error: reviewError } = await supabase
          .from("reviews")
          .select("id, rating, title, content, created_at, helpful_votes, is_verified_booking, profiles(full_name, avatar_url)")
          .eq("package_id", (pkgData as any).id)
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (reviewError) throw reviewError;
        setReviews(reviewData || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [packageSlug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !packageId) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        profile_id: user.id,
        package_id: packageId,
        rating,
        title,
        content,
        status: "pending",
      } as any);

      if (error) throw error;

      toast.success("Review submitted successfully! It will appear once approved.");
      setTitle("");
      setContent("");
      setRating(5);
    } catch (err: any) {
      if (err.code === "23505") {
        toast.error("You have already reviewed this package.");
      } else {
        toast.error(err.message || "Failed to submit review.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpfulVote = async (reviewId: string) => {
    if (helpfulVoted.has(reviewId)) return;
    
    // Optimistic UI update
    setHelpfulVoted(prev => new Set(prev).add(reviewId));
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { ...r, helpful_votes: (r.helpful_votes || 0) + 1 } : r
    ));

    // Optional: Make actual DB call here if logged in
    try {
      if (user) {
        const review = reviews.find(r => r.id === reviewId);
        if (review) {
          await supabase.from("reviews")
            .update({ helpful_votes: (review.helpful_votes || 0) + 1 } as any)
            .eq("id", reviewId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Calculations
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { avg: 0, total: 0, stars: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

    const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        stars[r.rating as keyof typeof stars]++;
        sum += r.rating;
      }
    });

    return {
      avg: Number((sum / total).toFixed(1)),
      total,
      stars
    };
  }, [reviews]);

  // Sorting & Filtering
  const displayedReviews = useMemo(() => {
    let filtered = reviews;
    
    if (ratingFilter !== "all") {
      filtered = filtered.filter(r => r.rating === ratingFilter);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "helpful") {
        return (b.helpful_votes || 0) - (a.helpful_votes || 0);
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [reviews, ratingFilter, sortBy]);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border" id="reviews">
      <h2 className="text-2xl font-display font-semibold mb-8 border-b pb-4">
        Traveller Reviews
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Review Summary Panel (Left Column) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-lg mb-4">Overall Rating</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-display font-bold text-foreground">
                  {stats.avg}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn("w-5 h-5", s <= Math.round(stats.avg) ? "fill-yellow-400" : "text-gray-200 fill-gray-200")} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{stats.total} global ratings</p>
                </div>
              </div>

              {/* Star Progress Bars */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = stats.stars[star as keyof typeof stats.stars];
                  const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <button 
                      key={star}
                      onClick={() => setRatingFilter(ratingFilter === star ? "all" : star)}
                      className={cn(
                        "flex items-center w-full group hover:bg-muted/50 p-1 rounded transition-colors",
                        ratingFilter === star && "bg-primary/5 ring-1 ring-primary/30"
                      )}
                    >
                      <span className="text-sm font-medium w-12 text-left group-hover:text-primary transition-colors">{star} star</span>
                      <div className="flex-1 h-3.5 mx-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                        <div 
                          className="h-full bg-yellow-400 transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">{percentage}%</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Write a Review Block */}
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <h3 className="font-display font-semibold mb-4 text-lg">Review this tour</h3>
              <p className="text-sm text-muted-foreground mb-4">Share your thoughts with other travellers and help them plan better.</p>
              
              {!user ? (
                <Button asChild className="w-full" variant="outline">
                  <Link to="/login">Sign In to Write Review</Link>
                </Button>
              ) : !packageId ? (
                <div className="text-sm text-muted-foreground text-center">
                  This package is currently not available for reviews.
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 font-medium">Rating</label>
                    <div className="flex items-center gap-1 bg-white p-2 border rounded-md w-fit">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={cn("w-6 h-6", star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200")} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1 font-medium">Title</label>
                    <input 
                      type="text" 
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Summarize your experience" 
                      className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white focus:ring-1 focus:ring-primary outline-none"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 font-medium">Review</label>
                    <textarea 
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What was the highlight? How was the guide?" 
                      className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white resize-y min-h-[100px] focus:ring-1 focus:ring-primary outline-none"
                      maxLength={1000}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Post Review"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Review Feed (Right Column) */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">
                  {ratingFilter !== "all" ? `${stats.stars[ratingFilter as keyof typeof stats.stars]} ${ratingFilter}-star reviews` : 'All reviews'}
                </span>
                {ratingFilter !== "all" && (
                  <button 
                    onClick={() => setRatingFilter("all")}
                    className="text-xs text-primary hover:underline ml-2 bg-primary/5 px-2 py-1 rounded"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
                </span>
                <select 
                  className="border-none bg-muted/30 rounded-md py-1.5 px-3 font-medium outline-none cursor-pointer hover:bg-muted/50 transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
                >
                  <option value="helpful">Top Reviews</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>

            {displayedReviews.length === 0 ? (
              <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground mb-1 text-lg">No reviews match your filters.</p>
                <button 
                  onClick={() => setRatingFilter("all")}
                  className="text-primary font-medium hover:underline"
                >
                  View all reviews
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {displayedReviews.slice(0, visibleCount).map((review) => (
                  <div key={review.id} className="pb-8 border-b border-border/60 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden ring-1 ring-border shadow-sm">
                        {review.profiles?.avatar_url ? (
                          <img src={review.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-primary/70" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-tight text-foreground">{review.profiles?.full_name || 'Anonymous'}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(review.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-yellow-400" : "text-gray-200 fill-gray-200")} />
                        ))}
                      </div>
                      {review.is_verified_booking && (
                        <span className="text-xs flex items-center text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    {review.title && <h4 className="font-bold text-base mb-2 text-foreground/90">{review.title}</h4>}
                    
                    <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">{review.content}</p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <button 
                        onClick={() => handleHelpfulVote(review.id)}
                        className={cn(
                          "flex items-center gap-1.5 transition-colors border px-3 py-1.5 rounded-full hover:bg-muted",
                          helpfulVoted.has(review.id) && "text-primary border-primary/30 bg-primary/5"
                        )}
                      >
                        <ThumbsUp className={cn("w-3.5 h-3.5", helpfulVoted.has(review.id) && "fill-primary/20")} />
                        <span>{helpfulVoted.has(review.id) ? 'Helpful' : 'Helpful'}</span>
                        {review.helpful_votes > 0 && <span className="ml-1 px-1.5 bg-muted rounded-full">{(review.helpful_votes) + (helpfulVoted.has(review.id) ? 0 : 0)}</span>}
                      </button>
                    </div>
                  </div>
                ))}

                {visibleCount < displayedReviews.length && (
                  <div className="pt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setVisibleCount(prev => prev + 5)}
                      className="px-8 rounded-full shadow-sm hover:bg-muted/50"
                    >
                      See more reviews
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
