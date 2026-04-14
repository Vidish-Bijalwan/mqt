import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus } from "lucide-react";

async function fetchSteps() {
  const { data, error } = await (supabase
    .from("how_it_works")
    .select("*")
    .order("step_number", { ascending: true }) as any);
  if (error) throw error;
  return data || [];
}

async function deleteStep(id: string) {
  const { error } = await (supabase
    .from("how_it_works")
    .delete()
    .eq("id", id) as any);
  if (error) throw error;
}

export function AdminHowItWorks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: steps, isLoading } = useQuery({
    queryKey: ["how-it-works"],
    queryFn: fetchSteps,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStep,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how-it-works"] }),
  });

  if (isLoading) return <div className="text-center py-8">Loading steps...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
        <button
          onClick={() => navigate("/admin/content/how-it-works/new")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
        >
          <Plus size={16} /> Add Step
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Step</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Emoji</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {steps?.map((step: any) => (
              <tr key={step.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{step.step_number}</td>
                <td className="px-6 py-4 text-2xl">{step.emoji}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{step.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{step.description?.substring(0, 40)}...</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/content/how-it-works/${step.id}/edit`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this step?")) {
                          deleteMutation.mutate(step.id);
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
