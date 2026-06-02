import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { listAdminCrafts, deleteAdminCraft, AdminCraft } from "@/services/adminCraftService";

export function AdminCrafts() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminCraft | null>(null);

  const { data: crafts, isLoading } = useQuery({
    queryKey: ["admin-crafts", search],
    queryFn: () => listAdminCrafts({ search }).then(r => r.data ?? []),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminCraft(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-crafts"] });
      setDeleteTarget(null);
      toast.success("Craft deleted");
    },
    onError: () => toast.error("Failed to delete craft"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Indian Crafts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the artisan crafts displayed on the Craft Trail page.</p>
        </div>
        <Link to="/admin/content/crafts/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add Craft
        </Link>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search crafts..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"/>)}</div>
        ) : !crafts?.length ? (
          <div className="p-12 text-center text-gray-400"><AlertCircle size={32} className="mx-auto mb-3 opacity-40"/><p className="font-medium">No crafts found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Image", "Name", "State", "City", "Color", "Actions"].map(h=>(
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {crafts.map((craft) => (
                  <tr key={craft.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0 items-center">
                    <td className="px-5 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                        <img src={craft.image} alt={craft.name} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">{craft.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{craft.craft_id}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-medium">{craft.state}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{craft.city}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: craft.color_hex }} />
                        <span className="text-xs text-gray-500 font-mono">{craft.color_hex}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/crafts/${craft.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15}/></Link>
                      <button onClick={() => setDeleteTarget(craft)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
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
            <p className="text-sm text-gray-400 mb-6">This will permanently remove this craft. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">{deleteMutation.isPending ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
