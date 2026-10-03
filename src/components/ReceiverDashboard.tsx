import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  Heart,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const ReceiverDashboard: React.FC = () => {
  const { currentUser, donations, pickups, acceptDonation, setActiveTab } = useFoodLoop();

  const [communityNeeds, setCommunityNeeds] = useState(
    'Need 60 hot meal portions tonight for our family shelter service.'
  );
  const [needPosted, setNeedPosted] = useState(false);

  const availableSurplus = (donations || []).filter((d) => d && d.status === 'available');
  const myPickups = (pickups || []).filter((p) => p && currentUser?.id && p.receiverId === currentUser.id);

  const handleAccept = (donationId: string) => {
    if (!currentUser?.id) return;
    sound.playSuccess();
    acceptDonation(donationId, currentUser.id);
    setActiveTab('pickups');
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${currentUser.avatarBg}`}>
              {currentUser.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {currentUser.organizationName}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  {currentUser.verificationBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {currentUser.name} · {currentUser.capacityMeals} meals daily capacity · {currentUser.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPop(520);
                setActiveTab('map');
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Map Radius</span>
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast Need Card */}
      <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span>📢 Broadcast Community Meal Demand to Local Donors</span>
          </h3>
          {needPosted && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Broadcast Active to 40+ local businesses ✓
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={communityNeeds}
            onChange={(e) => setCommunityNeeds(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={() => {
              sound.playNotification();
              setNeedPosted(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs"
          >
            Update Need
          </button>
        </div>
      </div>

      {/* Available Surplus In Radius */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            Available Surplus Within Your Service Area
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
            {availableSurplus.length} ready for pickup
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableSurplus.map((item) => {
            if (!item || !item.id) return null;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-2xl">
                      {item.imageEmoji}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {item.urgency === 'critical' ? 'Urgent' : 'Available'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{item.foodName}</h3>
                  <div className="text-xs text-teal-800 font-bold mb-1">
                    From: {item.donorOrg}
                  </div>
                  
                  {/* Donor Stream & KYC indicator */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {item.donorType === 'individual' ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                        💒 {item.eventType || 'Event'} (Govt ID Verified)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-extrabold">
                        🏢 FSSAI Licensed Commercial
                      </span>
                    )}

                    {(item.imageUrl || item.foodPhotoUrl) && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                        📸 Photo Attached
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mb-2">
                    {item.quantity} · ~{item.estimatedMeals} meals · {item.specialStorage}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.notes}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                  <div className="text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.expiryTime || item.pickupWindow}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.pickupAddress}</span>
                  </div>

                  <button
                    onClick={() => handleAccept(item.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept &amp; Inspect On-Site</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
