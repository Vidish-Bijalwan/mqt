import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

async function fetchNewsletterSettings() {
  const { data, error } = await (supabase
    .from("newsletter_settings")
    .select("*")
    .single() as any);
  if (error) return null;
  return data;
}

export function AdminNewsletter() {
  const [form, setForm] = useState({
    headline: "Get Exclusive Travel Deals & Insider Guides",
    subheadline: "Join 5,000+ travellers who receive our monthly newsletter",
    subscriber_count: 5000,
    benefits: ["No spam, ever", "Monthly, not daily", "Free travel guide on signup"],
    active: true,
  });

  const [benefitInput, setBenefitInput] = useState("");

  const { data: settings } = useQuery({
    queryKey: ["newsletter-settings"],
    queryFn: fetchNewsletterSettings,
  });

  if (settings && !form.headline) {
    setForm(settings);
  }

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await (supabase.from("newsletter_settings") as any)
        .upsert([{ ...data, id: settings?.id }]);
      if (error) throw error;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleAddBenefit = () => {
    if (benefitInput.trim()) {
      setForm({
        ...form,
        benefits: [...form.benefits, benefitInput],
      });
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setForm({
      ...form,
      benefits: form.benefits.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Newsletter Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
          <input
            type="text"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
          <input
            type="text"
            value={form.subheadline}
            onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Count</label>
          <input
            type="number"
            value={form.subscriber_count}
            onChange={(e) => setForm({ ...form, subscriber_count: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Benefits</label>
          <div className="space-y-2 mb-3">
            {form.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-700">{benefit}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(idx)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddBenefit();
                }
              }}
              placeholder="Add a benefit"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
            >
              Add
            </button>
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
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
