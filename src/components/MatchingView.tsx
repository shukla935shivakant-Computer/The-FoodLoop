import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { Donation } from '../types';
import {
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Building,
  ArrowRight,
  Flame,
  Award,
  Zap,
} from 'lucide-react';

export const MatchingView: React.FC = () => {
  const {
    donations,
    findMatchesForDonation,
    acceptDonation,
    setActiveTab,
    currentUser,
    t,
  } = useFoodLoop();

  const availableDonations = (donations || []).filter((d) => d && d.status === 'available');
  const [selectedDonationId, setSelectedDonationId] = useState<string>('');

  const selectedDonation =
    (donations || []).find((d) => d && d.id === selectedDonationId) ||
    availableDonations[0] ||
    donations?.[0] ||
    null;

  const matches = selectedDonation ? findMatchesForDonation(selectedDonation) : [];

  const handleAcceptMatch = (receiverId: string) => {
    if (!selectedDonation?.id) return;
    sound.playSuccess();
    acceptDonation(selectedDonation.id, receiverId);
    setActiveTab('pickups');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl">
              🤝
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t('smartMatching')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                AI matches surplus food with verified shelters & community kitchens based on location, storage, and urgent need.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{t('availableSurplus')}:</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              {availableDonations.length}
            </span>
          </div>
        </div>
      </div>

      {/* Select Active Surplus to Match */}
      {availableDonations.length > 1 && (
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <span>Select Surplus Donation to Find Receivers:</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {availableDonations.map((d) => {
              if (!d || !d.id) return null;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    sound.playPop(520);
                    setSelectedDonationId(d.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all shrink-0 ${
                    selectedDonation?.id === d.id
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{d.imageEmoji}</span>
                  <span className="truncate max-w-[150px]">{d.foodName}</span>
                  <span className="text-[10px] opacity-80">({d.quantity})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDonation ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Summary Card */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 space-y-5 shadow-xs h-fit">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs">
                {selectedDonation.imageEmoji}
              </div>
              <span
                className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full ${
                  selectedDonation.urgency === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {selectedDonation.urgency === 'critical' ? 'Urgent Pickup' : 'Normal Urgency'}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                {selectedDonation.foodName}
              </h2>
              <div className="text-xs font-bold text-emerald-700 mt-1">
                Donated by {selectedDonation.donorOrg}
              </div>
            </div>

            <div className="bg-amber-50/60 rounded-2xl p-4 space-y-2 text-xs border border-amber-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Available Quantity:</span>
                <span className="font-extrabold text-slate-900">{selectedDonation.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Portions:</span>
                <span className="font-extrabold text-slate-900">~{selectedDonation.estimatedMeals} meals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Storage Required:</span>
                <span className="font-bold text-amber-900">{selectedDonation.specialStorage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Window:</span>
                <span className="font-bold text-slate-800">{selectedDonation.pickupWindow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Address:</span>
                <span className="font-medium text-slate-700 truncate max-w-[160px]">
                  {selectedDonation.pickupAddress}
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Matching Criteria Applied</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Prioritizes receivers with verified status, certified cold-chain refrigeration, immediate consumption need, and shortest travel distance.
              </p>
            </div>
          </div>

          {/* Recommended Receivers List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <span>Top Recommended Nearby Receivers</span>
                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  {matches.length} matches found
                </span>
              </h3>
            </div>

            <div className="space-y-4">
              {matches.map((match, idx) => {
                const rcv = match?.receiver;
                if (!rcv || !rcv.id) return null;
                return (
                  <div
                    key={rcv.id}
                    className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl ${rcv.avatarBg}`}>
                          {rcv.avatarEmoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-slate-900 text-base">
                              {rcv.organizationName}
                            </h4>
                            {idx === 0 && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Best Match
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                            <span className="capitalize font-bold text-slate-700">{rcv.subtype}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-emerald-700 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {rcv.verificationBadge}
                            </span>
                            <span>·</span>
                            <span className="text-amber-600 font-bold">⭐ {rcv.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Match Score Badge */}
                      <div className="text-right sm:self-center">
                        <div className="text-2xl font-black text-emerald-600 font-display tabular-nums">
                          {match.matchScore}%
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Match Score
                        </div>
                      </div>
                    </div>

                    {/* Criteria and Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-2xl text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Distance</span>
                        <span className="font-extrabold text-slate-900 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {match.distanceKm} km away
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Est. Travel</span>
                        <span className="font-extrabold text-slate-900 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          ~{match.estimatedTravelMinutes} mins
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Capacity</span>
                        <span className="font-extrabold text-slate-900">
                          {rcv.capacityMeals} meals/day
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Storage</span>
                        <span className="font-extrabold text-emerald-700">
                          {rcv.hasRefrigeration ? 'Refrigerated ✓' : 'Ambient ✓'}
                        </span>
                      </div>
                    </div>

                    {/* Recommendation Reason */}
                    <p className="text-xs text-slate-600 leading-relaxed italic bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                      “{match.recommendationReason}”
                    </p>

                    {/* Action Button */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {match.criteriaPassed.map((crit, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {crit}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleAcceptMatch(rcv.id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span>{t('Accept & Generate QR')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-12 text-center space-y-4">
          <div className="text-4xl">🌱</div>
          <h3 className="font-extrabold text-slate-800 text-lg">No Surplus Awaiting Matching</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All surplus donations have been successfully matched and are currently in pickup or delivered!
          </p>
          <button
            onClick={() => setActiveTab('create_donation')}
            className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs"
          >
            Post New Donation
          </button>
        </div>
      )}
    </div>
  );
};
