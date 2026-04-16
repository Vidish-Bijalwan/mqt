import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, Heart, Shield, Settings, LogOut } from "lucide-react";

export default function UserProfile() {
  const { user, isLoading, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [myReviews, setMyReviews] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch public profile
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));

      // Fetch user's reviews
      supabase
        .from('reviews')
        .select('*, packages(title, slug), destinations(name, slug)')
        .eq('profile_id', user.id)
        .then(({ data }) => {
            if(data) setMyReviews(data);
        });
    }
  }, [user]);

  if (isLoading) {
    return <PageLayout><div className="min-h-screen pt-32 pb-16 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div></PageLayout>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await supabase.from('profiles').update({
        full_name: formData.get('full_name'),
        phone_number: formData.get('phone_number')
    }).eq('id', user.id);
    
    setProfile({...profile, full_name: formData.get('full_name'), phone_number: formData.get('phone_number')});
    setIsEditing(false);
  };

  return (
    <PageLayout>
      <div className="min-h-screen pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-display font-semibold">My Account</h1>
            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-3xl font-display uppercase overflow-hidden ring-4 ring-white shadow-md">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                    ) : (
                      (profile?.full_name || user.email || '?').charAt(0)
                    )}
                  </div>
                  <h2 className="text-xl font-semibold font-display">{profile?.full_name || 'Traveller'}</h2>
                  <p className="text-muted-foreground text-sm flex items-center mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {user.email}
                  </p>
                  {profile?.phone_number && (
                    <p className="text-muted-foreground text-sm flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {profile.phone_number}
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-4">
                    <button className="w-full flex items-center text-left text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsEditing(!isEditing)}>
                      <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                      {isEditing ? "Cancel Editing" : "Edit Profile"}
                    </button>
                    <button className="w-full flex items-center text-left text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                      <Heart className="w-4 h-4 mr-3" />
                      My Wishlist
                    </button>
                    <button className="w-full flex items-center text-left text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                      <Shield className="w-4 h-4 mr-3" />
                      Privacy & Security
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Content */}
            <div className="md:col-span-2 space-y-6">
              
              {isEditing && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="font-display font-semibold text-lg mb-4">Edit Profile</h3>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input name="full_name" defaultValue={profile?.full_name} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input name="phone_number" defaultValue={profile?.phone_number} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-xl">My Reviews</h3>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                    {myReviews.length} Total
                  </span>
                </div>

                {myReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't written any reviews yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myReviews.map((review) => (
                      <div key={review.id} className="p-4 border border-border rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.title || 'Review'}</h4>
                            <p className="text-xs text-muted-foreground">
                              For {review.packages ? review.packages.title : review.destinations?.name} 
                              {' '}· {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full font-medium ${
                              review.status === 'approved' ? 'bg-green-100 text-green-700' :
                              review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                          }`}>
                              {review.status}
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-sm line-clamp-2">{review.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function Star(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
