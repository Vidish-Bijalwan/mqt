import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { listCategories, deleteCategory, type Category } from "@/services/categoryService";

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories", search],
    queryFn: () => listCategories(search).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("Category deleted");
    },
    onError: () => toast.error("Failed to delete category"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Package Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage travel styles and themes for the package discovery system.</p>
        </div>
        <Link to="/admin/content/categories/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add Category
        </Link>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !categories?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No categories found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Name","Slug","Best For","Featured","Active","Actions"].map(h=>(
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat: Category) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs font-mono">{cat.slug}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(cat.best_for ?? []).slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${cat.featured ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>{cat.featured ? "Yes" : "No"}</span></td>
                    <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${cat.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{cat.active ? "Active" : "Inactive"}</span></td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/categories/${cat.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(cat)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15}/></button>
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
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.name}"?</h3>
            <p className="text-sm text-gray-500 mb-6">This may affect packages using this category. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50">
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
