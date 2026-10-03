import React from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Heart,
  ArrowRight,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { currentUser, donations, pickups, setActiveTab } = useFoodLoop();

  const myDonations = (donations || []).filter((d) => d && currentUser?.id && d.donorId === currentUser.id);
  const myPickups = (pickups || []).filter((p) => p && currentUser?.id && p.donorId === currentUser.id);

  const activeDonations = myDonations.filter((d) => d.status === 'available');
  const inProgressDonations = myDonations.filter((d) => d.status === 'accepted' || d.status === 'in_transit');
  const completedDonations = myDonations.filter((d) => d.status === 'collected');

  const myRescuedMeals = myDonations.reduce((sum, d) => sum + (d?.estimatedMeals || 0), 0);
  const myCo2Saved = myDonations.reduce((sum, d) => sum + (d?.estimatedCo2eKg || 0), 0);

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 p-1 rounded-3xl shadow-sm">
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
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {currentUser.verificationBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {currentUser.name} · {currentUser.address}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playDonationCreated();
              setActiveTab('create_donation');
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Donate Surplus Food</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
            Surplus Meals Shared
          </span>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {myRescuedMeals} meals
          </div>
          <span className="text-xs text-slate-500">Across {myDonations.length} donation batches</span>
        </div>

        <div className="bg-white rounded-3xl border-2 border-teal-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider">
            CO₂e Emissions Saved
          </span>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            +{myCo2Saved.toFixed(1)} kg
          </div>
          <span className="text-xs text-slate-500">Redirected from landfill waste</span>
        </div>

        <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
            Active Scheduled Pickups
          </span>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {inProgressDonations.length} batches
          </div>
          <span className="text-xs text-slate-500">En route with verified couriers</span>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">
            My Surplus Listings & History
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {myDonations.length} total postings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {myDonations.map((item) => {
            if (!item || !item.id) return null;
            return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                    {item.imageEmoji}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                      item.status === 'collected'
                        ? 'bg-purple-100 text-purple-800'
                        : item.status === 'accepted'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base">{item.foodName}</h3>
                <div className="text-xs text-emerald-700 font-bold mb-2">
                  {item.quantity} · ~{item.estimatedMeals} meals
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{item.notes}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Storage:</span>
                  <span className="font-bold text-slate-800">{item.specialStorage}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pass Code:</span>
                  <span className="font-mono font-bold text-slate-800">{item.pickupCode}</span>
                </div>

                {item.status === 'available' ? (
                  <button
                    onClick={() => {
                      sound.playMatch();
                      setActiveTab('matching');
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Matches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('pickups');
                    }}
                    className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Delivery</span>
                  </button>
                )}
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
};
