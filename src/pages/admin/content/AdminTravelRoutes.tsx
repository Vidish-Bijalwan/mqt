import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface TravelRoute {
  id: string;
  name: string;
  slug: string;
  duration?: string;
  difficulty?: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
}

async function fetchTravelRoutes() {
  const { data, error } = await supabase
    .from("travel_routes")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

async function deleteTravelRoute(id: string) {
  const { error } = await supabase.from("travel_routes").delete().eq("id", id);
  if (error) throw error;
}

async function toggleFeature(id: string, featured: boolean) {
  const { error } = await (supabase
    .from("travel_routes")
    .update({ featured: !featured } as any)
    .eq("id", id) as any);
  if (error) throw error;
}

async function toggleActive(id: string, active: boolean) {
  const { error } = await (supabase
    .from("travel_routes")
    .update({ active: !active } as any)
    .eq("id", id) as any);
  if (error) throw error;
}

export function AdminTravelRoutes() {
  const { data: routes, isLoading } = useQuery({
    queryKey: ["travel-routes"],
    queryFn: fetchTravelRoutes,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteTravelRoute,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["travel-routes"] }),
  });

  const toggleFeatureMutation = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) =>
      toggleFeature(id, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["travel-routes"] }),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["travel-routes"] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Travel Routes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage popular itinerary routes for the homepage.</p>
        </div>
        <button
          onClick={() => navigate("/admin/content/travel-routes/new")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={16} />
          Add Route
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : !routes?.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No travel routes yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Duration</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Difficulty</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Featured</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Active</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {routes.map((route: TravelRoute) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{route.name}</div>
                    <div className="text-xs text-gray-500">{route.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{route.duration || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{route.difficulty || "—"}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        toggleFeatureMutation.mutate({ id: route.id, featured: route.featured })
                      }
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        route.featured
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {route.featured ? "Featured" : "Not Featured"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        toggleActiveMutation.mutate({ id: route.id, active: route.active })
                      }
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        route.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {route.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/admin/content/travel-routes/${route.id}/edit`)
                      }
                      className="text-emerald-600 hover:text-emerald-700 mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(route.id)}
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
