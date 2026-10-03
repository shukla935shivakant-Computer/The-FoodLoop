import React, { useState, useEffect } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../utils/translations';
import {
  Globe2,
  User,
  Building,
  Phone,
  MapPin,
  ShieldCheck,
  Volume2,
  VolumeX,
  Bell,
  CheckCircle2,
  Save,
  Crosshair,
  Sparkles,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    language,
    setLanguage,
    t,
    isSoundMuted,
    toggleSound,
    userLiveCoords,
    locateUserLiveGps,
  } = useFoodLoop();

  // Local Form State initialized from currentUser
  const [name, setName] = useState(currentUser?.name || '');
  const [orgName, setOrgName] = useState(currentUser?.organizationName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [capacityMeals, setCapacityMeals] = useState<number>(currentUser?.capacityMeals || 100);
  const [hasRefrigeration, setHasRefrigeration] = useState(currentUser?.hasRefrigeration ?? true);
  const [hasHeatedStorage, setHasHeatedStorage] = useState(currentUser?.hasHeatedStorage ?? true);
  const [soundVolume, setSoundVolume] = useState<number>(Math.round(sound.volume * 100));

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUpdatingGps, setIsUpdatingGps] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setOrgName(currentUser.organizationName || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
      setCapacityMeals(currentUser.capacityMeals || 100);
      setHasRefrigeration(currentUser.hasRefrigeration ?? true);
      setHasHeatedStorage(currentUser.hasHeatedStorage ?? true);
    }
  }, [currentUser]);

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    sound.playSuccess();
    setLanguage(langCode);
  };

  const handleUpdateGps = async () => {
    setIsUpdatingGps(true);
    try {
      const coords = await locateUserLiveGps();
      updateUserProfile({ lat: coords.lat, lng: coords.lng });
      sound.playSuccess();
    } finally {
      setIsUpdatingGps(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playDonationCreated();

    updateUserProfile({
      name,
      organizationName: orgName,
      phone,
      address,
      capacityMeals: Number(capacityMeals) || 50,
      hasRefrigeration,
      hasHeatedStorage,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleVolumeChange = (newVol: number) => {
    setSoundVolume(newVol);
    sound.setVolume(newVol / 100);
    sound.playPop(520);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">
              ⚙️
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t('settings')} & {t('profileSettings')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Configure profile functions, live GPS, sound effects, and multilingual Indian language preferences.
              </p>
            </div>
          </div>

          {savedSuccess && (
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('savedSuccess')}</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Indian & Global Languages Selection Grid */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              {t('languageSelect')} (Hindi & Top 10 Indian Languages)
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Active: {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Choose your preferred language. The entire platform interface (navigation, maps, actions, and alerts) switches instantly.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-100/70 border-amber-500 shadow-xs scale-102'
                    : 'bg-slate-50/70 border-slate-200 hover:border-amber-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{lang.flag}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 leading-tight">
                    {lang.nativeName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {lang.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Profile-Related Functions Form */}
      <form onSubmit={handleSaveProfile} className="space-y-8">
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
            <User className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              User Profile Functions & Organization Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Org Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('orgName')} *</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            {/* Representative Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('fullName')} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('phone')} *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            {/* Daily Capacity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('mealCapacity')} (portions/day)</label>
              <input
                type="number"
                min="5"
                value={capacityMeals}
                onChange={(e) => setCapacityMeals(parseInt(e.target.value) || 50)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            {/* Facility Address */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('facilityAddress')} *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            {/* Storage Facilities Toggle */}
            <div className="sm:col-span-2 space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700">Storage & Equipment Certification</label>
              <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasRefrigeration}
                    onChange={(e) => setHasRefrigeration(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>{t('refrigerationAvailable')} (0-4°C)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasHeatedStorage}
                    onChange={(e) => setHasHeatedStorage(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>{t('hotHolding')} (≥60°C)</span>
                </label>
              </div>
            </div>

            {/* Live GPS Coordinates Card */}
            <div className="sm:col-span-2 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Surplus Live GPS Pin Coordinates:</span>
                </span>
                <div className="text-slate-600 font-mono text-[11px]">
                  Latitude: {userLiveCoords?.lat.toFixed(4) || currentUser?.lat.toFixed(4)}, Longitude:{' '}
                  {userLiveCoords?.lng.toFixed(4) || currentUser?.lng.toFixed(4)}
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpdateGps}
                disabled={isUpdatingGps}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Crosshair className={`w-3.5 h-3.5 ${isUpdatingGps ? 'animate-spin' : ''}`} />
                <span>{isUpdatingGps ? 'Querying GPS...' : 'Update to My Live GPS'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Audio & Notifications Preference Section */}
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
            <Volume2 className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              Audio Feedback & Notification Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Audio Toggle & Volume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">UI Sound Effects:</span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    !isSoundMuted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {!isSoundMuted ? 'Sound Enabled 🔊' : 'Muted 🔇'}
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Volume Level:</span>
                  <span className="font-bold text-slate-800">{soundVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Test Audio Button */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">Test delightful audio chimes:</span>
              <button
                type="button"
                onClick={() => sound.playSuccess()}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow-xs"
              >
                Play Fanfare 🎵
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{t('saveChanges')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
