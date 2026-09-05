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
  elevation: number; // in meters
  description: string;
}

export interface TrailRoute {
  coordinates: [number, number][]; // [lat, lng]
  waypoints: Waypoint[];
  elevationProfile: { distanceKm: number; elevationMeters: number }[];
}

export interface Review {
  id: string;
  trailId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  likes: number;
  photos?: string[];
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
  destination: string; // e.g. "Ella", "Nuwara Eliya", "Knuckles"
  difficulty: TrailDifficulty;
  distanceKm: number;
  estimatedDuration: string; // e.g. "3-4 hours"
  elevationGainMeters: number;
  highestElevationMeters: number;
  trailType: TrailType;
  bestSeason: string; // e.g. "December to April"
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

export interface Destination {
  id: string;
  slug: string;
  name: string;
  district: string;
  province: string;
  heroImage: string;
  description: string;
  bestMonths: string;
  trailsCount: number;
  averageElevation: number;
  highlights: string[];
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

export interface HikingGroupEvent {
  id: string;
  title: string;
  trailId: string;
  trailName: string;
  location: string;
  date: string;
  time: string;
  difficulty: TrailDifficulty;
  organizerName: string;
  organizerAvatar: string;
  currentParticipants: number;
  maxParticipants: number;
  description: string;
  image: string;
  joinedUserIds: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  bio: string;
  trailsCompleted: number;
  totalDistanceKm: number;
  totalElevationM: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  savedTrailIds: string[];
}

export interface TrailFilterState {
  searchQuery: string;
  location: string;
  difficulty: TrailDifficulty | 'All';
  trailType: TrailType | 'All';
  maxDistance: number;
  maxDurationHours: number;
  minRating: number;
  features: TrailFeature[];
  sortBy: 'popular' | 'rating' | 'distance_asc' | 'distance_desc' | 'elevation_desc';
}
