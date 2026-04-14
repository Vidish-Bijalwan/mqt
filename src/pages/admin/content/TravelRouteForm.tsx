import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { MediaPicker } from "@/components/admin/MediaPicker";

interface TravelRouteForm {
  name?: string;
  slug?: string;
  description?: string;
  image_url?: string;
  duration?: string;
  difficulty?: "Easy" | "Moderate" | "Challenging";
  starting_point?: string;
  ending_point?: string;
  best_season?: string;
  highlights?: string[];
  featured?: boolean;
  active?: boolean;
  sort_order?: number;
}

const initialForm: TravelRouteForm = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  duration: "",
  difficulty: "Moderate",
  starting_point: "",
  ending_point: "",
  best_season: "",
  highlights: [],
  featured: false,
  active: true,
  sort_order: 0,
} as any;

export function TravelRouteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<TravelRouteForm>(initialForm);
  const [highlightInput, setHighlightInput] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const { data: route, isLoading } = useQuery({
    queryKey: ["travel-route", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("travel_routes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (route) setForm(route);
  }, [route]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await supabase
          .from("travel_routes")
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("travel_routes").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/travel-routes"),
  });

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setForm({
        ...form,
        highlights: [...form.highlights, highlightInput.trim()],
      });
      setHighlightInput("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setForm({
      ...form,
      highlights: form.highlights.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (id && isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">
        {id ? "Edit Travel Route" : "Create Travel Route"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
          <div className="flex gap-2">
            {form.image_url && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <button
              type="button"
              onClick={() => setMediaPickerOpen(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {form.image_url ? "Change Image" : "Select Image"}
            </button>
          </div>
          <MediaPicker
            open={mediaPickerOpen}
            onOpenChange={setMediaPickerOpen}
            onSelect={(url) => {
              setForm({ ...form, image_url: url });
              setMediaPickerOpen(false);
            }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g., 5 days"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm({ ...form, difficulty: e.target.value as "Easy" | "Moderate" | "Challenging" })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option>Easy</option>
              <option>Moderate</option>
              <option>Challenging</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Best Season</label>
            <input
              type="text"
              value={form.best_season}
              onChange={(e) => setForm({ ...form, best_season: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Starting Point</label>
            <input
              type="text"
              value={form.starting_point}
              onChange={(e) => setForm({ ...form, starting_point: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ending Point</label>
            <input
              type="text"
              value={form.ending_point}
              onChange={(e) => setForm({ ...form, ending_point: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Highlights</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHighlight())}
              placeholder="Add a highlight"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddHighlight}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {form.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{highlight}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(idx)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span className="text-sm font-medium">Featured</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span className="text-sm font-medium">Active</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/content/travel-routes")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : id ? "Update Route" : "Create Route"}
          </button>
        </div>
      </form>
    </div>
  );
}
