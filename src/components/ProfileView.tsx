import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Building,
  Heart,
  Flag,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, setActiveTab, t } = useFoodLoop();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!currentUser) return null;

  const compliments = [
    { label: 'Super Punctual', emoji: '⏱️', count: 28 },
    { label: 'Always Fresh', emoji: '🥗', count: 34 },
    { label: 'Community Hero', emoji: '🏆', count: 42 },
    { label: 'Cold-Chain Master', emoji: '❄️', count: 19 },
  ];

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPop(400);
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
      setReportReason('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-18 h-18 rounded-3xl flex items-center justify-center text-4xl shadow-sm ${currentUser.avatarBg}`}>
              {currentUser.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 font-display">
                  {currentUser.organizationName}
                </h1>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentUser.verificationBadge}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Representative: {currentUser.name} · Role: <span className="capitalize font-bold text-slate-800">{currentUser.role} ({currentUser.subtype})</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop(480);
              setShowReportModal(true);
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Flag className="w-3.5 h-3.5 text-rose-500" />
            <span>Report Issue</span>
          </button>
        </div>

        {/* Verification Status Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">EMAIL VERIFIED</span>
              <span className="font-bold text-slate-800">{currentUser.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">PHONE CERTIFIED</span>
              <span className="font-bold text-slate-800">{currentUser.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">HEALTH & SAFETY AUDIT</span>
              <span className="font-bold text-emerald-700">Passed 2026 Inspection</span>
            </div>
          </div>
        </div>

        {/* Community Compliment Badges */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {t('Verification & Trust Badges')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {compliments.map((comp) => (
              <div
                key={comp.label}
                className="bg-white p-3 rounded-2xl border border-amber-200 flex items-center gap-2.5 shadow-2xs"
              >
                <span className="text-2xl">{comp.emoji}</span>
                <div>
                  <div className="font-bold text-xs text-slate-900">{comp.label}</div>
                  <div className="text-[11px] text-amber-700 font-extrabold">
                    +{comp.count} verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 border-2 border-amber-300">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-500" />
              <h3 className="font-extrabold text-slate-900 text-lg">Report Listing or Concern</h3>
            </div>
            <p className="text-xs text-slate-500">
              Our Compliance Board inspects all reports within 15 minutes to guarantee community safety.
            </p>

            {reportSuccess ? (
              <div className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl text-xs font-bold text-center">
                Report logged successfully. Thank you for protecting community health! ✓
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="space-y-4">
                <textarea
                  required
                  rows={3}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Describe food quality issue, temperature deviation, or suspicious behavior..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    {t('Close')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                  >
                    {t('Confirm')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
