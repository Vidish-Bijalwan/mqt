import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchItem(id: string) {
  const { data, error } = await (supabase
    .from("domestic_international")
    .select("*")
    .eq("id", id)
    .single() as any);
  if (error) throw error;
  return data;
}

export function DomesticInternationalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "domestic",
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    cta_text: "",
    cta_link: "",
    active: true,
    sort_order: 0,
  });

  const { data: item } = useQuery({
    queryKey: ["domestic-international-item", id],
    queryFn: () => (id ? fetchItem(id) : Promise.resolve(null)),
    enabled: !!id,
  });

  if (item) setForm(item);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("domestic_international") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("domestic_international") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/domestic-international"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {id ? "Edit Section" : "Create Section"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Explore Incredible India"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="28+ states, 200+ handpicked destinations"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
          <input
            type="text"
            value={form.cta_text}
            onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
            placeholder="Browse Tours →"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
          <input
            type="url"
            value={form.cta_link}
            onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
            placeholder="/packages?type=domestic"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
            {id ? "Update Section" : "Create Section"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/content/domestic-international")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
