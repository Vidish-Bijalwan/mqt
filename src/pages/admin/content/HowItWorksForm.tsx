import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchStep(id: string) {
  const { data, error } = await (supabase
    .from("how_it_works")
    .select("*")
    .eq("id", id)
    .single() as any);
  if (error) throw error;
  return data;
}

export function HowItWorksForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    step_number: 1,
    emoji: "",
    title: "",
    description: "",
    cta_text: "",
    show_cta: false,
    active: true,
  });

  const { data: step } = useQuery({
    queryKey: ["how-it-works-item", id],
    queryFn: () => (id ? fetchStep(id) : Promise.resolve(null)),
    enabled: !!id,
  });

  if (step) setForm(step);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("how_it_works") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("how_it_works") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/how-it-works"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {id ? "Edit Step" : "Create Step"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Step Number</label>
            <input
              type="number"
              value={form.step_number}
              onChange={(e) => setForm({ ...form, step_number: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emoji</label>
            <input
              type="text"
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              placeholder="💬"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Tell Us Your Dream"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Share your destination, travel style, and dates"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text (optional)</label>
          <input
            type="text"
            value={form.cta_text}
            onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
            placeholder="Open Trip Planner"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.show_cta}
              onChange={(e) => setForm({ ...form, show_cta: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label className="text-sm font-medium text-gray-700">Show CTA</label>
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
            {id ? "Update Step" : "Create Step"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/content/how-it-works")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
