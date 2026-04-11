import { useState, useEffect } from "react";
import { getEnquiries, updateEnquiryStatus } from "@/services/enquiryService";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, Clock, MapPin, Phone, User, Calendar, MessageSquare } from "lucide-react";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState("all"); // 'all' | 'new' | 'contacted' | 'converted'

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    const { data } = await getEnquiries();
    if (data) setEnquiries(data);
    setIsLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: "new" | "contacted" | "converted") => {
    const original = [...enquiries];
    
    // Optimistic UI Update
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    
    const { error } = await updateEnquiryStatus(id, newStatus);
    if (error) {
      alert("Failed to update status. Reverting.");
      setEnquiries(original);
    }
  };

  const filteredEnquiries = filterData === "all" 
    ? enquiries 
    : enquiries.filter(e => e.status === filterData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Enquiries</h2>
          <p className="text-gray-500 text-sm">Manage and track your incoming package requests.</p>
        </div>

        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          {["all", "new", "contacted", "converted"].map(type => (
            <button
              key={type}
              onClick={() => setFilterData(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                filterData === type 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No enquiries found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEnquiries.map((enq) => (
            <div key={enq.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md">
              {/* Status Indicator Left Strip */}
              <div className={`w-full md:w-2 ${
                enq.status === 'new' ? 'bg-emerald-500' :
                enq.status === 'contacted' ? 'bg-blue-500' :
                'bg-purple-500'
              }`}></div>
              
              <div className="flex-1 p-5 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Person Info */}
                <div className="col-span-1 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{enq.name}</h3>
                      <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <a href={`tel:${enq.phone}`} className="hover:text-primary transition-colors">{enq.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                        <MessageSquare size={14} />
                        <span>Prefers: {enq.preferred_contact_method || "Any"}</span>
                      </div>
                    </div>
                    {enq.status === 'new' && (
                      <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Trip Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="font-medium text-gray-900 capitalize">{enq.destination.replace('-', ' ')}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-gray-500 block text-xs mb-0.5">Travel Date</span>
                      <span className="font-medium">{enq.travel_date ? new Date(enq.travel_date).toLocaleDateString() : "Flexible"}</span>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-gray-500 block text-xs mb-0.5">Pax</span>
                      <span className="font-medium">{enq.adults_count} Adults{enq.children_count ? `, ${enq.children_count} Kids` : ''}</span>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-gray-500 block text-xs mb-0.5">Budget Format</span>
                      <span className="font-medium capitalize">{enq.budget_range || "-"}</span>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-gray-500 block text-xs mb-0.5">Tour Type</span>
                      <span className="font-medium capitalize">{enq.tour_type || "-"}</span>
                    </div>
                  </div>

                  {enq.special_requirements && (
                    <div className="mt-3 text-sm text-gray-600 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                      <strong>Notes:</strong> {enq.special_requirements}
                    </div>
                  )}
                </div>

                {/* Action Frame */}
                <div className="col-span-1 flex flex-col justify-between items-end h-full">
                  <div className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Clock size={12} />
                    {formatDistanceToNow(new Date(enq.created_at), { addSuffix: true })}
                  </div>

                  <div className="mt-4 w-full">
                    <label className="block text-xs text-gray-500 mb-1.5 uppercase font-semibold">Change Status</label>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusUpdate(enq.id, e.target.value as any)}
                      className={`w-full text-sm font-medium border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 ${
                        enq.status === 'new' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                        enq.status === 'contacted' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                        'bg-purple-50 border-purple-200 text-purple-800'
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
