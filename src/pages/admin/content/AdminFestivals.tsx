import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Festival {
  id: string;
  name: string;
  slug: string;
  state?: string;
  month?: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
}

async function fetchFestivals() {
  const { data, error } = await supabase
    .from("festivals")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

async function deleteFestival(id: string) {
  const { error } = await supabase.from("festivals").delete().eq("id", id);
  if (error) throw error;
}

async function toggleFeature(id: string, featured: boolean) {
  const { error } = await supabase
    .from("festivals")
    .update({ featured: !featured })
    .eq("id", id);
  if (error) throw error;
}

async function toggleActive(id: string, active: boolean) {
  const { error } = await supabase
    .from("festivals")
    .update({ active: !active })
    .eq("id", id);
  if (error) throw error;
}

export function AdminFestivals() {
  const { data: festivals, isLoading } = useQuery({
    queryKey: ["festivals"],
    queryFn: fetchFestivals,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteFestival,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["festivals"] }),
  });

  const toggleFeatureMutation = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) =>
      toggleFeature(id, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["festivals"] }),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["festivals"] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Festivals of India</h1>
          <p className="text-sm text-gray-500 mt-1">Manage Indian festivals and celebrations.</p>
        </div>
        <button
          onClick={() => navigate("/admin/content/festivals/new")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus size={16} />
          Add Festival
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : !festivals?.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No festivals yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">State</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Month</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Featured</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Active</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {festivals.map((fest: Festival) => (
                <tr key={fest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{fest.name}</div>
                    <div className="text-xs text-gray-500">{fest.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{fest.state || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{fest.month || "—"}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        toggleFeatureMutation.mutate({ id: fest.id, featured: fest.featured })
                      }
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        fest.featured
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {fest.featured ? "Featured" : "Not Featured"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        toggleActiveMutation.mutate({ id: fest.id, active: fest.active })
                      }
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        fest.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fest.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/admin/content/festivals/${fest.id}/edit`)}
                      className="text-emerald-600 hover:text-emerald-700 mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(fest.id)}
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
      )}
    </div>
  );
}
