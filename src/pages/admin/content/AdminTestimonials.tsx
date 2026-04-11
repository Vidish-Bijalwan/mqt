import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Check, X, Pencil, Trash2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import {
  listAdminTestimonials, deleteAdminTestimonial, getAdminTestimonialById,
  createAdminTestimonial, updateAdminTestimonial, toggleTestimonialApproval,
  type AdminTestimonial, type AdminTestimonialInsert
} from "@/services/adminTestimonialService";
import { MediaInput } from "@/components/admin/MediaInput";

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) =>
  <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

// ─── List ─────────────────────────────────────────────────────────────────────

export function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminTestimonial | null>(null);

  const filters = filter === "approved" ? { approved: true } : filter === "pending" ? { approved: false } : {};

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials", filter],
    queryFn: () => listAdminTestimonials(filters).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Testimonial deleted");
    },
    onError: () => toast.error("Failed to delete testimonial"),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) => toggleTestimonialApproval(id, approved),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success(variables.approved ? "Testimonial approved & published" : "Testimonial hidden");
    },
    onError: () => toast.error("Failed to update status"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, approve, and curate customer reviews.</p>
        </div>
        <Link to="/admin/content/testimonials/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add Review
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {(["all", "approved", "pending"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !testimonials?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No testimonials found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Reviewer","Rating","Review","Status","Featured","Actions"].map(h=><th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {testimonials.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.location || "—"}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center text-amber-400 text-xs">
                        {Array.from({length: 5}).map((_, i) => <svg key={i} className={`w-3 h-3 ${i < t.rating ? "fill-current" : "text-gray-200 fill-current"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-gray-600 max-w-xs line-clamp-2 italic">"{t.text}"</p>
                    </td>
                    <td className="px-5 py-4">
                      {t.approved ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600"><Check size={10}/> Approved</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-50 text-yellow-600"><AlertCircle size={10}/> Pending</span>
                      )}
                    </td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${t.featured ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>{t.featured ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                       <button 
                        onClick={() => approveMutation.mutate({ id: t.id, approved: !t.approved })} 
                        className={`p-1.5 rounded-lg text-white ${t.approved ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
                        title={t.approved ? "Revoke Approval (Hide)" : "Approve & Publish"}
                      >
                         {t.approved ? <X size={15}/> : <Check size={15}/>}
                      </button>
                      <Link to={`/admin/content/testimonials/${t.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(t)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete Review?</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2 italic">"{deleteTarget.text}"</p>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{deleteMutation.isPending ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

const defaultForm: AdminTestimonialInsert = {
  name: "", location: "", destination: "", tour: "", rating: 5, text: "", initials: "",
  avatar_url: "", verified: true, source: "Direct", date: new Date().toISOString().split("T")[0],
  featured: false, approved: true, active: true, sort_order: 0,
};

export function TestimonialForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminTestimonialInsert>(defaultForm);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-testimonial", id],
    queryFn: () => getAdminTestimonialById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
    }
  }, [existing]);

  const set = (key: keyof AdminTestimonialInsert, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateAdminTestimonial(id!, form) : createAdminTestimonial(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Testimonial updated" : "Testimonial created");
      navigate("/admin/content/testimonials");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/testimonials")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Testimonial" : "New Testimonial"}</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.name || !form.text) return toast.error("Name and review text required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Reviewer Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Reviewer Name *"><input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Rahul Sharma" className={inputCls} required /></Field>
              <Field label="Initials / Avatar Alias"><input type="text" value={form.initials ?? ""} onChange={e => set("initials", e.target.value.toUpperCase())} maxLength={3} placeholder="RS" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location (Origin)"><input type="text" value={form.location ?? ""} onChange={e => set("location", e.target.value)} placeholder="e.g. Mumbai, India" className={inputCls} /></Field>
              <Field label="Travel Date"><input type="date" value={form.date ?? ""} onChange={e => set("date", e.target.value)} className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Destination Visited"><input type="text" value={form.destination ?? ""} onChange={e => set("destination", e.target.value)} placeholder="e.g. Kashmir" className={inputCls} /></Field>
              <Field label="Tour / Package Name"><input type="text" value={form.tour ?? ""} onChange={e => set("tour", e.target.value)} placeholder="e.g. 5N/6D Premium Kashmir" className={inputCls} /></Field>
            </div>
            <Field label="Avatar Image Path (Optional)"><MediaInput value={form.avatar_url ?? ""} onChange={v => set("avatar_url", v)} defaultBucket="testimonial-images" placeholder="testimonial-images/rahul.webp" /></Field>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-semibold text-gray-700 text-sm">Review Content</h2>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(star => (
                  <button key={star} type="button" onClick={() => set("rating", star)} className={`p-1 ${form.rating >= star ? "text-amber-400" : "text-gray-200 hover:text-amber-200"} transition-colors`}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </button>
                ))}
              </div>
            </div>
            <textarea value={form.text} onChange={e => set("text", e.target.value)} rows={5} placeholder="The actual review written by the customer..." className={inputCls} required />
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Status</h2>
            {[
              { label: "Approved & Visible", key: "approved" },
              { label: "Featured Review", key: "featured" },
              { label: "Verified Customer", key: "verified" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <Toggle checked={!!(form as any)[key]} onChange={v => set(key as any, v)} />
              </label>
            ))}
            <div className="pt-2">
              <Field label="Source Platform">
                <select value={form.source ?? "Direct"} onChange={e => set("source", e.target.value)} className={inputCls}>
                  <option>Direct</option>
                  <option>Google Review</option>
                  <option>TripAdvisor</option>
                  <option>Facebook</option>
                </select>
              </Field>
            </div>
            <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls} /></Field>
          </section>
          
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Review"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/testimonials")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
