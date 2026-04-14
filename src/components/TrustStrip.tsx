import { Shield, CheckCircle, CreditCard, Phone, Award, Map, Compass } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchTrustStrip = async () => {
  const { data, error } = await supabase
    .from("trust_strip")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
};

const iconMap: Record<string, any> = {
  Shield,
  CheckCircle,
  CreditCard,
  Phone,
  Award,
  Map,
  Compass
};

const defaultTrustItems = [
  { icon_name: "Shield", icon_color_class: 'text-blue-600', icon_bg_class: 'bg-blue-50',
    title: '100% Safe Travel', description: 'Verified hotels & trusted local partners' },
  { icon_name: "CheckCircle", icon_color_class: 'text-green-600', icon_bg_class: 'bg-green-50',
    title: 'Verified Local Guides', description: 'Expert guides with deep regional knowledge' },
  { icon_name: "CreditCard", icon_color_class: 'text-purple-600', icon_bg_class: 'bg-purple-50',
    title: 'Best Price Guarantee', description: 'No hidden costs, transparent pricing' },
  { icon_name: "Phone", icon_color_class: 'text-orange-600', icon_bg_class: 'bg-orange-50',
    title: '24/7 Customer Support', description: 'Always available when you need us' },
  { icon_name: "Award", icon_color_class: 'text-amber-600', icon_bg_class: 'bg-amber-50',
    title: '5000+ Happy Travelers', description: 'Trusted by families across India' },
  { icon_name: "Map", icon_color_class: 'text-teal-600', icon_bg_class: 'bg-teal-50',
    title: 'Pan India Coverage', description: 'All 28 states and union territories' },
];

const TrustStrip = () => {
  const { data } = useQuery({
    queryKey: ["public-trust-strip"],
    queryFn: fetchTrustStrip,
  });

  const trustItems = data && data.length > 0 ? data : defaultTrustItems;

  return (
    <section className="bg-surface py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon_name || "CheckCircle"] || CheckCircle;
            return (
              <div key={item.title || idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white
                  shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${item.icon_bg_class || 'bg-gray-100'} rounded-full flex items-center justify-center mb-3`}>
                  <Icon className={item.icon_color_class || 'text-gray-600'} size={22} />
                </div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
