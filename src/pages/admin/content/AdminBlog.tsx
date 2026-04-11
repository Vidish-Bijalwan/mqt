import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, AlertCircle, ArrowLeft, Save } from "lucide-react";
import {
  listAdminBlogPosts, deleteAdminBlogPost, getAdminBlogPostById,
  createAdminBlogPost, updateAdminBlogPost, type AdminBlogPost, type AdminBlogInsert
} from "@/services/adminBlogService";
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

export function AdminBlog() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminBlogPost | null>(null);

  const filters = statusFilter === "published" ? { published: true } : statusFilter === "draft" ? { published: false } : {};

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog", search, statusFilter],
    queryFn: () => listAdminBlogPosts({ search, ...filters }).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Post deleted");
    },
    onError: () => toast.error("Failed to delete post"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Write and publish travel articles and editorial content.</p>
        </div>
        <Link to="/admin/content/blog/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        {(["all", "published", "draft"] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !posts?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No posts found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Title","Category","Author","Status","Featured","Actions"].map(h=><th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800 max-w-xs truncate">{post.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{post.slug}</div>
                    </td>
                    <td className="px-5 py-4"><span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">{post.category || "—"}</span></td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{post.author_name || "—"}</td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${post.published ? "bg-emerald-50 text-emerald-600" : "bg-yellow-50 text-yellow-600"}`}>{post.published ? "Published" : "Draft"}</span></td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${post.featured ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>{post.featured ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/blog/${post.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(post)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
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
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.title}"?</h3>
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

const defaultForm: AdminBlogInsert = {
  slug: "", title: "", category: "", excerpt: "", image_url: "", author_name: "", author_role: "",
  author_initials: "", read_time: "", tags: [], date: new Date().toISOString().split("T")[0],
  published: false, featured: false, meta_description: "", seo_title: "", sort_order: 0,
};

function slugify(t: string) { return t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

export function BlogForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<AdminBlogInsert>(defaultForm);
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-blog-post", id],
    queryFn: () => getAdminBlogPostById(id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at, updated_at, ...rest } = existing as any;
      setForm(rest);
      setAutoSlug(false);
    }
  }, [existing]);

  const set = (key: keyof AdminBlogInsert, value: unknown) => {
    setForm(prev => {
      const next = { ...prev, [key]: value } as AdminBlogInsert;
      if (key === "title" && autoSlug) (next as any).slug = slugify(String(value));
      return next;
    });
  };

  const mutation = useMutation({
    mutationFn: () => isEdit ? updateAdminBlogPost(id!, form) : createAdminBlogPost(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      toast.success(isEdit ? "Post updated" : "Post created");
      navigate("/admin/content/blog");
    },
    onError: (e: Error) => toast.error(e.message ?? "Save failed"),
  });

  if (isEdit && isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/admin/content/blog")} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ArrowLeft size={18}/></button>
        <h1 className="text-2xl font-display font-bold text-gray-900">{isEdit ? "Edit Post" : "New Blog Post"}</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); if (!form.title || !form.slug) return toast.error("Title and slug required"); mutation.mutate(); }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Post Details</h2>
            <Field label="Title *"><input type="text" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. 10 Must-Visit Places in Rajasthan" className={inputCls} required /></Field>
            <Field label="URL Slug *">
              <div className="flex gap-2">
                <input type="text" value={form.slug} onChange={e => { setAutoSlug(false); set("slug", e.target.value); }} className={inputCls + " flex-1"} required />
                <button type="button" onClick={() => { setAutoSlug(true); set("slug", slugify(form.title)); }} className="px-3 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">Auto</button>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category"><input type="text" value={form.category ?? ""} onChange={e => set("category", e.target.value)} placeholder="Travel Tips" className={inputCls} /></Field>
              <Field label="Read Time"><input type="text" value={form.read_time ?? ""} onChange={e => set("read_time", e.target.value)} placeholder="5 min read" className={inputCls} /></Field>
            </div>
            <Field label="Excerpt"><textarea value={form.excerpt ?? ""} onChange={e => set("excerpt", e.target.value)} rows={3} className={inputCls} /></Field>
            <Field label="Cover Image Path"><MediaInput value={form.image_url ?? ""} onChange={v => set("image_url", v)} defaultBucket="blog-images" placeholder="blog-images/post-name/cover.webp" /></Field>
            <Field label="Publish Date"><input type="date" value={form.date ?? ""} onChange={e => set("date", e.target.value)} className={inputCls} /></Field>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Author</h2>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Author Name"><input type="text" value={form.author_name ?? ""} onChange={e => set("author_name", e.target.value)} className={inputCls} /></Field>
              <Field label="Author Role"><input type="text" value={form.author_role ?? ""} onChange={e => set("author_role", e.target.value)} placeholder="Travel Writer" className={inputCls} /></Field>
              <Field label="Initials"><input type="text" value={form.author_initials ?? ""} onChange={e => set("author_initials", e.target.value)} placeholder="AB" maxLength={3} className={inputCls} /></Field>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <Field label="SEO Title"><input type="text" value={form.seo_title ?? ""} onChange={e => set("seo_title", e.target.value)} className={inputCls} /></Field>
            <Field label="Meta Description"><textarea value={form.meta_description ?? ""} onChange={e => set("meta_description", e.target.value)} rows={2} className={inputCls} /></Field>
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Publish</h2>
            {[
              { label: "Published", key: "published" },
              { label: "Featured", key: "featured" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">{label}</span>
                <Toggle checked={!!(form as any)[key]} onChange={v => set(key as any, v)} />
              </label>
            ))}
            <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={e => set("sort_order", Number(e.target.value))} className={inputCls + " w-24"} /></Field>
          </section>
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50">
              <Save size={16}/>{mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Post"}
            </button>
            <button type="button" onClick={() => navigate("/admin/content/blog")} className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
