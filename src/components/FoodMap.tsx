import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { Donation, User } from '../types';
import { RealLeafletMap } from './RealLeafletMap';
import {
  MapPin,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Truck,
  Building,
  Crosshair,
} from 'lucide-react';

export const FoodMap: React.FC = () => {
  const {
    donations,
    users,
    pickups,
    setActiveTab,
    acceptDonation,
    currentUser,
    userLiveCoords,
    locateUserLiveGps,
    t,
  } = useFoodLoop();

  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(donations[0] || null);
  const [selectedReceiver, setSelectedReceiver] = useState<User | null>(null);

  const availableDonations = (donations || []).filter((d) => d && d.status === 'available');
  const activePickupDonations = (donations || []).filter(
    (d) => d && (d.status === 'accepted' || d.status === 'in_transit')
  );
  const completedDonations = (donations || []).filter((d) => d && d.status === 'collected');
  const receiverUsers = (users || []).filter((u) => u && u.role === 'receiver');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header and Live Map Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>🗺️ {t('surplusMap')}</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Live Real-World GPS
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Real satellite & street tiles showing live surplus food, active couriers, and verified shelters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {userLiveCoords && (
            <div className="bg-emerald-50 border border-emerald-300 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <span className="text-[10px] text-emerald-600 block uppercase font-bold">Surplus GPS Pin</span>
                <span className="font-extrabold text-emerald-900 font-mono text-[11px]">
                  {userLiveCoords.lat.toFixed(4)}, {userLiveCoords.lng.toFixed(4)}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              sound.playDonationCreated();
              setActiveTab('create_donation');
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>+ {t('donateFood')}</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real Global Leaflet Map Engine Container */}
        <div className="lg:col-span-2">
          <RealLeafletMap
            onSelectDonation={(d) => {
              setSelectedDonation(d);
              setSelectedReceiver(null);
            }}
            onSelectReceiver={(r) => {
              setSelectedReceiver(r);
              setSelectedDonation(null);
            }}
            selectedDonation={selectedDonation}
            selectedReceiver={selectedReceiver}
          />
        </div>

        {/* Selected Item Detail Inspector Sidebar */}
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between h-fit min-h-[520px]">
          {selectedDonation ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs">
                  {selectedDonation.imageEmoji}
                </div>
                <div>
                  <span
                    className={`inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full ${
                      selectedDonation.status === 'available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedDonation.status === 'collected'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedDonation.status === 'available'
                      ? t('statusAvailable')
                      : selectedDonation.status === 'collected'
                      ? t('statusCollected')
                      : t('statusInTransit')}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {selectedDonation.foodName}
                </h3>
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  Offered by {selectedDonation.donorOrg}
                </div>
              </div>

              <div className="bg-amber-50/60 rounded-2xl p-3.5 space-y-2 text-xs border border-amber-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('Quantity')}:</span>
                  <span className="font-extrabold text-slate-900">{selectedDonation.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('Estimated Portions')}:</span>
                  <span className="font-extrabold text-slate-900">~{selectedDonation.estimatedMeals} meals</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('Storage Requirement')}:</span>
                  <span className="font-bold text-amber-900">{t(selectedDonation.specialStorage)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('Pickup Window')}:</span>
                  <span className="font-bold text-slate-800">{selectedDonation.pickupWindow}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('co2Avoided')}:</span>
                  <span className="font-extrabold text-emerald-700">+{selectedDonation.estimatedCo2eKg} kg</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 mb-1.5">{t('Dietary & Allergen Certifications')}:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDonation.isVegetarian && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {t('Vegetarian')}
                    </span>
                  )}
                  {selectedDonation.isVegan && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-800">
                      {t('Vegan')}
                    </span>
                  )}
                  {selectedDonation.isHalal && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                      {t('Halal')}
                    </span>
                  )}
                  {selectedDonation.isGlutenFree && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      {t('Gluten-Free')}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-700 block text-[11px] uppercase mb-0.5">{t('Pickup Location')}:</span>
                {selectedDonation.pickupAddress}
              </div>

              {/* Actions based on donation status */}
              <div className="pt-2 space-y-2">
                {selectedDonation.status === 'available' ? (
                  <button
                    onClick={() => {
                      sound.playMatch();
                      setActiveTab('matching');
                    }}
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{t('matchAndRescue')}</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('pickups');
                    }}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Track Pickup #{selectedDonation.pickupCode}</span>
                    <Truck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : selectedReceiver ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${selectedReceiver.avatarBg}`}>
                  {selectedReceiver.avatarEmoji}
                </div>
                <span className="inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                  {t('verifiedReceivers')}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {selectedReceiver.organizationName}
                </h3>
                <div className="text-xs font-bold text-slate-500 mt-1">
                  Contact: {selectedReceiver.name} · {selectedReceiver.phone}
                </div>
              </div>

              <div className="bg-teal-50/70 rounded-2xl p-3.5 space-y-2 text-xs border border-teal-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Type:</span>
                  <span className="font-extrabold text-slate-900 capitalize">{selectedReceiver.subtype}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('mealCapacity')}:</span>
                  <span className="font-extrabold text-slate-900">{selectedReceiver.capacityMeals} meals/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t('refrigerationAvailable')}:</span>
                  <span className="font-extrabold text-emerald-700">
                    {selectedReceiver.hasRefrigeration ? '✓ Cold-chain ok' : 'Ambient only'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Rating:</span>
                  <span className="font-extrabold text-amber-600">⭐ {selectedReceiver.rating} ({selectedReceiver.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-700 block text-[11px] uppercase mb-0.5">{t('facilityAddress')}:</span>
                {selectedReceiver.address}
              </div>

              <button
                onClick={() => {
                  sound.playPop(550);
                  setActiveTab('matching');
                }}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t('matchAndRescue')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 space-y-2">
              <MapPin className="w-10 h-10 mx-auto opacity-50 text-slate-400" />
              <p className="text-xs font-bold">{t('viewAllMap')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
