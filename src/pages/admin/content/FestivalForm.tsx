import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { MediaPicker } from "@/components/admin/MediaPicker";

interface FestivalFormData {
  name?: string;
  slug?: string;
  description?: string;
  image_url?: string;
  state?: string;
  month?: string;
  date_range?: string;
  significance?: string;
  traditions?: string[];
  featured?: boolean;
  active?: boolean;
  sort_order?: number;
}

const initialForm: FestivalFormData = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  state: "",
  month: "",
  date_range: "",
  significance: "",
  traditions: [],
  featured: false,
  active: true,
  sort_order: 0,
} as any;

export function FestivalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FestivalFormData>(initialForm);
  const [traditionInput, setTraditionInput] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const { data: festival, isLoading } = useQuery({
    queryKey: ["festival", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("festivals")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (festival) setForm(festival);
  }, [festival]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (id) {
        const { error } = await (supabase.from("festivals") as any)
          .update(data)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from("festivals") as any).insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => navigate("/admin/content/festivals"),
  });

  const handleAddTradition = () => {
    if (traditionInput.trim()) {
      setForm({
        ...form,
        traditions: [...(form.traditions || []), traditionInput.trim()],
      });
      setTraditionInput("");
    }
  };

  const handleRemoveTradition = (index: number) => {
    setForm({
      ...form,
      traditions: (form.traditions || []).filter((_, i) => i !== index),
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
        {id ? "Edit Festival" : "Create Festival"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
            <input
              type="text"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description || ""}
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={form.state || ""}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
            <input
              type="text"
              value={form.month || ""}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
            <input
              type="text"
              value={form.date_range || ""}
              onChange={(e) => setForm({ ...form, date_range: e.target.value })}
              placeholder="e.g., Dec 15-31"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Significance</label>
          <textarea
            value={form.significance || ""}
            onChange={(e) => setForm({ ...form, significance: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Traditions</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={traditionInput}
              onChange={(e) => setTraditionInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTradition())}
              placeholder="Add a tradition"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddTradition}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {(form.traditions || []).map((tradition, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{tradition}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTradition(idx)}
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
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span className="text-sm font-medium">Featured</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active !== false}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span className="text-sm font-medium">Active</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Order</label>
            <input
              type="number"
              value={form.sort_order || 0}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/content/festivals")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : id ? "Update Festival" : "Create Festival"}
          </button>
        </div>
      </form>
    </div>
  );
}
