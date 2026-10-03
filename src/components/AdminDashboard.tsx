import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  Users,
  BarChart2,
  FileText,
  Search,
  Check,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    donations,
    reports,
    verifyUser,
    resolveReport,
    impactMetrics,
    currentUser,
  } = useFoodLoop();

  const [activeTab, setActiveTab] = useState<'verifications' | 'donations' | 'reports'>('verifications');

  const pendingVerificationUsers = users.filter((u) => !u.isVerified);
  const verifiedUsers = users.filter((u) => u.isVerified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Trust & Verification Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Review organization credentials, audit surplus donations, and resolve community safety flags.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Officer:</span>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold">
              {currentUser.name} (Global Compliance Lead)
            </span>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-amber-200 pb-3">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('verifications');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'verifications'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Organization Verifications ({users.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('donations');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'donations'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Donation Audit ({donations.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('reports');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Community Reports ({reports.length})</span>
        </button>
      </div>

      {/* Tab 1: Organization Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((u) => {
              if (!u || !u.id) return null;
              return (
                <div
                  key={u.id}
                  className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3"
                >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${u.avatarBg}`}>
                      {u.avatarEmoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{u.organizationName}</h4>
                      <div className="text-xs text-slate-500 font-medium">
                        Rep: {u.name} · {u.email}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      u.isVerified
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {u.isVerified ? 'Verified' : 'Under Review'}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1 text-slate-600 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Role & Subtype:</span>
                    <span className="font-bold text-slate-800 capitalize">
                      {u.role} ({u.subtype})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Badge Issued:</span>
                    <span className="font-bold text-emerald-700">{u.verificationBadge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Facility Address:</span>
                    <span className="font-medium truncate max-w-[200px]">{u.address}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {u.isVerified ? (
                    <button
                      onClick={() => verifyUser(u.id, false)}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Revoke Verification
                    </button>
                  ) : (
                    <button
                      onClick={() => verifyUser(u.id, true)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve NGO / Partner</span>
                    </button>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Donation Monitoring & Fraud Prevention */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donations.map((d) => {
              if (!d || !d.id) return null;
              return (
                <div
                  key={d.id}
                  className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                        {d.imageEmoji}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{d.foodName}</h4>
                        <div className="text-xs text-slate-500 font-medium">
                          Donor: {d.donorOrg} · Pass #{d.pickupCode}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        d.status === 'collected'
                          ? 'bg-purple-100 text-purple-800'
                          : d.status === 'accepted'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">QUANTITY</span>
                      <span className="font-bold text-slate-800">{d.quantity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                      <span className="font-bold text-slate-800 truncate block">{d.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">AI AUDIT</span>
                      <span className="font-extrabold text-emerald-700">97% Safe</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 line-clamp-1">
                    Storage: {d.specialStorage} · {d.pickupWindow}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Reports Management */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {reports.map((rep) => {
              if (!rep || !rep.id) return null;
              return (
                <div
                  key={rep.id}
                  className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3"
                >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        Incident: {rep.reportedTitle}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          rep.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rep.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Reported by {rep.reporterName} on {new Date(rep.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 bg-amber-50 p-3 rounded-2xl border border-amber-100">
                  Reason: “{rep.reason}”
                </p>

                <div className="flex gap-2 justify-end">
                  {rep.status !== 'resolved' && (
                    <button
                      onClick={() => resolveReport(rep.id, 'resolved')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                    >
                      Resolve & Clear
                    </button>
                  )}
                  {rep.status !== 'dismissed' && (
                    <button
                      onClick={() => resolveReport(rep.id, 'dismissed')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
