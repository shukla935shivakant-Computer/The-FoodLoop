import React, { useState, useEffect } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { FoodCategory, StorageRequirement, UrgencyLevel, AIAnalysisResult } from '../types';
import { osmReverseGeocode } from '../utils/osmApi';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Crosshair,
  ShieldCheck,
  Thermometer,
  Layers,
  ArrowRight,
  Info,
  Loader2,
  Building2,
  UserCheck,
  Camera,
  Upload,
  FileText,
  CheckSquare,
  Square,
  AlertTriangle,
  Heart,
  Snowflake,
} from 'lucide-react';

export const CreateDonationView: React.FC = () => {
  const { createDonation, currentUser, setActiveTab, analyzeFoodWithAI, userLiveCoords, locateUserLiveGps, t } = useFoodLoop();

  // Donor Type Selection
  const [donorType, setDonorType] = useState<'commercial' | 'individual'>('individual');

  // Commercial Entity Fields
  const [fssaiLicense, setFssaiLicense] = useState('10020042001892');
  const [fssaiStatus, setFssaiStatus] = useState<'verified' | 'unverified'>('verified');

  // Individual / Private Event Fields
  const [governmentIdType, setGovernmentIdType] = useState<'Aadhaar' | 'Driving License' | 'Voter ID' | 'Passport'>('Aadhaar');
  const [governmentIdNumber, setGovernmentIdNumber] = useState('XXXX-XXXX-4589');
  const [governmentIdFileName, setGovernmentIdFileName] = useState('govt_id_scan_aadhaar.jpg');
  const [isIdUploaded, setIsIdUploaded] = useState(true);

  // Event Details
  const [eventType, setEventType] = useState<'Wedding' | 'Birthday' | 'House Party' | 'Community Gathering' | 'Household / Family Function' | 'Other'>('Wedding');
  const [eventEndTime, setEventEndTime] = useState('22:00');
  const [refrigerationAvailable, setRefrigerationAvailable] = useState(false);

  // Auto-calculated Shelf-life state
  const [autoCalculatedExpiry, setAutoCalculatedExpiry] = useState('Best within 3.5 hours from Event End (by 01:30 AM)');

  // Physical Quality & Hygiene Checklist (Mandatory for Individual Donors)
  const [hygieneChecks, setHygieneChecks] = useState({
    cleanKitchen: true,
    coveredAfterEvent: true,
    freshSmell: true,
    safeTempOrRefrig: true,
  });

  // Food Photo Upload (Mandatory)
  const [foodPhotoUrl, setFoodPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop'
  );
  const [photoFileName, setPhotoFileName] = useState('wedding_buffet_covered_trays.jpg');

  // Form Core State
  const [foodName, setFoodName] = useState('45 Portions Fresh Paneer Butter Masala, Jeera Rice & Dal Makhani');
  const [quantity, setQuantity] = useState('45 portions');
  const [quantityNumber, setQuantityNumber] = useState<number>(45);
  const [unit, setUnit] = useState<'portions' | 'kg' | 'boxes' | 'crates'>('portions');
  const [category, setCategory] = useState<FoodCategory>('Prepared Meals');
  const [prepTime, setPrepTime] = useState('Prepared today for evening dinner');
  const [expiryTime, setExpiryTime] = useState('Best within 3.5 hours (Eat before 01:30 AM)');
  const [pickupWindow, setPickupWindow] = useState('Tonight 22:30 - 01:00');
  const [pickupLocation, setPickupLocation] = useState('Grand Blossom Banquet Hall, Service Entry Gate #2');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [isVegan, setIsVegan] = useState(false);
  const [isHalal, setIsHalal] = useState(true);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [specialStorage, setSpecialStorage] = useState<StorageRequirement>('Room Temp');
  const [urgency, setUrgency] = useState<UrgencyLevel>('critical');
  const [selectedEmoji, setSelectedEmoji] = useState('🍲');
  const [notes, setNotes] = useState('Untouched wedding buffet surplus, kept strictly covered in commercial stainless steel chafing containers.');

  // OpenStreetMap Location Verification State
  const [osmVerifiedAddress, setOsmVerifiedAddress] = useState<string>('');
  const [isResolvingOsm, setIsResolvingOsm] = useState(false);

  // AI Pre-check State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [submittedDonationId, setSubmittedDonationId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const emojiPresets = ['🍲', '🥗', '🥪', '🥖', '🍎', '🍱', '🥐', '🍚', '🍛', '🍰'];

  // Automatically recalculate shelf-life to 3-4 hours from Event End Time if unrefrigerated
  useEffect(() => {
    if (donorType === 'individual') {
      if (!refrigerationAvailable) {
        // Parse event end time
        const parts = eventEndTime.split(':');
        if (parts.length === 2) {
          let hours = parseInt(parts[0], 10);
          let minutes = parseInt(parts[1], 10);
          // Add 3.5 hours (210 minutes)
          minutes += 30;
          hours += 3;
          if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
          }
          hours = hours % 24;
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMins = minutes.toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const displayHour = hours % 12 === 0 ? 12 : hours % 12;

          const calculated = `Best within 3.5 hours from Event End (by ${displayHour}:${formattedMins} ${ampm})`;
          setAutoCalculatedExpiry(calculated);
          setExpiryTime(calculated);
          setPickupWindow(`Tonight ${eventEndTime} - ${formattedHours}:${formattedMins}`);
          setUrgency('critical');
          setSpecialStorage('Room Temp');
        }
      } else {
        setAutoCalculatedExpiry('Refrigerated Safe Storage: Up to 24 hours (Keep below 4°C)');
        setExpiryTime('Safe within 24 hours under refrigeration');
        setPickupWindow('Tomorrow 09:00 - 18:00');
        setUrgency('medium');
        setSpecialStorage('Refrigerated (0-4°C)');
      }
    }
  }, [donorType, eventEndTime, refrigerationAvailable]);

  const allHygieneChecksPassed =
    hygieneChecks.cleanKitchen &&
    hygieneChecks.coveredAfterEvent &&
    hygieneChecks.freshSmell &&
    hygieneChecks.safeTempOrRefrig;

  const handleAiPreCheck = async () => {
    sound.playMatch();
    setIsAnalyzing(true);
    try {
      const result = await analyzeFoodWithAI({
        foodName,
        quantity,
        category,
        prepTime,
        storage: specialStorage,
        dietary: `Vegetarian: ${isVegetarian}, Vegan: ${isVegan}, Halal: ${isHalal}, Gluten-free: ${isGlutenFree}`,
        notes: `${notes}. Donor Type: ${donorType}. Event: ${eventType} ending at ${eventEndTime}.`,
      });
      setAiAnalysis(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation for Individual Donors
    if (donorType === 'individual') {
      if (!allHygieneChecksPassed) {
        setFormError('Mandatory Safety Notice: Please verify and check all 4 hygiene criteria before posting.');
        sound.playPop(300);
        return;
      }
      if (!foodPhotoUrl) {
        setFormError('Image Proof Required: Please upload a clear real-time photo of the food containers/setup.');
        sound.playPop(300);
        return;
      }
      if (!governmentIdNumber.trim()) {
        setFormError('Government ID Required: Please enter your Government Photo ID number for verification.');
        sound.playPop(300);
        return;
      }
    }

    sound.playDonationCreated();

    const created = createDonation({
      foodName,
      quantity,
      quantityNumber: Number(quantityNumber) || 30,
      unit,
      category,
      prepTime,
      expiryTime,
      pickupWindow,
      pickupLocation,
      isVegetarian,
      isVegan,
      isHalal,
      isGlutenFree,
      specialStorage,
      urgency,
      imageEmoji: selectedEmoji,
      imageUrl: foodPhotoUrl,
      notes: `${notes} [Donor: ${donorType === 'individual' ? `Individual Event (${eventType})` : 'Commercial Entity (FSSAI Verified)'}]`,
      estimatedMeals: aiAnalysis?.estimatedMeals || Math.round((Number(quantityNumber) || 30) * 1.2),
      estimatedCo2eKg: aiAnalysis?.estimatedCo2eKgSaved || Math.round((Number(quantityNumber) || 30) * 1.05),
      donorType,
      fssaiLicense: donorType === 'commercial' ? fssaiLicense : undefined,
      governmentIdType: donorType === 'individual' ? governmentIdType : undefined,
      governmentIdNumber: donorType === 'individual' ? governmentIdNumber : undefined,
      governmentIdFile: donorType === 'individual' ? governmentIdFileName : undefined,
      eventType: donorType === 'individual' ? eventType : undefined,
      eventEndTime: donorType === 'individual' ? eventEndTime : undefined,
      refrigerationAvailable: donorType === 'individual' ? refrigerationAvailable : undefined,
      hygieneChecklist: donorType === 'individual' ? hygieneChecks : undefined,
      foodPhotoUrl,
    });

    setSubmittedDonationId(created.id);
  };

  const handleSimulatedPhotoUpload = (sampleUrl: string, sampleName: string) => {
    sound.playPop(620);
    setFoodPhotoUrl(sampleUrl);
    setPhotoFileName(sampleName);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Celebration Card when posted */}
      {submittedDonationId ? (
        <div className="bg-white rounded-3xl border-3 border-emerald-300 p-8 text-center space-y-6 shadow-lg animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto animate-bounce">
            🎉
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 font-brand-heading">
              Surplus Food Listing Live!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your donation <span className="font-bold text-slate-900">"{foodName}"</span> has been broadcast to nearby verified shelters, NGOs, and food banks.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 max-w-md mx-auto border border-emerald-200 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Donation ID:</span>
              <span className="font-bold text-slate-800">{submittedDonationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Donor Stream:</span>
              <span className="font-bold text-slate-800">
                {donorType === 'individual' ? `Private Event (${eventType})` : 'Commercial Entity (FSSAI)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Identity Verification:</span>
              <span className="font-bold text-emerald-700">
                {donorType === 'individual' ? `Govt ID (${governmentIdType} Verified)` : `FSSAI #${fssaiLicense}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Meals:</span>
              <span className="font-bold text-emerald-700">~{quantityNumber} servings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CO₂ Avoided:</span>
              <span className="font-bold text-teal-700">~{Math.round(quantityNumber * 1.05)} kg CO₂e</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playMatch();
                setActiveTab('matching');
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>View Smart AI Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playPop(520);
                setActiveTab('map');
              }}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-sm transition-all"
            >
              See on Live Map
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 p-1 rounded-3xl shadow-sm">
            <div className="bg-white rounded-[22px] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                  🍲
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-heading">
                    Donate Surplus Food
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Rescue nutritious surplus from commercial kitchens, weddings, and private events.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TOP SECTION: DONOR TYPE SELECTION (Commercial vs Individual / Private Event) */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Donor Type &amp; Verification Stream</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select whether you are donating as a commercial licensed business or an individual / event host.
                </p>
              </div>
            </div>

            {/* Toggle / Radio Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Commercial Entity */}
              <button
                type="button"
                onClick={() => {
                  sound.playPop(500);
                  setDonorType('commercial');
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                  donorType === 'commercial'
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    donorType === 'commercial' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">Commercial Entity</span>
                    {donorType === 'commercial' && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Restaurants, Caterers, Bakeries, Mess, Cafeterias, Supermarkets. Verified via <strong>FSSAI License</strong>.
                  </p>
                </div>
              </button>

              {/* Option 2: Individual / Private Event */}
              <button
                type="button"
                onClick={() => {
                  sound.playPop(550);
                  setDonorType('individual');
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                  donorType === 'individual'
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    donorType === 'individual' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">Individual / Private Event</span>
                    {donorType === 'individual' && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Weddings, Family Functions, Birthdays, House Parties, Home Donors. Verified via <strong>Govt Photo ID</strong>.
                  </p>
                </div>
              </button>
            </div>

            {/* CONDITIONAL IDENTITY VERIFICATION SECTION */}
            {donorType === 'commercial' ? (
              /* Commercial: FSSAI License Field */
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>FSSAI License / Registration Number *</span>
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {fssaiStatus === 'verified' ? '✓ Registered Commercial Entity' : 'Pending Verification'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={fssaiLicense}
                    onChange={(e) => setFssaiLicense(e.target.value)}
                    placeholder="14-digit FSSAI License Number (e.g. 10020042001892)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      sound.playSuccess();
                      setFssaiStatus('verified');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                  >
                    Verify
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Commercial food establishments must maintain a valid Food Safety and Standards Authority of India (FSSAI) license.
                </p>
              </div>
            ) : (
              /* Individual: Government Photo ID Verification Field */
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>Government Photo ID Verification (Aadhaar / Driving License / Voter ID) *</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    KYC Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">ID Type</label>
                    <select
                      value={governmentIdType}
                      onChange={(e) => setGovernmentIdType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Aadhaar">Aadhaar Card (UIDAI)</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID (Election Commission)</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Government ID Number *</label>
                    <input
                      type="text"
                      required
                      value={governmentIdNumber}
                      onChange={(e) => setGovernmentIdNumber(e.target.value)}
                      placeholder="e.g. XXXX-XXXX-4589"
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Photo ID Document</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-3 py-2 rounded-xl border border-amber-200 bg-white text-xs font-medium text-slate-700 truncate">
                        {governmentIdFileName}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPop(520);
                          setIsIdUploaded(true);
                          setGovernmentIdFileName(`govt_id_${governmentIdType.toLowerCase().replace(' ', '_')}.jpg`);
                        }}
                        className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors"
                        title="Upload/change ID document"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-amber-900 bg-amber-100/70 p-2.5 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Individual donor identity is cryptographically encrypted and securely logged to protect recipient shelter community health.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* EVENT DETAILS & AUTO SHELF-LIFE CALCULATION (For Individual Donors) */}
          {donorType === 'individual' && (
            <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-8 space-y-5 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <span>Event Details &amp; Smart Shelf-Life Calculation</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Shelf-life is strictly automated to 3–4 hours from Event End Time if no refrigeration is available.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Event Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Event Type *</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs font-bold"
                  >
                    <option value="Wedding">💍 Wedding Reception / Sangeet</option>
                    <option value="Birthday">🎂 Birthday Celebration</option>
                    <option value="House Party">🎉 House Party / Social Gathering</option>
                    <option value="Community Gathering">🤝 Community / Temple Feast</option>
                    <option value="Household / Family Function">🏡 Household / Family Function</option>
                    <option value="Other">🎊 Other Event Celebration</option>
                  </select>
                </div>

                {/* Exact Event End Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Exact Event End Time *</label>
                  <input
                    type="time"
                    required
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs font-bold font-mono"
                  />
                  <span className="text-[10px] text-slate-400">When food service concluded</span>
                </div>

                {/* Refrigeration Available Toggle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Refrigeration Available on Site?</label>
                  <div className="flex gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setRefrigerationAvailable(false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                        !refrigerationAvailable
                          ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>No (Ambient)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRefrigerationAvailable(true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                        refrigerationAvailable
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Snowflake className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Yes (Chilled)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Auto-Calculated Shelf-Life Alert Box */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  !refrigerationAvailable
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{autoCalculatedExpiry}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  {!refrigerationAvailable ? (
                    <>
                      ⚡ <strong>Automated 3–4 Hour Rule:</strong> Per strict food safety regulations for unrefrigerated cooked event food, surplus must be picked up and served within <strong>3.5 hours</strong> of event completion ({eventEndTime}) to prevent bacterial spoilage.
                    </>
                  ) : (
                    <>
                      ❄️ <strong>Cold-Storage Approved:</strong> Food stored in calibrated refrigeration can be distributed across an extended 24-hour window.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* PHYSICAL QUALITY & HYGIENE CHECKLIST (Mandatory for Individual Donors) */}
          {donorType === 'individual' && (
            <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-8 space-y-5 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-rose-600" />
                    <span>Physical Quality &amp; Hygiene Checklist (Mandatory)</span>
                    <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                      All 4 Required
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Individual donors must visually and sensorily verify food condition before dispatch.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Item 1 */}
                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-amber-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hygieneChecks.cleanKitchen}
                    onChange={(e) => {
                      sound.playPop(520);
                      setHygieneChecks((prev) => ({ ...prev, cleanKitchen: e.target.checked }));
                    }}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-900 block">
                      1. Prepared in a clean, hygienic kitchen/environment
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Cooking vessels, cutting boards, and preparation area adhered to basic food hygiene standards.
                    </span>
                  </div>
                </label>

                {/* Item 2 */}
                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-amber-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hygieneChecks.coveredAfterEvent}
                    onChange={(e) => {
                      sound.playPop(520);
                      setHygieneChecks((prev) => ({ ...prev, coveredAfterEvent: e.target.checked }));
                    }}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-900 block">
                      2. Food was kept covered and untouched after the event ended
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Tightly covered with stainless steel lids, food foil, or closed containers to prevent contamination.
                    </span>
                  </div>
                </label>

                {/* Item 3 */}
                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-amber-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hygieneChecks.freshSmell}
                    onChange={(e) => {
                      sound.playPop(520);
                      setHygieneChecks((prev) => ({ ...prev, freshSmell: e.target.checked }));
                    }}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-900 block">
                      3. Food smells fresh, has no sour/off odor, and shows no signs of spoilage
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Passed sensory odor check; gravy has not separated or soured.
                    </span>
                  </div>
                </label>

                {/* Item 4 */}
                <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 hover:bg-amber-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hygieneChecks.safeTempOrRefrig}
                    onChange={(e) => {
                      sound.playPop(520);
                      setHygieneChecks((prev) => ({ ...prev, safeTempOrRefrig: e.target.checked }));
                    }}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-900 block">
                      4. Food has been stored at safe room temperature or refrigerated
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Maintained away from direct sunlight and ambient temperatures exceeding 32°C.
                    </span>
                  </div>
                </label>
              </div>

              {!allHygieneChecksPassed && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>All 4 hygiene checkpoints must be marked before this listing can be broadcast.</span>
                </div>
              )}
            </div>
          )}

          {/* IMAGE PROOF UPLOAD (Mandatory Food Photo Upload field) */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-600" />
                  <span>Mandatory Image Proof: Food Containers / Setup *</span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Upload a clear real-time picture of the food containers or chafing dishes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Photo Preview Card */}
              <div className="md:col-span-1">
                {foodPhotoUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-sm aspect-4/3 bg-slate-100 group">
                    <img
                      src={foodPhotoUrl}
                      alt="Food container setup"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Photo</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-2 text-white text-[11px] truncate">
                      {photoFileName}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl aspect-4/3 flex flex-col items-center justify-center p-4 text-center text-slate-400">
                    <Camera className="w-8 h-8 mb-1" />
                    <span className="text-xs font-bold">No photo attached</span>
                  </div>
                )}
              </div>

              {/* Upload Controls & Presets */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedPhotoUpload(
                        'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop',
                        'wedding_covered_buffet_trays.jpg'
                      )
                    }
                    className="px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-700" />
                    <span>Preset 1: Chafing Dishes (Event Buffet)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedPhotoUpload(
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop',
                        'sealed_meal_boxes_50pk.jpg'
                      )
                    }
                    className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Preset 2: Sealed Meal Boxes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedPhotoUpload(
                        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
                        'bakery_bread_crates.jpg'
                      )
                    }
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-600" />
                    <span>Preset 3: Bakery &amp; Produce Crates</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>
                    Clear photos allow recipient NGOs to inspect packaging seals and prepare correct thermal transport containers before dispatch.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CORE FOOD DETAILS CARD */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-3">
              <span>Food &amp; Portion Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Food Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Food Name &amp; Description *</label>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. 50 Fresh Meals (Dal Makhani, Rice, Roti & Salad)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-medium"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Quantity Portions / Count *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantityNumber}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 1;
                      setQuantityNumber(val);
                      setQuantity(`${val} ${unit}`);
                    }}
                    className="w-28 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-bold"
                  />
                  <select
                    value={unit}
                    onChange={(e) => {
                      const u = e.target.value as any;
                      setUnit(u);
                      setQuantity(`${quantityNumber} ${u}`);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-bold"
                  >
                    <option value="portions">Portions / Servings</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="boxes">Sealed Boxes</option>
                    <option value="crates">Crates</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Food Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-bold"
                >
                  <option value="Prepared Meals">Prepared Meals (Cooked Hot/Cold)</option>
                  <option value="Bakery & Bread">Bakery &amp; Bread</option>
                  <option value="Fresh Produce">Fresh Produce (Fruits &amp; Veggies)</option>
                  <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
                  <option value="Packaged Foods">Packaged Foods</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>

              {/* Preparation Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Preparation Time / Finished At *</label>
                <input
                  type="text"
                  required
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-medium"
                />
              </div>

              {/* Expiry Window */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Calculated Expiry &amp; Safe Consumption *</label>
                <input
                  type="text"
                  required
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-bold text-amber-900 bg-amber-50/50"
                />
              </div>

              {/* Pickup Address & Location */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Pickup Location &amp; Handover Point (OpenStreetMap Verified) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Exact address or venue name (e.g. Grand Blossom Hall, Gate 2)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!userLiveCoords) {
                        locateUserLiveGps();
                        return;
                      }
                      setIsResolvingOsm(true);
                      try {
                        const addr = await osmReverseGeocode(userLiveCoords.lat, userLiveCoords.lng);
                        setPickupLocation(addr);
                        setOsmVerifiedAddress(addr);
                        sound.playPop(520);
                      } finally {
                        setIsResolvingOsm(false);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Crosshair className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isResolvingOsm ? 'Resolving...' : 'Use My GPS'}</span>
                  </button>
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700">Dietary &amp; Allergen Tags</label>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVegetarian}
                      onChange={(e) => setIsVegetarian(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVegan}
                      onChange={(e) => setIsVegan(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Vegan</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isHalal}
                      onChange={(e) => setIsHalal(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Halal</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGlutenFree}
                      onChange={(e) => setIsGlutenFree(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Gluten-Free</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Handling &amp; Packaging Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* AI Pre-Check Panel */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-300 p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Food Waste &amp; Viability Pre-Check</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Verify Redistribution Safety, Meals &amp; Environmental Impact
                </h3>
              </div>

              <button
                type="button"
                onClick={handleAiPreCheck}
                disabled={isAnalyzing}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Viability...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Safety &amp; Impact Check</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Results Output */}
            {aiAnalysis && (
              <div className="bg-white rounded-2xl p-5 border border-emerald-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-extrabold text-slate-900 text-sm">
                      {aiAnalysis.canRedistribute ? 'Verified Edible Surplus' : 'Safety Review Required'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {aiAnalysis.confidenceScore}% Viability Score
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-emerald-50/70 p-2.5 rounded-xl">
                    <span className="text-slate-500 block">Estimated Meals</span>
                    <span className="font-extrabold text-slate-900 text-sm">~{aiAnalysis.estimatedMeals} portions</span>
                  </div>
                  <div className="bg-teal-50/70 p-2.5 rounded-xl">
                    <span className="text-slate-500 block">CO₂e Prevented</span>
                    <span className="font-extrabold text-teal-800 text-sm">+{aiAnalysis.estimatedCo2eKgSaved} kg</span>
                  </div>
                  <div className="bg-amber-50/70 p-2.5 rounded-xl">
                    <span className="text-slate-500 block">Remaining Window</span>
                    <span className="font-extrabold text-amber-900 text-sm">{aiAnalysis.shelfLifeRemainingHours} Hours</span>
                  </div>
                  <div className="bg-sky-50/70 p-2.5 rounded-xl">
                    <span className="text-slate-500 block">Fraud / Quality</span>
                    <span className="font-extrabold text-emerald-800 text-sm">Passed Audit</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <span className="font-bold">Safe Handling Reminders:</span>
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                    {aiAnalysis.safeHandlingReminders.map((rem, i) => (
                      <li key={i}>{rem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Form Error Banner if validation fails */}
          {formError && (
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500">
              {donorType === 'individual' ? (
                <span>
                  ✓ Government Photo ID &amp; 4-Point Hygiene Checklist will be logged for shelter safety.
                </span>
              ) : (
                <span>
                  ✓ Commercial Entity FSSAI License verified for regulatory compliance.
                </span>
              )}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                {t('Close')}
              </button>
              <button
                type="submit"
                disabled={donorType === 'individual' && !allHygieneChecksPassed}
                className={`px-8 py-3.5 rounded-2xl text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 ${
                  donorType === 'individual' && !allHygieneChecksPassed
                    ? 'bg-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200 hover:scale-105 active:scale-95'
                }`}
              >
                <span>{t('Broadcast Surplus Food')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
