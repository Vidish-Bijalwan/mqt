import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchExperience(id: string) {
  const { data, error } = await (supabase
    .from("travel_experiences")
    .select("*")
    .eq("id", id)
    .single() as any);
  if (error) throw error;
  return data;
}

export function TravelExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    icon_name: "",
    title: "",
    location: "",
    description: "",
    tag: "",
    color_gradient_from: "",
    color_gradient_to: "",
    border_color: "",
    planner_hint: "",
    featured: false,
    active: true,
    sort_order: 0,
  });

  const { data: experience } = useQuery({
    queryKey: ["travel-experience", id],
    queryFn: () => (id ? fetchExperience(id) : Promise.resolve(null)),
    enabled: !!id,
  });

  if (experience) setForm(experience);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("travel_experiences") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("travel_experiences") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/travel-experiences"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {id ? "Edit Experience" : "Create Experience"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Varanasi Ganga Aarti"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Dashashwamedh Ghat, Varanasi"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="7 priests, large brass lamps, fire rituals at 7 PM daily..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              placeholder="Most Photographed"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
            <input
              type="text"
              value={form.icon_name}
              onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
              placeholder="Flame"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
            <input
              type="text"
              value={form.color_gradient_from}
              onChange={(e) => setForm({ ...form, color_gradient_from: e.target.value })}
              placeholder="from-orange-500/10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
            <input
              type="text"
              value={form.color_gradient_to}
              onChange={(e) => setForm({ ...form, color_gradient_to: e.target.value })}
              placeholder="to-amber-500/10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
          <input
            type="text"
            value={form.border_color}
            onChange={(e) => setForm({ ...form, border_color: e.target.value })}
            placeholder="border-orange-200"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Planner Hint</label>
          <input
            type="text"
            value={form.planner_hint}
            onChange={(e) => setForm({ ...form, planner_hint: e.target.value })}
            placeholder="varanasi"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            {id ? "Update Experience" : "Create Experience"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/content/travel-experiences")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
