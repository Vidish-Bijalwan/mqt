import { useState } from 'react';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { submitEnquiry } from '../../../services/enquiryService';
import { toast } from 'sonner';
import { Phone, User } from 'lucide-react';

export function StepEightContact() {
  const { data, updateData, completePlanner } = useTripPlanner();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string, phone?: string}>({});

  const validate = () => {
    let newErrors: any = {};
    if (!data.contact_name.trim()) newErrors.name = 'Please enter your name';
    if (!data.contact_phone.trim() || data.contact_phone.length < 10) newErrors.phone = 'Please enter a valid WhatsApp number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    
    try {
      // Map planner data to enquiry payload
      const destinationStr = 
        data.destination_interest || 
        data.state_interest || 
        data.region_interest || 
        'India';

      const payload = {
        name: data.contact_name,
        phone: data.contact_phone,
        email: 'whatsapp-only@mqtravels.com', // Dummy fallback for DB constraints if any
        destination: destinationStr,
        travel_date: data.date_flexibility ? 'Flexible' : data.travel_month,
        adults: data.group_size.adults,
        children: data.group_size.children,
        travellers_count: data.group_size.adults + data.group_size.children + data.group_size.infants,
        tour_type: data.trip_style.join(', '),
        budget_tier: data.budget_preference || undefined,
        preferred_contact_method: 'whatsapp' as any,
        source_page: data.source_page || undefined,
        cta_label: 'Trip Planner Wizard',
        requirements: `
[SMART PLANNER ENQUIRY]
Intent: ${data.intent_type}
Style: ${data.trip_style.join(', ')}
Group: ${data.group_size.adults} Adults, ${data.group_size.children} Children, ${data.group_size.infants} Infants
Budget: ${data.budget_preference || 'Any'}
Stay: ${data.stay_preference || 'Any'}
Flexibility: ${data.date_flexibility ? 'Flexible' : 'Exact Month: ' + data.travel_month}
        `.trim()
      };

      const { error } = await submitEnquiry(payload, "");
      if (error) throw error;
      
      completePlanner();

    } catch (e) {
      console.error(e);
      toast.error('Failed to submit plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="text-center space-y-3 mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 shadow-inner">
          <Phone className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">
          Where should we send your itinerary?
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto">We'll craft a custom plan and WhatsApp it to you. No spam, just a brilliant trip.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <User className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Your Name"
            value={data.contact_name}
            onChange={(e) => updateData({ contact_name: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 md:py-5 text-base md:text-lg rounded-2xl bg-gray-50 border-2 outline-none transition-colors ${errors.name ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-blue-500 focus:bg-white'}`}
          />
          {errors.name && <p className="text-xs text-red-500 font-medium absolute -bottom-5 left-2">{errors.name}</p>}
        </div>

        <div className="relative mt-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone className="w-5 h-5" />
          </div>
          <input 
            type="tel"
            placeholder="WhatsApp Number"
            value={data.contact_phone}
            onChange={(e) => updateData({ contact_phone: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 md:py-5 text-base md:text-lg rounded-2xl bg-gray-50 border-2 outline-none transition-colors ${errors.phone ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-blue-500 focus:bg-white'}`}
          />
          {errors.phone && <p className="text-xs text-red-500 font-medium absolute -bottom-5 left-2">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 lg:py-5 text-lg rounded-2xl font-bold shadow-xl shadow-blue-600/30 transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Crafting Itinerary...
            </span>
          ) : (
            'Get My Free Plan'
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-4">By continuing, you agree to our privacy policy. Your data is secure.</p>
    </div>
  );
}
