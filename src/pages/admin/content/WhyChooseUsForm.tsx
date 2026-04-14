import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchFeature(id: string) {
  const { data, error } = await (supabase
    .from("why_choose_us")
    .select("*")
    .eq("id", id)
    .single() as any);
  if (error) throw error;
  return data;
}

export function WhyChooseUsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    icon_name: "",
    title: "",
    description: "",
    featured: false,
    active: true,
    sort_order: 0,
  });

  const { data: feature } = useQuery({
    queryKey: ["why-choose-us-item", id],
    queryFn: () => (id ? fetchFeature(id) : Promise.resolve(null)),
    enabled: !!id,
  });

  if (feature) setForm(feature);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("why_choose_us") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("why_choose_us") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/why-choose-us"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {id ? "Edit Feature" : "Create Feature"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
          <input
            type="text"
            value={form.icon_name}
            onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
            placeholder="Compass"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Destination Experts Across India"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deep local knowledge of every route, coast, and trail"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label className="text-sm font-medium text-gray-700">Featured</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label className="text-sm font-medium text-gray-700">Active</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            {id ? "Update Feature" : "Create Feature"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/content/why-choose-us")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
