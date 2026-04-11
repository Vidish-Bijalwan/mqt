import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { listStates, deleteState, type StateUT } from "@/services/stateService";

const REGIONS = ["North India", "South India", "East India", "West India", "Central India", "North East India", "Island Territories"];

export default function AdminStates() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<StateUT | null>(null);

  const { data: states, isLoading } = useQuery({
    queryKey: ["admin-states", search, regionFilter, typeFilter],
    queryFn: () => listStates({ search, region: regionFilter, type: typeFilter }),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteState(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-states"] });
      queryClient.invalidateQueries({ queryKey: ["content-counts"] });
      setDeleteTarget(null);
      toast.success("State deleted");
    },
    onError: () => toast.error("Failed to delete state"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">States & Union Territories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the geographic backbone of the destination system.</p>
        </div>
        <Link to="/admin/content/states/new" className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Add State / UT
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search states..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none text-gray-600 focus:border-primary">
          <option value="">All Regions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none text-gray-600 focus:border-primary">
          <option value="">State & UT</option>
          <option value="State">State</option>
          <option value="Union Territory">Union Territory</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">{Array.from({length: 6}).map((_,i) => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : !states?.length ? (
          <div className="p-12 text-center text-gray-400">
            <AlertCircle size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No states found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Name", "Type", "Region", "Featured", "Active", "Actions"].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {states.map((state: StateUT) => (
                  <tr key={state.id} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                    <td className="px-5 py-4 font-medium text-gray-800">{state.name}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${state.type === "State" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{state.type}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{state.region}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${state.featured ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>{state.featured ? "Yes" : "No"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${state.active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{state.active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      <Link to={`/admin/content/states/${state.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={15} /></Link>
                      <button onClick={() => setDeleteTarget(state)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete "{deleteTarget.name}"?</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently remove this state and may affect related destinations. This action cannot be undone.</p>
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
