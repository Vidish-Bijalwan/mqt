import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Trash2, Star, Plus } from "lucide-react";

async function fetchExperiences() {
  const { data, error } = await (supabase
    .from("travel_experiences")
    .select("*")
    .order("sort_order", { ascending: true }) as any);
  if (error) throw error;
  return data || [];
}

async function deleteExperience(id: string) {
  const { error } = await (supabase
    .from("travel_experiences")
    .delete()
    .eq("id", id) as any);
  if (error) throw error;
}

async function toggleFeatured(id: string, featured: boolean) {
  const { error } = await (supabase.from("travel_experiences") as any)
    .update({ featured: !featured })
    .eq("id", id);
  if (error) throw error;
}

export function AdminTravelExperiences() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: experiences, isLoading } = useQuery({
    queryKey: ["travel-experiences"],
    queryFn: fetchExperiences,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["travel-experiences"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) =>
      toggleFeatured(id, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["travel-experiences"] }),
  });

  if (isLoading) return <div className="text-center py-8">Loading experiences...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Travel Experiences</h2>
        <button
          onClick={() => navigate("/admin/content/travel-experiences/new")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Location</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Featured</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {experiences?.map((exp: any) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{exp.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{exp.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{exp.tag}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleMutation.mutate({ id: exp.id, featured: exp.featured })}
                    className="text-xs font-medium"
                  >
                    {exp.featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                        <Star size={12} /> Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        Not Featured
                      </span>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/content/travel-experiences/${exp.id}/edit`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this experience?")) {
                          deleteMutation.mutate(exp.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
