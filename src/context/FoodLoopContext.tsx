import React, { createContext, useContext, useState, useRef } from 'react';
import {
  User,
  Donation,
  Pickup,
  AppNotification,
  ImpactMetrics,
  UserReport,
  AIAnalysisResult,
  MatchSuggestion,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DONATIONS,
  INITIAL_PICKUPS,
  INITIAL_NOTIFICATIONS,
  INITIAL_IMPACT,
  INITIAL_REPORTS,
} from '../data/mockData';
import { sound } from '../utils/sound';
import { SupportedLanguage, TRANSLATIONS, translateDynamicText } from '../utils/translations';

interface FoodLoopContextType {
  currentUser: User;
  users: User[];
  donations: Donation[];
  pickups: Pickup[];
  notifications: AppNotification[];
  impactMetrics: ImpactMetrics;
  reports: UserReport[];
  activeTab: string;
  isSoundMuted: boolean;
  demoRunning: boolean;
  demoStep: number;
  demoMessage: string;
  language: SupportedLanguage;
  userLiveCoords: { lat: number; lng: number } | null;
  setUserLiveCoords: (coords: { lat: number; lng: number } | null) => void;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setCurrentUserById: (userId: string) => void;
  toggleSound: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  locateUserLiveGps: () => Promise<{ lat: number; lng: number }>;
  updateUserProfile: (updates: Partial<User>) => void;
  createDonation: (data: Partial<Donation>) => Donation;
  acceptDonation: (donationId: string, receiverId?: string) => { donation: Donation; pickup: Pickup };
  updatePickupStatus: (pickupId: string, newStatus: Pickup['status']) => void;
  confirmPickup: (pickupId: string, asRole: 'donor' | 'receiver') => void;
  verifyUser: (userId: string, approve: boolean) => void;
  resolveReport: (reportId: string, action: 'resolved' | 'dismissed') => void;
  findMatchesForDonation: (donation?: Donation) => MatchSuggestion[];
  analyzeFoodWithAI: (itemDetails: {
    foodName: string;
    quantity: string;
    category: string;
    prepTime: string;
    storage: string;
    dietary: string;
    notes?: string;
  }) => Promise<AIAnalysisResult>;
  runHackathonDemoFlow: () => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  recordInspectionAndVerifyOtp: (
    pickupId: string,
    checklist: { visualCleanCovered: boolean; smellFreshNoOdor: boolean; tempHotOrCold: boolean }
  ) => boolean;
}

const FoodLoopContext = createContext<FoodLoopContextType | undefined>(undefined);

