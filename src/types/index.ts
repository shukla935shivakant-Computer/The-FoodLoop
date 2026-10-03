export type UserRole = 'donor' | 'receiver' | 'admin';

export type DonorSubtype = 'restaurant' | 'hotel' | 'supermarket' | 'event' | 'household';
export type ReceiverSubtype = 'ngo' | 'shelter' | 'community' | 'individual';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subtype: DonorSubtype | ReceiverSubtype | 'admin';
  organizationName: string;
  isVerified: boolean;
  verificationBadge: string;
  rating: number;
  reviewCount: number;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  avatarEmoji: string;
  avatarBg: string;
  capacityMeals?: number;
  hasRefrigeration?: boolean;
  hasHeatedStorage?: boolean;
}

export type FoodCategory =
  | 'Prepared Meals'
  | 'Bakery & Bread'
  | 'Fresh Produce'
  | 'Dairy & Eggs'
  | 'Packaged Groceries'
  | 'Beverages';

export type StorageRequirement =
  | 'Refrigerated (0-4°C)'
  | 'Heated (60°C+)'
  | 'Frozen (-18°C)'
  | 'Dry & Cool ambient'
  | 'Room Temp';

export type DonationStatus =
  | 'available'
  | 'matched'
  | 'accepted'
  | 'in_transit'
  | 'collected'
  | 'cancelled';

export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'normal';

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  donorOrg: string;
  foodName: string;
  quantity: string;
  quantityNumber: number;
  unit: 'portions' | 'kg' | 'boxes' | 'crates' | 'liters';
  category: FoodCategory;
  prepTime: string;
  expiryTime: string;
  pickupLocation: string;
  pickupAddress: string;
  lat: number;
  lng: number;
  pickupWindow: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;
  specialStorage: StorageRequirement;
  imageEmoji: string;
  imageUrl?: string;
  status: DonationStatus;
  urgency: UrgencyLevel;
  notes: string;
  aiVerified: boolean;
  aiConfidence: number;
  estimatedMeals: number;
  estimatedCo2eKg: number;
  createdAt: string;
  acceptedByReceiverId?: string;
  acceptedByReceiverName?: string;
  pickupCode: string;
  // Non-commercial individual & commercial donor support
  donorType?: 'commercial' | 'individual';
  fssaiLicense?: string;
  governmentIdType?: 'Aadhaar' | 'Driving License' | 'Voter ID' | 'Passport';
  governmentIdNumber?: string;
  governmentIdFile?: string;
  eventType?: 'Wedding' | 'Birthday' | 'House Party' | 'Community Gathering' | 'Household / Family Function' | 'Other';
  eventEndTime?: string;
  refrigerationAvailable?: boolean;
  hygieneChecklist?: {
    cleanKitchen: boolean;
    coveredAfterEvent: boolean;
    freshSmell: boolean;
    safeTempOrRefrig: boolean;
  };
  foodPhotoUrl?: string;
  inspectionChecklist?: {
    visualCleanCovered: boolean;
    smellFreshNoOdor: boolean;
    tempHotOrCold: boolean;
    passedAt?: string;
    inspectedBy?: string;
  };
}

export interface Pickup {
  id: string;
  donationId: string;
  donorId: string;
  receiverId: string;
  donorName: string;
  receiverName: string;
  pickupCode: string;
  status: 'scheduled' | 'in_transit' | 'collected' | 'confirmed';
  scheduledTime: string;
  etaMinutes: number;
  donorConfirmed: boolean;
  receiverConfirmed: boolean;
  completedAt?: string;
  inspectionChecklist?: {
    visualCleanCovered: boolean;
    smellFreshNoOdor: boolean;
    tempHotOrCold: boolean;
    passedAt?: string;
  };
  inspectionPassed?: boolean;
}

export interface MatchSuggestion {
  receiver: User;
  matchScore: number;
  distanceKm: number;
  estimatedTravelMinutes: number;
  criteriaPassed: string[];
  recommendationReason: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'donation_new' | 'donation_accepted' | 'pickup_reminder' | 'pickup_completed' | 'expiring_alert';
  timestamp: string;
  isRead: boolean;
}

export interface ImpactMetrics {
  totalKgRescued: number;
  totalDonationsCompleted: number;
  totalFoodWastePreventedDollars: number;
  totalOrganizations: number;
  totalMealsRedistributed: number;
  totalCo2eSavedKg: number;
  totalWaterSavedLiters: number;
  topLocations: { city: string; country: string; kg: number; meals: number; flag: string }[];
}

export interface UserReport {
  id: string;
  reportedItemId: string;
  reportedItemType: 'donation' | 'user';
  reportedTitle: string;
  reporterName: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AIAnalysisResult {
  canRedistribute: boolean;
  confidenceScore: number;
  recommendedCategory: string;
  estimatedMeals: number;
  estimatedCo2eKgSaved: number;
  shelfLifeRemainingHours: number;
  storageRecommendations: string[];
  safeHandlingReminders: string[];
  suggestedReceiverTypes: string[];
  isSuspicious: boolean;
  suspicionReason: string;
  safetyDisclaimer: string;
}
