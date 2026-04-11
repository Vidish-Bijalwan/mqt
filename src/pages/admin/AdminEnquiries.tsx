import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Search, X, Phone, Mail, MessageCircle, Filter, ChevronDown, Calendar, Users, MapPin } from "lucide-react";
import { listEnquiries, updateEnquiryStatus, updateEnquiryNotes, type AdminEnquiry, type EnquiryStatus } from "@/services/adminEnquiryService";

const STATUSES: { value: EnquiryStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "bg-gray-100 text-gray-600" },
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "quoted", label: "Quoted", color: "bg-purple-100 text-purple-700" },
  { value: "converted", label: "Converted", color: "bg-emerald-100 text-emerald-700" },
  { value: "closed", label: "Closed", color: "bg-gray-200 text-gray-500" },
];

function StatusBadge({ status }: { status: string }) {
  const s = STATUSES.find(s => s.value === status) ?? STATUSES[0];
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${s.color}`}>
      {s.label}
    </span>
  );
}

function EnquiryDrawer({ enquiry, onClose }: { enquiry: AdminEnquiry; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState(enquiry.admin_notes ?? "");
  const [saving, setSaving] = useState(false);

  const statusMutation = useMutation({
    mutationFn: ({ status }: { status: EnquiryStatus }) => updateEnquiryStatus(enquiry.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const saveNotes = async () => {
    setSaving(true);
    const { error } = await updateEnquiryNotes(enquiry.id, notes);
    setSaving(false);
    if (error) return toast.error("Failed to save notes");
    queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
    toast.success("Notes saved");
  };

  const whatsappUrl = `https://wa.me/${enquiry.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${enquiry.name}, this is regarding your travel enquiry to ${enquiry.destination}.`)}`;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25 }}
      className="fixed inset-y-0 right-0 w-full max-w-lg bg-white border-l border-gray-200 z-50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900">{enquiry.name}</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(enquiry.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.filter(s => s.value !== "all").map((s) => (
              <button
                key={s.value}
                disabled={statusMutation.isPending}
                onClick={() => statusMutation.mutate({ status: s.value as EnquiryStatus })}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  enquiry.status === s.value
                    ? `${s.color} border-transparent ring-2 ring-offset-1 ring-gray-400`
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={14} className="text-gray-400" />
              <a href={`tel:${enquiry.phone}`} className="hover:text-primary">{enquiry.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail size={14} className="text-gray-400" />
              <a href={`mailto:${enquiry.email}`} className="hover:text-primary">{enquiry.email}</a>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <a
              href={`mailto:${enquiry.email}`}
              className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Mail size={13} /> Email
            </a>
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center gap-1.5 text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone size={13} /> Call
            </a>
          </div>
        </div>

        {/* Enquiry Details */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Enquiry Details</p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
            {[
              { icon: MapPin, label: "Destination", value: enquiry.destination },
              { icon: Users, label: "Travellers", value: enquiry.travellers_count },
              { icon: Calendar, label: "Travel Month", value: enquiry.travel_month },
              { label: "Package Interest", value: enquiry.package_interest },
              { label: "Source Page", value: enquiry.source_page },
              { label: "Contact Preference", value: enquiry.contact_preference },
            ].filter(f => f.value).map((field, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                {field.icon && <field.icon size={13} className="text-gray-400 mt-0.5 shrink-0" />}
                <span className="text-gray-400 w-32 shrink-0 text-xs font-medium">{field.label}</span>
                <span className="text-gray-700 font-medium">{String(field.value)}</span>
              </div>
            ))}
          </div>
          {enquiry.special_requirements && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-xs font-bold text-amber-600 mb-1">Special Requirements</p>
              <p className="text-sm text-amber-800">{enquiry.special_requirements}</p>
            </div>
          )}
        </div>

        {/* Admin Notes */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Notes</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Add internal notes..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className="mt-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminEnquiries() {
  const [activeStatus, setActiveStatus] = useState<EnquiryStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);

  const { data: enquiries, isLoading, isError } = useQuery({
    queryKey: ["admin-enquiries", activeStatus, search],
    queryFn: () => listEnquiries({ status: activeStatus, search }),
    staleTime: 30_000,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage incoming travel leads and customer enquiries.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveStatus(s.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeStatus === s.value
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-12 text-center text-red-500 text-sm">Failed to load enquiries. Please try again.</div>
        ) : !enquiries?.length ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Filter size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No enquiries found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Date", "Name", "Phone", "Destination", "Travellers", "Status"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq: AdminEnquiry) => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors last:border-0"
                  >
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800">{enq.name}</td>
                    <td className="px-5 py-4 text-gray-500">{enq.phone}</td>
                    <td className="px-5 py-4 text-gray-600">{enq.destination}</td>
                    <td className="px-5 py-4 text-gray-500">{enq.travellers_count ?? "—"}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={enq.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedEnquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedEnquiry(null)}
            />
            <EnquiryDrawer enquiry={selectedEnquiry} onClose={() => setSelectedEnquiry(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