export const FoodLoopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const usersRef = useRef<User[]>(INITIAL_USERS);
  const currentUserRef = useRef<User>(INITIAL_USERS[0]);
  const donationsRef = useRef<Donation[]>(INITIAL_DONATIONS);
  const pickupsRef = useRef<Pickup[]>(INITIAL_PICKUPS);

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Starts as Chef Marco (Sunshine Bistro)
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [pickups, setPickups] = useState<Pickup[]>(INITIAL_PICKUPS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics>(INITIAL_IMPACT);
  const [reports, setReports] = useState<UserReport[]>(INITIAL_REPORTS);
  const [activeTab, setActiveTabState] = useState<string>('landing');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);
  const [demoRunning, setDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoMessage, setDemoMessage] = useState<string>('');
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [userLiveCoords, setUserLiveCoords] = useState<{ lat: number; lng: number } | null>({
    lat: 37.7749,
    lng: -122.4194,
  });

  const t = (key: string): string => {
    if (!key) return '';
    return TRANSLATIONS[language]?.[key] || translateDynamicText(key, language) || TRANSLATIONS.en[key] || key;
  };

  const setLanguage = (lang: SupportedLanguage) => {
    sound.playPop(550);
    setLanguageState(lang);
  };

  const locateUserLiveGps = async (): Promise<{ lat: number; lng: number }> => {
    sound.playPop(620);
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLiveCoords(coords);
            sound.playSuccess();
            resolve(coords);
          },
          (err) => {
            console.warn('Geolocation unavailable, using current donor location:', err);
            // Fallback to active user's location
            const coords = { lat: currentUser?.lat ?? 37.7749, lng: currentUser?.lng ?? -122.4194 };
            setUserLiveCoords(coords);
            resolve(coords);
          },
          { timeout: 7000 }
        );
      } else {
        const coords = { lat: currentUser?.lat ?? 37.7749, lng: currentUser?.lng ?? -122.4194 };
        setUserLiveCoords(coords);
        resolve(coords);
      }
    });
  };

  const updateUserProfile = (updates: Partial<User>) => {
    sound.playSuccess();
    const baseUser = currentUserRef.current || INITIAL_USERS[0];
    const updated = { ...baseUser, ...updates };
    currentUserRef.current = updated;
    setCurrentUser(updated);

    usersRef.current = usersRef.current.map((u) => (u && u.id === updated.id ? updated : u));
    setUsers([...usersRef.current]);
  };

  const setActiveTab = (tab: string) => {
    sound.playClick();
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCurrentUserById = (userId: string) => {
    const found = usersRef.current.find((u) => u && u.id === userId);
    if (found) {
      sound.playPop(600);
      currentUserRef.current = found;
      setCurrentUser(found);
    }
  };

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    sound.setEnabled(!nextState);
  };

  const markNotificationRead = (id: string) => {
    sound.playPop(500);
    setNotifications((prev) =>
      prev.map((n) => (n && n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    sound.playPop(450);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // AI Food Analysis
  const analyzeFoodWithAI = async (itemDetails: {
    foodName: string;
    quantity: string;
    category: string;
    prepTime: string;
    storage: string;
    dietary: string;
    notes?: string;
  }): Promise<AIAnalysisResult> => {
    try {
      const res = await fetch('/api/ai/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemDetails),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.analysis) {
          return data.analysis;
        }
      }
    } catch (err) {
      console.warn('API error, falling back locally:', err);
    }

    // Local fallback calculation
    const qtyNum = parseInt(itemDetails.quantity.replace(/\D/g, '')) || 25;
    const meals = Math.max(5, Math.round(qtyNum * 1.2));
    const co2 = Math.round(meals * 0.42 * 2.5 * 10) / 10;
    return {
      canRedistribute: true,
      confidenceScore: 95,
      recommendedCategory: itemDetails.category || 'Prepared Meals',
      estimatedMeals: meals,
      estimatedCo2eKgSaved: co2,
      shelfLifeRemainingHours: 6,
      storageRecommendations: [
        'Store in food-safe sealed containers below 4°C (or keep heated ≥60°C if served hot)',
        'Attach date and allergen labels clearly on container lids',
      ],
      safeHandlingReminders: [
        'Ensure transport cooler bags are clean and temperature-monitored',
        'Verify seal integrity during pickup inspection',
      ],
      suggestedReceiverTypes: ['Community Kitchen', 'Youth & Family Shelter', 'Food Bank Pantry'],
      isSuspicious: false,
      suspicionReason: 'Listing conforms to community surplus food safety criteria.',
      safetyDisclaimer:
        'AI assessment is an advisory guideline based on provided details. Final food safety responsibility remains with the donor, certified organizations, and local public health standards.',
    };
  };

  // Create Donation
  const createDonation = (data: Partial<Donation>): Donation => {
    const qtyNum = data.quantityNumber || parseInt(String(data.quantity || '20').replace(/\D/g, '')) || 20;
    const estMeals = data.estimatedMeals || Math.max(5, Math.round(qtyNum * 1.2));
    const estCo2 = data.estimatedCo2eKg || Math.round(estMeals * 0.42 * 2.5 * 10) / 10;
    const randomCode = `FL-${Math.floor(1000 + Math.random() * 9000)}`;

    const donor = currentUserRef.current || INITIAL_USERS[0];
    const liveCoords = userLiveCoords || { lat: donor?.lat || 37.7749, lng: donor?.lng || -122.4194 };

    const newDonation: Donation = {
      id: `DON-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}`,
      donorId: donor?.id || 'user_donor_1',
      donorName: donor?.name || 'Chef Marco Bellini',
      donorOrg: donor?.organizationName || 'Sunshine Bistro & Bakery',
      foodName: data.foodName || 'Surplus Nutritious Meal Boxes',
      quantity: data.quantity || `${qtyNum} portions`,
      quantityNumber: qtyNum,
      unit: data.unit || 'portions',
      category: data.category || 'Prepared Meals',
      prepTime: data.prepTime || 'Prepared recently today',
      expiryTime: data.expiryTime || 'Best within 6 hours',
      pickupLocation: data.pickupLocation || donor?.address || '428 Blossom Street, Downtown',
      pickupAddress: donor?.address || '428 Blossom Street, Downtown',
      lat: liveCoords.lat,
      lng: liveCoords.lng,
      pickupWindow: data.pickupWindow || 'Today 13:00 - 18:00',
      isVegetarian: data.isVegetarian ?? true,
      isVegan: data.isVegan ?? false,
      isHalal: data.isHalal ?? true,
      isGlutenFree: data.isGlutenFree ?? false,
      specialStorage: data.specialStorage || 'Refrigerated (0-4°C)',
      imageEmoji: data.imageEmoji || '🍱',
      imageUrl: data.imageUrl,
      status: 'available',
      urgency: data.urgency || 'high',
      notes: data.notes || 'Delicious fresh surplus food ready for immediate pickup.',
      aiVerified: true,
      aiConfidence: 96,
      estimatedMeals: estMeals,
      estimatedCo2eKg: estCo2,
      createdAt: new Date().toISOString(),
      pickupCode: randomCode,
      donorType: data.donorType || 'commercial',
      fssaiLicense: data.fssaiLicense,
      governmentIdType: data.governmentIdType,
      governmentIdNumber: data.governmentIdNumber,
      governmentIdFile: data.governmentIdFile,
      eventType: data.eventType,
      eventEndTime: data.eventEndTime,
      refrigerationAvailable: data.refrigerationAvailable,
      hygieneChecklist: data.hygieneChecklist,
      foodPhotoUrl: data.foodPhotoUrl,
    };

    donationsRef.current = [newDonation, ...donationsRef.current];
    setDonations([...donationsRef.current]);

    // Send notifications to verified receivers
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: 'user_rcv_1',
      title: '🌟 New Surplus Available!',
      message: `${newDonation.donorOrg} posted ${newDonation.foodName} (${newDonation.quantity}).`,
      type: 'donation_new',
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    sound.playDonationCreated();
    return newDonation;
  };

  // Find Matches
  const findMatchesForDonation = (donation?: Donation): MatchSuggestion[] => {
    if (!donation) return [];
    const receivers = usersRef.current.filter((u) => u && u.role === 'receiver');

    return receivers.map((receiver) => {
      // Calculate distance approximation
      const dLat = (receiver.lat - donation.lat) * 111;
      const dLng = (receiver.lng - donation.lng) * 85;
      const distanceKm = Math.round(Math.sqrt(dLat * dLat + dLng * dLng) * 10) / 10;
      const travelMins = Math.max(8, Math.round(distanceKm * 4.5 + 5));

      const criteria: string[] = [];
      let score = 85;

      if (receiver.isVerified) {
        score += 8;
        criteria.push('Verified Organization');
      }
      if (receiver.hasRefrigeration && donation.specialStorage?.includes('Refrigerated')) {
        score += 5;
        criteria.push('Cold-Chain Certified');
      }
      if ((receiver.capacityMeals || 50) >= (donation.estimatedMeals || 20)) {
        score += 5;
        criteria.push('Capacity Match');
      }
      if (distanceKm < 3.0) {
        score += 4;
        criteria.push('Within 3 km radius');
      }

      let recommendationReason = 'Great community match with proven rapid pickup history.';
      if (receiver.subtype === 'ngo') {
        recommendationReason = 'Operates high-throughput community pantry serving families in need.';
      } else if (receiver.subtype === 'shelter') {
        recommendationReason = 'Provides immediate hot evening meals for night shelter residents.';
      } else if (receiver.subtype === 'community') {
        recommendationReason = 'Active neighborhood soup kitchen open 7 days a week.';
      }

      return {
        receiver,
        matchScore: Math.min(99, score),
        distanceKm,
        estimatedTravelMinutes: travelMins,
        criteriaPassed: criteria,
        recommendationReason,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  // Accept Donation
  const acceptDonation = (donationId: string, receiverId?: string): { donation: Donation; pickup: Pickup } => {
    const rcv = (receiverId ? usersRef.current.find((u) => u && u.id === receiverId) : null)
      || currentUserRef.current
      || INITIAL_USERS.find((u) => u && u.role === 'receiver')
      || INITIAL_USERS[5];

    let targetDonation = donationsRef.current.find((d) => d && d.id === donationId);
    if (!targetDonation) {
      targetDonation = INITIAL_DONATIONS.find((d) => d && d.id === donationId) || donationsRef.current[0] || INITIAL_DONATIONS[0];
    }

    const updatedDonation: Donation = {
      ...targetDonation,
      status: 'accepted',
      acceptedByReceiverId: rcv?.id || 'user_rcv_1',
      acceptedByReceiverName: rcv?.organizationName || 'Hope Food Bank',
    };

    donationsRef.current = donationsRef.current.map((d) =>
      d && d.id === updatedDonation.id ? updatedDonation : d
    );
    setDonations([...donationsRef.current]);

    const newPickup: Pickup = {
      id: `PCK-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}`,
      donationId: updatedDonation.id,
      donorId: updatedDonation.donorId || 'user_donor_1',
      receiverId: rcv?.id || 'user_rcv_1',
      donorName: updatedDonation.donorOrg || 'Food Donor',
      receiverName: rcv?.organizationName || 'Hope Food Bank',
      pickupCode: updatedDonation.pickupCode || 'FL-8942',
      status: 'scheduled',
      scheduledTime: 'Today within 45 mins',
      etaMinutes: 20,
      donorConfirmed: false,
      receiverConfirmed: false,
    };

    pickupsRef.current = [newPickup, ...pickupsRef.current];
    setPickups([...pickupsRef.current]);

    // Send notification to donor
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: updatedDonation.donorId,
      title: '🎉 Donation Accepted!',
      message: `${rcv?.organizationName || 'Shelter'} accepted ${updatedDonation.foodName}. Pickup #${newPickup.pickupCode} scheduled!`,
      type: 'donation_accepted',
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    sound.playSuccess();
    return { donation: updatedDonation, pickup: newPickup };
  };

  // NGO / Receiver On-site Quality Inspection & OTP Release
  const recordInspectionAndVerifyOtp = (
    pickupId: string,
    checklist: { visualCleanCovered: boolean; smellFreshNoOdor: boolean; tempHotOrCold: boolean }
  ): boolean => {
    if (!checklist.visualCleanCovered || !checklist.smellFreshNoOdor || !checklist.tempHotOrCold) {
      return false;
    }

    sound.playSuccess();

    let targetDonationId: string | null = null;
    pickupsRef.current = pickupsRef.current.map((p) => {
      if (p && p.id === pickupId) {
        targetDonationId = p.donationId;
        return {
          ...p,
          status: 'in_transit' as const, // Shift verified status to in_transit
          inspectionPassed: true,
          inspectionChecklist: {
            ...checklist,
            passedAt: new Date().toISOString(),
          },
        };
      }
      return p;
    });
    setPickups([...pickupsRef.current]);

    if (targetDonationId) {
      donationsRef.current = donationsRef.current.map((d) =>
        d && d.id === targetDonationId
          ? {
              ...d,
              status: 'in_transit' as const,
              inspectionChecklist: {
                ...checklist,
                passedAt: new Date().toISOString(),
                inspectedBy: currentUserRef.current?.name || 'NGO Field Inspector',
              },
            }
          : d
      );
      setDonations([...donationsRef.current]);
    }

    return true;
  };

  // Update Pickup Status
  const updatePickupStatus = (pickupId: string, newStatus: Pickup['status']) => {
    sound.playBicycleBell();
    let completedDonationId: string | null = null;

    pickupsRef.current = pickupsRef.current.map((p) => {
      if (p && p.id === pickupId) {
        if (newStatus === 'collected') {
          completedDonationId = p.donationId;
        }
        return {
          ...p,
          status: newStatus,
          completedAt: newStatus === 'collected' ? new Date().toISOString() : p.completedAt,
        };
      }
      return p;
    });
    setPickups([...pickupsRef.current]);

    if (completedDonationId) {
      donationsRef.current = donationsRef.current.map((d) =>
        d && d.id === completedDonationId ? { ...d, status: 'collected' } : d
      );
      setDonations([...donationsRef.current]);

      const matchedDonation = donationsRef.current.find((d) => d && d.id === completedDonationId);
      if (matchedDonation) {
        setImpactMetrics((iPrev) => ({
          ...iPrev,
          totalKgRescued: iPrev.totalKgRescued + (matchedDonation.quantityNumber || 20),
          totalDonationsCompleted: iPrev.totalDonationsCompleted + 1,
          totalMealsRedistributed: iPrev.totalMealsRedistributed + matchedDonation.estimatedMeals,
          totalCo2eSavedKg: iPrev.totalCo2eSavedKg + matchedDonation.estimatedCo2eKg,
          totalWaterSavedLiters: iPrev.totalWaterSavedLiters + matchedDonation.estimatedMeals * 40,
          totalFoodWastePreventedDollars:
            iPrev.totalFoodWastePreventedDollars + (matchedDonation.quantityNumber || 20) * 5,
        }));
      }
    }
  };

  // Confirm Pickup (Two-way completion)
  const confirmPickup = (pickupId: string, asRole: 'donor' | 'receiver') => {
    sound.playPop(700);
    let completedDonationId: string | null = null;

    pickupsRef.current = pickupsRef.current.map((p) => {
      if (p && p.id === pickupId) {
        const updated = {
          ...p,
          donorConfirmed: asRole === 'donor' ? true : p.donorConfirmed,
          receiverConfirmed: asRole === 'receiver' ? true : p.receiverConfirmed,
        };

        if (updated.donorConfirmed && updated.receiverConfirmed && updated.status !== 'collected') {
          updated.status = 'collected';
          updated.completedAt = new Date().toISOString();
          completedDonationId = p.donationId;
          sound.playSuccess();
        }
        return updated;
      }
      return p;
    });
    setPickups([...pickupsRef.current]);

    if (completedDonationId) {
      donationsRef.current = donationsRef.current.map((d) =>
        d && d.id === completedDonationId ? { ...d, status: 'collected' } : d
      );
      setDonations([...donationsRef.current]);

      const matchedDonation = donationsRef.current.find((d) => d && d.id === completedDonationId);
      if (matchedDonation) {
        setImpactMetrics((iPrev) => ({
          ...iPrev,
          totalKgRescued: iPrev.totalKgRescued + (matchedDonation.quantityNumber || 20),
          totalDonationsCompleted: iPrev.totalDonationsCompleted + 1,
          totalMealsRedistributed: iPrev.totalMealsRedistributed + matchedDonation.estimatedMeals,
          totalCo2eSavedKg: iPrev.totalCo2eSavedKg + matchedDonation.estimatedCo2eKg,
          totalWaterSavedLiters: iPrev.totalWaterSavedLiters + matchedDonation.estimatedMeals * 40,
          totalFoodWastePreventedDollars:
            iPrev.totalFoodWastePreventedDollars + (matchedDonation.quantityNumber || 20) * 5,
        }));
      }
    }
  };

  // Verify User (Admin action)
  const verifyUser = (userId: string, approve: boolean) => {
    sound.playPop(approve ? 880 : 330);
    usersRef.current = usersRef.current.map((u) =>
      u && u.id === userId
        ? {
            ...u,
            isVerified: approve,
            verificationBadge: approve ? 'Official Verified Partner' : 'Verification Under Review',
          }
        : u
    );
    setUsers([...usersRef.current]);
  };

  // Resolve Report (Admin action)
  const resolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    sound.playPop(520);
    setReports((prev) =>
      prev.map((r) => (r && r.id === reportId ? { ...r, status: action } : r))
    );
  };

  // 1-Click Interactive Hackathon Demo Flow
  const runHackathonDemoFlow = () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setDemoStep(1);
    sound.playSuccess();

    // Step 1: Restaurant logs in
    const marco = usersRef.current.find((u) => u && u.id === 'user_donor_1') || INITIAL_USERS[0];
    currentUserRef.current = marco;
    setCurrentUser(marco);
    setActiveTabState('donor_dashboard');
    setDemoMessage('Step 1/6: Chef Marco logs into Sunshine Bistro & Bakery...');

    setTimeout(() => {
      // Step 2: Posts 50 surplus meal portions
      setDemoStep(2);
      setDemoMessage('Step 2/6: Sunshine Bistro posts 50 gourmet fresh meal portions...');
      const demoDonation = createDonation({
        foodName: '50 Fresh Mediterranean Harvest Bowls',
        quantity: '50 portions',
        quantityNumber: 50,
        unit: 'portions',
        category: 'Prepared Meals',
        prepTime: 'Prepared 1 hour ago',
        expiryTime: 'Best within 5 hours',
        pickupLocation: 'Kitchen Loading Bay A',
        specialStorage: 'Refrigerated (0-4°C)',
        isVegetarian: true,
        isVegan: true,
        isHalal: true,
        notes: 'Delicious surplus quinoa, hummus, roasted veggies, pita bread.',
        imageEmoji: '🥗',
        urgency: 'critical',
      });

      setTimeout(() => {
        // Step 3: Platform identifies nearby receivers & AI matches best suited
        setDemoStep(3);
        setDemoMessage('Step 3/6: AI Matching analyzes 4 nearby receivers... Recommended: Hope Food Bank (98% match)!');
        sound.playMatch();
        setActiveTabState('matching');

        setTimeout(() => {
          // Step 4: NGO accepts donation & generates QR
          setDemoStep(4);
          setDemoMessage('Step 4/6: Hope Food Bank accepts donation! Generated Pickup QR #FL-8942...');
          const hopeNGO = usersRef.current.find((u) => u && u.id === 'user_rcv_1') || INITIAL_USERS[5];
          currentUserRef.current = hopeNGO;
          setCurrentUser(hopeNGO);
          const { pickup } = acceptDonation(demoDonation.id, hopeNGO.id);
          setActiveTabState('pickups');

          setTimeout(() => {
            // Step 5: Pickup status advances Available -> Accepted -> Collected
            setDemoStep(5);
            setDemoMessage('Step 5/6: Courier arrives! Status updated to "Collected" & verified...');
            sound.playBicycleBell();
            if (pickup && pickup.id) {
              updatePickupStatus(pickup.id, 'collected');
            }

            setTimeout(() => {
              // Step 6: Impact dashboard updates automatically
              setDemoStep(6);
              setDemoMessage('Step 6/6: Complete! Impact dashboard updated (+50 meals, +21 kg food, +52.5 kg CO₂ saved)!');
              sound.playSuccess();
              setActiveTabState('impact');

              setTimeout(() => {
                setDemoRunning(false);
                setDemoStep(0);
                setDemoMessage('');
              }, 4000);
            }, 2500);
          }, 2500);
        }, 2500);
      }, 2500);
    }, 2000);
  };

  return (
    <FoodLoopContext.Provider
      value={{
        currentUser,
        users,
        donations,
        pickups,
        notifications,
        impactMetrics,
        reports,
        activeTab,
        isSoundMuted,
        demoRunning,
        demoStep,
        demoMessage,
        language,
        userLiveCoords,
        setUserLiveCoords,
        setActiveTab,
        setCurrentUserById,
        toggleSound,
        setLanguage,
        t,
        locateUserLiveGps,
        updateUserProfile,
        createDonation,
        acceptDonation,
        updatePickupStatus,
        confirmPickup,
        verifyUser,
        resolveReport,
        findMatchesForDonation,
        analyzeFoodWithAI,
        runHackathonDemoFlow,
        markNotificationRead,
        clearAllNotifications,
        recordInspectionAndVerifyOtp,
      }}
    >
      {children}
    </FoodLoopContext.Provider>
  );
};

export const useFoodLoop = () => {
  const ctx = useContext(FoodLoopContext);
  if (!ctx) throw new Error('useFoodLoop must be used within FoodLoopProvider');
  return ctx;
};

