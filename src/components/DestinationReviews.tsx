import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, User, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

export default function DestinationReviews({ destinationSlug }: { destinationSlug: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [destinationId, setDestinationId] = useState<string | null>(null);

  // Add review state
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        // 1. Get destination ID
        const { data: destData, error: destError } = await supabase
          .from("destinations")
          .select("id")
          .eq("slug", destinationSlug)
          .single();

        if (destError || !destData) {
          console.error("Destination not found in DB yet:", destError);
          setIsLoading(false);
          return;
        }

        setDestinationId((destData as any).id);

        // 2. Get approved reviews
        const { data: reviewData, error: reviewError } = await supabase
          .from("reviews")
          .select("id, rating, title, content, created_at, profiles(full_name, avatar_url)")
          .eq("destination_id", (destData as any).id)
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
  }, [destinationSlug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !destinationId) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        profile_id: user.id,
        destination_id: destinationId,
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
      if (err.code === "23505") { // Unique constraint violation
        toast.error("You have already reviewed this destination.");
      } else {
        toast.error(err.message || "Failed to submit review.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border" id="reviews">
      <h2 className="text-2xl font-display font-semibold mb-6 flex items-center">
        Traveller Reviews 
        <span className="ml-3 bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </span>
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6 md:pr-6">
            {reviews.length === 0 ? (
              <div className="text-center py-10 bg-muted/30 rounded-xl">
                <p className="text-muted-foreground mb-4">No reviews yet for this destination.</p>
                <p className="text-sm">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold uppercase overflow-hidden">
                          {review.profiles?.avatar_url ? (
                            <img src={review.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-primary/70" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{review.profiles?.full_name || 'Anonymous'}</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-0.5">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(review.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    {review.title && <h4 className="font-bold text-base mb-2">{review.title}</h4>}
                    <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-xl p-6 border border-border top-24 sticky">
              <h3 className="font-display font-semibold mb-4 text-lg">Write a Review</h3>
              
              {!user ? (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">You need to be logged in to write a review.</p>
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              ) : !destinationId ? (
                <div className="text-sm text-muted-foreground text-center">
                  This destination is currently not available for reviews.
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 font-medium">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`} />
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
                      className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 font-medium">Review</label>
                    <textarea 
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share the details of your trip..." 
                      className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white resize-y min-h-[100px]"
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

        </div>
      )}
    </div>
  );
}
