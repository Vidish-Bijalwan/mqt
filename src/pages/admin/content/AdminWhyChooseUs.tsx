import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus } from "lucide-react";

async function fetchFeatures() {
  const { data, error } = await (supabase
    .from("why_choose_us")
    .select("*")
    .order("sort_order", { ascending: true }) as any);
  if (error) throw error;
  return data || [];
}

async function deleteFeature(id: string) {
  const { error } = await (supabase
    .from("why_choose_us")
    .delete()
    .eq("id", id) as any);
  if (error) throw error;
}

export function AdminWhyChooseUs() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: features, isLoading } = useQuery({
    queryKey: ["why-choose-us"],
    queryFn: fetchFeatures,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeature,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["why-choose-us"] }),
  });

  if (isLoading) return <div className="text-center py-8">Loading features...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Why Choose Us</h2>
        <button
          onClick={() => navigate("/admin/content/why-choose-us/new")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
        >
          <Plus size={16} /> Add Feature
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features?.map((feature: any) => (
              <tr key={feature.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{feature.icon_name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{feature.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{feature.description}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/content/why-choose-us/${feature.id}/edit`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this feature?")) {
                          deleteMutation.mutate(feature.id);
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
