import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { getSiteSettings, upsertSiteSettings, type SiteSettings } from "@/services/settingsService";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

const defaultSettings: Partial<SiteSettings> = {
  site_name: "MyQuickTrippers",
  support_email: "",
  support_phone: "",
  whatsapp_number: "",
  office_address: "",
  office_hours: "",
  logo_path: "",
  default_seo_title: "",
  default_seo_description: "",
  social_facebook: "",
  social_instagram: "",
  social_youtube: "",
  social_twitter: "",
};

export default function AdminSiteSettings() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Partial<SiteSettings>>(defaultSettings);

  const { data, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 120_000,
  });

  useEffect(() => {
    if (data?.data) setForm(data.data);
  }, [data]);

  const set = (key: keyof SiteSettings, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const mutation = useMutation({
    mutationFn: () => upsertSiteSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Site settings saved successfully");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-gray-400">Loading settings...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Global configuration for the live website — affects navbar, footer, contact, and SEO.</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Identity */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3">Brand Identity</h2>
            <Field label="Site Name"><input value={form.site_name ?? ""} onChange={e => set("site_name", e.target.value)} className={inputCls} /></Field>
            <Field label="Logo Path"><input value={form.logo_path ?? ""} onChange={e => set("logo_path", e.target.value)} placeholder="site-assets/logo.webp" className={inputCls} /></Field>
            <Field label="Footer Logo Path"><input value={form.footer_logo_path ?? ""} onChange={e => set("footer_logo_path", e.target.value)} placeholder="site-assets/logo-footer.webp" className={inputCls} /></Field>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Support Email"><input type="email" value={form.support_email ?? ""} onChange={e => set("support_email", e.target.value)} className={inputCls} /></Field>
              <Field label="Support Phone"><input value={form.support_phone ?? ""} onChange={e => set("support_phone", e.target.value)} placeholder="+91 98765 43210" className={inputCls} /></Field>
            </div>
            <Field label="WhatsApp Number"><input value={form.whatsapp_number ?? ""} onChange={e => set("whatsapp_number", e.target.value)} placeholder="+919876543210 (no spaces/dashes)" className={inputCls} /></Field>
            <Field label="Office Address"><textarea value={form.office_address ?? ""} onChange={e => set("office_address", e.target.value)} rows={2} className={inputCls} /></Field>
            <Field label="Office Hours"><input value={form.office_hours ?? ""} onChange={e => set("office_hours", e.target.value)} placeholder="Mon–Sat, 9am–7pm IST" className={inputCls} /></Field>
          </section>

          {/* Social */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3">Social Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Facebook"><input value={form.social_facebook ?? ""} onChange={e => set("social_facebook", e.target.value)} placeholder="https://facebook.com/..." className={inputCls} /></Field>
              <Field label="Instagram"><input value={form.social_instagram ?? ""} onChange={e => set("social_instagram", e.target.value)} placeholder="https://instagram.com/..." className={inputCls} /></Field>
              <Field label="YouTube"><input value={form.social_youtube ?? ""} onChange={e => set("social_youtube", e.target.value)} placeholder="https://youtube.com/..." className={inputCls} /></Field>
              <Field label="Twitter / X"><input value={form.social_twitter ?? ""} onChange={e => set("social_twitter", e.target.value)} placeholder="https://x.com/..." className={inputCls} /></Field>
            </div>
          </section>

          {/* SEO */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3">Default SEO</h2>
            <Field label="Default Title Tag"><input value={form.default_seo_title ?? ""} onChange={e => set("default_seo_title", e.target.value)} placeholder="MyQuickTrippers — Premium India Travel" className={inputCls} /></Field>
            <Field label="Default Meta Description"><textarea value={form.default_seo_description ?? ""} onChange={e => set("default_seo_description", e.target.value)} rows={3} className={inputCls} /></Field>
          </section>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <p className="text-xs text-gray-400 mb-4">Changes are saved globally and immediately affect the live site.</p>
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
