import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

async function fetchBadges() {
  const { data, error } = await (supabase
    .from("trust_strip")
    .select("*")
    .order("order_index", { ascending: true }) as any);
  if (error) throw error;
  return data || [];
}

async function deleteBadge(id: string) {
  const { error } = await (supabase
    .from("trust_strip")
    .delete()
    .eq("id", id) as any);
  if (error) throw error;
}

export function AdminTrustStrip() {
  const queryClient = useQueryClient();
  const [newBadge, setNewBadge] = useState("");
  const [newEmoji, setNewEmoji] = useState("");

  const { data: badges, isLoading } = useQuery({
    queryKey: ["trust-strip"],
    queryFn: fetchBadges,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBadge,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trust-strip"] }),
  });

  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await (supabase.from("trust_strip") as any).insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      setNewBadge("");
      setNewEmoji("");
      queryClient.invalidateQueries({ queryKey: ["trust-strip"] });
    },
  });

  const handleAddBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBadge.trim()) {
      addMutation.mutate({
        badge_text: newBadge,
        icon_emoji: newEmoji,
        order_index: (badges?.length || 0) + 1,
        active: true,
      });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading badges...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Trust Strip Badges</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Add New Badge</h3>
        <form onSubmit={handleAddBadge} className="flex gap-3">
          <input
            type="text"
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
            placeholder="Emoji"
            className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value)}
            placeholder="Badge text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium whitespace-nowrap"
          >
            Add Badge
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Emoji</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Badge Text</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Order</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {badges?.map((badge: any) => (
              <tr key={badge.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-2xl">{badge.icon_emoji}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{badge.badge_text}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{badge.order_index}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      if (confirm("Delete this badge?")) {
                        deleteMutation.mutate(badge.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
