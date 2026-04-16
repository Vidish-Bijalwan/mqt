import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*, packages(title), destinations(name), profiles(full_name, email)')
      .order('created_at', { ascending: false });
    
    if(data) setReviews(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
    if (!error) {
      toast.success(`Review ${status} successfully.`);
      fetchReviews();
    } else {
      toast.error('Failed to update review.');
    }
  };

  return (
    <AdminLayout title="Moderate Reviews">
      {isLoading ? (
        <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-border mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Entity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rating/Content</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No reviews found</td>
                  </tr>
                ) : reviews.map((review) => (
                  <tr key={review.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm">{review.profiles?.full_name || 'Anonymous'}</p>
                      <p className="text-xs text-muted-foreground">{review.profiles?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {review.packages ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold">Package: {review.packages.title}</span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">Destination: {review.destinations?.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      {review.title && <p className="font-semibold text-xs">{review.title}</p>}
                      <p className="text-xs line-clamp-2" title={review.content}>{review.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        review.status === 'approved' ? 'bg-green-100 text-green-700' :
                        review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end">
                      {review.status !== 'approved' && (
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => updateStatus(review.id, 'approved')}>
                          Approve
                        </Button>
                      )}
                      {review.status !== 'rejected' && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(review.id, 'rejected')}>
                          Reject
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
