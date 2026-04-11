import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { getFAQById, createFAQ, updateFAQ, listFAQs, deleteFAQ, type FAQInsert, type FAQ } from "@/services/faqService";
import { AlertCircle, Search, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const SCOPES = ["homepage", "contact", "packages", "destination", "category", "booking", "general"];

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

// ─── List ────────────────────────────────────────────────────────────────────

export function AdminFAQs() {
  const queryClient = useQueryClient();
  const [scope, setScope] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);

  const { data: faqs, isLoading } = useQuery({
    queryKey: ["admin-faqs", scope],
    queryFn: () => listFAQs(scope).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFAQ(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("FAQ deleted");
    },
    onError: () => toast.error("Failed to delete FAQ"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">FAQs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage frequently asked questions scoped to different sections.</p>
        </div>
        <Link to="/admin/content/faqs/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add FAQ
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {["all", ...SCOPES].map(s => (
          <button key={s} onClick={() => setScope(s)} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${scope === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !faqs?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No FAQs found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Scope","Question","Active","Actions"].map(h=><th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {faqs.map(faq => (
                  <tr key={faq.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4"><span className="text-[10px] font-bold uppercase bg-violet-50 text-violet-600 px-2 py-1 rounded-full">{faq.scope}</span></td>
                    <td className="px-5 py-4 font-medium text-gray-800 max-w-xs truncate">{faq.question}</td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${faq.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{faq.active ? "Active" : "Inactive"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/faqs/${faq.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(faq)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
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
            <h3 className="font-bold text-gray-900 mb-2">Delete this FAQ?</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{deleteTarget.question}</p>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form ────────────────────────────────────────────────────────────────────

const defaultForm: FAQInsert = {
  scope: "general", scope_slug: "", question: "", answer: "", sort_order: 0, active: true,
};

export function FAQForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<FAQInsert>(defaultForm);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-faq", id],
    queryFn: () => getFAQById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
    }
  }, [existing]);

  const set = (key: keyof FAQInsert, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateFAQ(id!, form) : createFAQ(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "FAQ updated" : "FAQ created");
      navigate("/admin/content/faqs");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/faqs")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit FAQ" : "Add FAQ"}</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.question || !form.answer) return toast.error("Question and answer required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Scope *</label>
                <select value={form.scope} onChange={e => set("scope", e.target.value as any)} className={inputCls}>
                  {SCOPES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Scope Slug (optional)</label>
                <input type="text" value={form.scope_slug ?? ""} onChange={e => set("scope_slug", e.target.value)} placeholder="e.g. rajasthan" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Question *</label>
              <input type="text" value={form.question} onChange={e => set("question", e.target.value)} placeholder="e.g. What is included in the package?" className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Answer *</label>
              <textarea value={form.answer} onChange={e => set("answer", e.target.value)} rows={5} placeholder="Detailed answer..." className={inputCls} required />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Settings</h2>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-600">Active</span>
              <button type="button" onClick={() => set("active", !form.active)} className={`relative w-10 h-5 rounded-full transition-colors ${form.active ? "bg-emerald-500" : "bg-gray-200"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </label>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls + " w-24"} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create FAQ"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/faqs")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
