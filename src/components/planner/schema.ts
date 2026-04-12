export type TripIntent = 'ideal_package' | 'custom_trip' | 'know_destination' | 'need_suggestions' | null;

export type TravelStyle = 
  | 'family' 
  | 'honeymoon' 
  | 'adventure' 
  | 'pilgrimage' 
  | 'beach' 
  | 'heritage' 
  | 'wildlife' 
  | 'luxury' 
  | 'weekend' 
  | 'solo' 
  | 'group' 
  | 'custom';

export type BudgetPreference = 'budget' | 'comfortable' | 'premium' | 'luxury' | 'not_sure' | null;
export type StayPreference = 'standard' | 'boutique' | 'premium' | 'luxury' | 'mix' | null;

export interface GroupSize {
  adults: number;
  children: number;
  infants: number;
}

export interface TripPlannerData {
  intent_type: TripIntent;
  trip_style: TravelStyle[]; // multi-select allowed but we might limit to 1-2
  
  region_interest: string | null;
  state_interest: string | null;
  destination_interest: string | null;
  
  travel_month: string | null;
  date_flexibility: boolean;
  
  group_size: GroupSize;
  
  budget_preference: BudgetPreference;
  stay_preference: StayPreference;
  
  // Custom Trip specific
  departure_city: string | null;
  start_location: string | null;
  end_location: string | null;
  trip_duration_days: number | null;
  must_visit_places: string | null;
  travel_pace: 'relaxed' | 'balanced' | 'packed' | null;
  
  // Contact Info
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  preferred_contact_method: 'call' | 'whatsapp' | 'email' | null;
  special_requirements: string | null;
  
  // Metadata
  source_page: string | null;
}

export const INITIAL_PLANNER_DATA: TripPlannerData = {
  intent_type: null,
  trip_style: [],
  region_interest: null,
  state_interest: null,
  destination_interest: null,
  travel_month: null,
  date_flexibility: true,
  group_size: { adults: 2, children: 0, infants: 0 },
  budget_preference: null,
  stay_preference: null,
  departure_city: null,
  start_location: null,
  end_location: null,
  trip_duration_days: null,
  must_visit_places: null,
  travel_pace: null,
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  preferred_contact_method: null,
  special_requirements: null,
  source_page: null,
};
