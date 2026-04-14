import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchVibe(id: string) {
  const { data, error } = await (supabase
    .from("discovery_vibes")
    .select("*")
    .eq("id", id)
    .single() as any);
  if (error) throw error;
  return data;
}

export function DiscoveryVibeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    style: "",
    label: "",
    tagline: "",
    description: "",
    icon_name: "",
    background_image_url: "",
    gradient_from: "",
    gradient_to: "",
    active: true,
    sort_order: 0,
  });

  const { data: vibe } = useQuery({
    queryKey: ["discovery-vibe", id],
    queryFn: () => (id ? fetchVibe(id) : Promise.resolve(null)),
    enabled: !!id,
  });

  if (vibe) setForm(vibe);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("discovery_vibes") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("discovery_vibes") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/discovery-vibes"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {id ? "Edit Discovery Vibe" : "Create Discovery Vibe"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style (ID)</label>
            <input
              type="text"
              value={form.style}
              onChange={(e) => setForm({ ...form, style: e.target.value })}
              placeholder="beach"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Beach Escape"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            placeholder="Sun, sand & serenity"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Goa, Andaman, Lakshadweep — pristine shores await."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
            <input
              type="text"
              value={form.icon_name}
              onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
              placeholder="Waves"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
          <input
            type="url"
            value={form.background_image_url}
            onChange={(e) => setForm({ ...form, background_image_url: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
            <input
              type="text"
              value={form.gradient_from}
              onChange={(e) => setForm({ ...form, gradient_from: e.target.value })}
              placeholder="from-cyan-500/80"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
            <input
              type="text"
              value={form.gradient_to}
              onChange={(e) => setForm({ ...form, gradient_to: e.target.value })}
              placeholder="to-blue-600/80"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            {id ? "Update Vibe" : "Create Vibe"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/content/discovery-vibes")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
