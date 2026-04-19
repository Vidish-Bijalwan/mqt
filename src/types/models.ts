export type Region = "North India" | "South India" | "East India" | "West India" | "Central India" | "North East India" | "Islands & Union Territories" | "north" | "south" | "east" | "west" | "central" | "northeast" | "island";
export type Season = "Spring" | "Summer" | "Monsoon" | "Autumn" | "Winter" | "Year-round";
export type Category = "Adventure" | "Spiritual" | "Heritage" | "Nature" | "Wildlife" | "Hill Station" | "Beach" | "Desert" | "Cityscape";
export type BudgetTier = "Budget" | "Mid-Range" | "Luxury" | "Premium";

export type TravelTheme = "adventure" | "spiritual" | "heritage" | "nature" | "wildlife" | "hill_station" | "beach" | "desert" | "cityscape" | "luxury" | "offbeat" | "pilgrimage" | "trekking" | "Buddhist culture" | "cultural" | "backpacker" | "Char Dham";
export type DestinationType = "temple" | "hill_station" | "beach" | "wildlife" | "heritage" | "adventure" | "pilgrimage" | "valley" | "lake" | "waterfall" | "city" | "restricted_zone" | "nature" | "Buddhist culture" | "offbeat" | "cultural" | "backpacker" | "Char Dham";

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface ImageRecord {
  url: string;                   // full URL — verified working
  thumbnail_url?: string;        // smaller version URL
  alt: string;                   // descriptive, includes location name
  credit: string;
  license: string;
  width?: number;                 // actual pixel width
  height?: number;                // actual pixel height
}

export interface Activity {
  name: string;
  duration?: string;              // "2-3 hours" | "Full day" | "Multiple days"
  difficulty?: "easy" | "moderate" | "hard" | "extreme";
  cost_inr?: number | null;
  bestSeason?: string;
}

export interface NearbyPlace {
  name: string;
  distance_km: number;
}

export interface StateData {
  id: string;                    // url-slug format: "uttarakhand"
  slug: string;                  // alias for url routing
  name: string;                  // "Uttarakhand"
  capital: string;               // "Dehradun"
  region: Region;            
  isUT: boolean;                 // false for states, true for union territories
  tagline: string;               // one evocative line, not generic
  overview: string;              // 4-5 sentences, real information, no filler
  bestTimeToVisit: {
    primary: string;             // "October to June"
    months: string[];            
    avoid: string;               
    notes: string;               
  };
  geography: {
    area_km2: number;
    coastline_km: number | null;
    highest_peak: string | null;
    major_rivers: string[];
    terrain: string;             
  };
  themes: TravelTheme[];         
  languages: string[];
  currency: "INR";
  timezone: "IST";
  mapCoordinates: {
    centerLat: number;
    centerLng: number;
    zoomLevel: number;           
    boundingBox?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  mapSvgId: string;              
  colorPrimary: string;          
  colorSecondary: string;        
  heroImage: ImageRecord;
  galleryImages: ImageRecord[];  
  destinations: DestinationData[]; 
  quickFacts: {
    population: string;
    literacy_rate: string;
    famous_for: string[];
    UNESCO_sites: string[];
    national_parks: string[];
  };
  mqtPackagesAvailable: string[]; 
  seo?: SEOData;
  image?: string; // Legacy UI fallback compatibility
  colorHex?: string; // Legacy UI fallback compatibility
  introOverview?: string; // Legacy
  shortDescription?: string; // Legacy
}

export interface DestinationData {
  id: string;                    
  slug: string;                  
  name: string;                  
  stateId: string;               
  stateSlug: string;
  type: DestinationType;         
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPosition: {
    x: number;                   
    y: number;                   
  };
  altitude_meters: number | null;
  shortDescription: string;      
  detailedDescription: string;   
  historicalContext: string;     
  bestTimeToVisit: string;       
  avoidMonths: string[];
  rating: number;                
  reviewCount: number;           
  estimatedBudget: {
    budget_per_day_inr: number;  
    comfort_per_day_inr: number; 
    luxury_per_day_inr: number;  
    currency: "INR";
  };
  popularActivities: Activity[];
  nearbyPlaces: NearbyPlace[];
  travelTips: string[];          
  howToReach: {
    byAir: string;
    byTrain: string;
    byRoad: string;
    fromDelhi_distance_km?: number;
    fromDelhi_time_hours?: number;
  };
  amenities: {
    hotels: "luxury" | "mid-range" | "budget" | "homestay" | "camp" | "none";
    bestHotels: string[];        
    transport: "good" | "moderate" | "limited" | "very-limited";
    food: "excellent" | "good" | "moderate" | "limited";
    internetConnectivity: "4G" | "3G" | "2G" | "satellite-only" | "none";
    medicalFacility: "hospital" | "clinic" | "first-aid" | "none";
    atm: boolean;
  };
  permits: {
    required: boolean;
    type: string | null;         
    indianNationalsOnly: boolean;
    cost_inr: number | null;
    howToObtain: string | null;
  };
  isAlertPackage: boolean;       
  isRestrictedZone: boolean;
  heroImage: ImageRecord;
  galleryImages: ImageRecord[];  
  youtubeVideoIds: string[];     
  mqtPackageSlug: string | null; 
  seoKeywords: string[];         
  seo?: SEOData;
  categories?: Category[]; // Legacy UI filter compatibility
  budget?: BudgetTier; // Legacy filter compatibility
  image?: string; // Legacy
  bestSeasons?: Season[]; // Legacy filter compatibility
  colorHex?: string; // Legacy
  fullDescription?: string; // Legacy
  gallery?: string[]; // Legacy gallery placeholder data
}

export type StateModel = StateData;
export type DestinationModel = DestinationData;
