import { Shield, CheckCircle, CreditCard, Phone, Award, Map } from "lucide-react";

const trustItems = [
  { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50',
    title: '100% Safe Travel', desc: 'Verified hotels & trusted local partners' },
  { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50',
    title: 'Verified Local Guides', desc: 'Expert guides with deep regional knowledge' },
  { icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50',
    title: 'Best Price Guarantee', desc: 'No hidden costs, transparent pricing' },
  { icon: Phone, color: 'text-orange-600', bg: 'bg-orange-50',
    title: '24/7 Customer Support', desc: 'Always available when you need us' },
  { icon: Award, color: 'text-amber-600', bg: 'bg-amber-50',
    title: '5000+ Happy Travelers', desc: 'Trusted by families across India' },
  { icon: Map, color: 'text-teal-600', bg: 'bg-teal-50',
    title: 'Pan India Coverage', desc: 'All 28 states and union territories' },
];

const TrustStrip = () => {
  return (
    <section className="bg-surface py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map(item => (
            <div key={item.title}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white
                shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mb-3`}>
                <item.icon className={item.color} size={22} />
              </div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</p>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
