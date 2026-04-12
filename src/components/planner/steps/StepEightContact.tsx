import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { submitEnquiry } from '../../../services/enquiryService';
import { toast } from 'sonner';

export function StepEightContact() {
  const { data, updateData, completePlanner } = useTripPlanner();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string, phone?: string}>({});

  const validate = () => {
    let newErrors: any = {};
    if (!data.contact_name.trim()) newErrors.name = 'Name is required';
    if (!data.contact_phone.trim()) newErrors.phone = 'Phone number is required';
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
        email: data.contact_email, // Can be empty if we want
        phone: data.contact_phone,
        destination: destinationStr,
        travel_date: data.date_flexibility ? 'Flexible' : data.travel_month,
        adults: data.group_size.adults,
        children: data.group_size.children,
        travellers_count: data.group_size.adults + data.group_size.children + data.group_size.infants,
        tour_type: data.trip_style.join(', '),
        budget_tier: data.budget_preference || undefined,
        hotel_category_preference: data.stay_preference || undefined,
        preferred_contact_method: data.preferred_contact_method || undefined,
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
${data.intent_type === 'custom_trip' ? `
--- Custom Journey Details ---
Departure: ${data.departure_city || 'Not specified'}
Duration: ${data.trip_duration_days ? data.trip_duration_days + ' days' : 'Not specified'}
Must Visits: ${data.must_visit_places || 'None'}
Pace: ${data.travel_pace || 'Not specified'}
` : ''}
Special Requirements: ${data.special_requirements || 'None'}
        `.trim()
      };

      const { error } = await submitEnquiry(payload, "");
      if (error) throw error;
      
      // Complete!
      completePlanner();

    } catch (e) {
      console.error(e);
      toast.error('Failed to submit plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          Where should we send your personalized plan?
        </h2>
        <p className="text-muted-foreground">Almost done. We just need to know how to reach you.</p>
      </div>

      <div className="space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input 
              id="name"
              placeholder="e.g. John Doe"
              value={data.contact_name}
              onChange={(e) => updateData({ contact_name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input 
              id="phone"
              type="tel"
              placeholder="e.g. +91 9876543210"
              value={data.contact_phone}
              onChange={(e) => updateData({ contact_phone: e.target.value })}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address (Optional)</Label>
          <Input 
            id="email"
            type="email"
            placeholder="e.g. hello@example.com"
            value={data.contact_email}
            onChange={(e) => updateData({ contact_email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Any Special Requirements? (Optional)</Label>
          <Textarea 
            id="notes"
            placeholder="Dietary preferences, accessibility needs, specific celebrations..."
            className="resize-none"
            rows={3}
            value={data.special_requirements || ''}
            onChange={(e) => updateData({ special_requirements: e.target.value })}
          />
        </div>

      </div>

      <div className="flex justify-end pt-6 border-t border-border mt-8">
        <Button 
          onClick={handleSubmit} 
          size="lg" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 w-full sm:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Get My Travel Plan'}
        </Button>
      </div>
    </div>
  );
}
