import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Trash2, Eye, EyeOff, Plus } from "lucide-react";

async function fetchDomesticInternational() {
  const { data, error } = await (supabase
    .from("domestic_international")
    .select("*")
    .order("sort_order", { ascending: true }) as any);
  if (error) throw error;
  return data || [];
}

async function deleteItem(id: string) {
  const { error } = await (supabase
    .from("domestic_international")
    .delete()
    .eq("id", id) as any);
  if (error) throw error;
}

async function toggleActive(id: string, active: boolean) {
  const { error } = await (supabase.from("domestic_international") as any)
    .update({ active: !active })
    .eq("id", id);
  if (error) throw error;
}

export function AdminDomesticInternational() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ["domestic-international"],
    queryFn: fetchDomesticInternational,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domestic-international"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domestic-international"] }),
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Domestic vs International</h2>
        <button
          onClick={() => navigate("/admin/content/domestic-international/new")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
        >
          <Plus size={16} /> Add Section
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">CTA Text</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items?.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{item.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.cta_text}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleMutation.mutate({ id: item.id, active: item.active })}
                    className="text-xs font-medium"
                  >
                    {item.active ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                        <Eye size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        <EyeOff size={12} /> Inactive
                      </span>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/content/domestic-international/${item.id}/edit`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this section?")) {
                          deleteMutation.mutate(item.id);
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
