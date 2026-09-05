export type TrailDifficulty = 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';

export type TrailType = 
  | 'Mountain' 
  | 'Forest' 
  | 'Waterfall' 
  | 'Viewpoint' 
  | 'Coastal' 
  | 'Wildlife' 
  | 'Cultural' 
  | 'Tea Plantations'
  | 'Multi-day';

export type TrailFeature = 
  | 'Waterfall' 
  | 'Sunrise' 
  | 'Sunset' 
  | 'Camping' 
  | 'Wildlife' 
  | 'Photography' 
  | 'Family Friendly' 
  | 'Tea Plantations'
  | 'Viewpoint'
  | 'Cultural'
  | 'Forest'
  | 'Historical Site';

export type TrailStatus = 'Open' | 'Caution' | 'Slippery' | 'Flooded' | 'Closed' | 'Crowded';

export interface Waypoint {
  id: string;
  name: string;
  type: 'start' | 'end' | 'viewpoint' | 'waterfall' | 'rest' | 'landmark' | 'danger';
  latitude: number;
  longitude: number;
  elevation: number;
  description: string;
}

export interface TrailRoute {
  coordinates: [number, number][];
  waypoints: Waypoint[];
  elevationProfile: { distanceKm: number; elevationMeters: number }[];
}

export interface Review {
  id: string;
  trailId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  hikeDate?: string;
  conditionRating?: 'Good' | 'Fair' | 'Challenging';
}

export interface TrailConditionReport {
  id: string;
  trailId: string;
  trailName: string;
  status: TrailStatus;
  reportedBy: string;
  userAvatar: string;
  timestamp: string;
  weather: 'Clear' | 'Sunny' | 'Rainy' | 'Mist / Fog' | 'Windy';
  notes: string;
  waterAvailable: boolean;
  photoUrl?: string;
  upvotes: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'Accommodation' | 'Food & Cafe' | 'Transport' | 'Emergency';
  distanceKm: number;
  rating: number;
  address: string;
  phone?: string;
  image?: string;
}

export interface Trail {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  district: string;
  province: string;
  destination: string;
  difficulty: TrailDifficulty;
  distanceKm: number;
  estimatedDuration: string;
  elevationGainMeters: number;
  highestElevationMeters: number;
  trailType: TrailType;
  bestSeason: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  features: TrailFeature[];
  safetyInformation: string[];
  whatToBring: string[];
  currentStatus: TrailStatus;
  statusLastUpdated: string;
  route: TrailRoute;
  nearbyPlaces: NearbyPlace[];
  isFeatured?: boolean;
}

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  heroImage: string;
  location: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  specialties: string[];
  isVerified: boolean;
  hikesLed: number;
  bio: string;
  coveredTrails: string[];
  dailyRateUSD: number;
  phone: string;
  email: string;
}
