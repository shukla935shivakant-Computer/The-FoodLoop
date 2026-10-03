import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { Pickup, Donation } from '../types';
import {
  Truck,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Phone,
  Building,
  UserCheck,
  Check,
  Sparkles,
  Camera,
  AlertTriangle,
  Lock,
  Unlock,
  Eye,
  Thermometer,
  Wind,
  Layers,
} from 'lucide-react';

export const PickupTrackingView: React.FC = () => {
  const {
    pickups,
    donations,
    updatePickupStatus,
    confirmPickup,
    recordInspectionAndVerifyOtp,
    currentUser,
    setActiveTab,
    t,
  } = useFoodLoop();

  const [selectedPickupId, setSelectedPickupId] = useState<string>('');
  const [showScannerModal, setShowScannerModal] = useState(false);

  // Volunteer Inspection Checkpoints state per pickup
  const [inspectionState, setInspectionState] = useState<{
    [pickupId: string]: {
      visualCleanCovered: boolean;
      smellFreshNoOdor: boolean;
      tempHotOrCold: boolean;
    };
  }>({});

  const selectedPickup =
    (pickups || []).find((p) => p && p.id === selectedPickupId) ||
    (pickups || [])[0] ||
    null;

  const relatedDonation = selectedPickup
    ? (donations || []).find((d) => d && d.id === selectedPickup.donationId) || null
    : null;

  // Current inspection checks for selected pickup
  const currentChecks = (selectedPickup?.id && inspectionState[selectedPickup.id]) || {
    visualCleanCovered: selectedPickup?.inspectionPassed || false,
    smellFreshNoOdor: selectedPickup?.inspectionPassed || false,
    tempHotOrCold: selectedPickup?.inspectionPassed || false,
  };

  const all3Checked =
    currentChecks.visualCleanCovered &&
    currentChecks.smellFreshNoOdor &&
    currentChecks.tempHotOrCold;

  const isOtpUnlocked =
    selectedPickup?.inspectionPassed ||
    selectedPickup?.status === 'in_transit' ||
    selectedPickup?.status === 'collected';

  const handleToggleCheck = (field: 'visualCleanCovered' | 'smellFreshNoOdor' | 'tempHotOrCold') => {
    if (!selectedPickup?.id || isOtpUnlocked) return;
    sound.playPop(520);
    setInspectionState((prev) => ({
      ...prev,
      [selectedPickup.id]: {
        ...currentChecks,
        [field]: !currentChecks[field],
      },
    }));
  };

  const handleApproveInspectionAndGenerateOtp = () => {
    if (!selectedPickup?.id) return;
    if (!all3Checked) {
      sound.playPop(350);
      return;
    }

    recordInspectionAndVerifyOtp(selectedPickup.id, currentChecks);
  };

  // Simple, deterministic pseudo QR SVG generator matrix for realistic QR display
  const generateQrMatrix = (code?: string) => {
    const safeCode = code || 'FL-8942';
    const hash = safeCode
      .split('')
      .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 7);
    const size = 15;
    const matrix: boolean[][] = [];

    for (let r = 0; r < size; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < size; c++) {
        // Corner squares (standard QR finder patterns)
        const isCorner =
          (r < 4 && c < 4) ||
          (r < 4 && c >= size - 4) ||
          (r >= size - 4 && c < 4);

        if (isCorner) {
          const isBorder =
            r === 0 ||
            r === 3 ||
            c === 0 ||
            c === 3 ||
            r === size - 1 ||
            r === size - 4 ||
            c === size - 1 ||
            c === size - 4;
          const isCenter =
            (r === 1 && c === 1) ||
            (r === 1 && c === size - 2) ||
            (r === size - 2 && c === 1);
          row.push(isBorder || isCenter);
        } else {
          // Semi-random pattern derived from code hash and coordinate
          const val = (r * c + hash * (r + 1) + c * 7) % 3 === 0;
          row.push(val);
        }
      }
      matrix.push(row);
    }
    return matrix;
  };

  const handleAdvanceStatus = () => {
    if (!selectedPickup || !selectedPickup.id) return;
    if (selectedPickup.status === 'scheduled') {
      sound.playBicycleBell();
      updatePickupStatus(selectedPickup.id, 'in_transit');
    } else if (selectedPickup.status === 'in_transit') {
      sound.playSuccess();
      updatePickupStatus(selectedPickup.id, 'collected');
    }
  };

  const handleSimulatedScan = () => {
    if (!selectedPickup || !selectedPickup.id) return;
    sound.playSuccess();
    updatePickupStatus(selectedPickup.id, 'collected');
    setShowScannerModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">
              🚚
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-heading">
                {t('pickups')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Volunteer On-Site Inspection, OTP Handover &amp; OpenStreetMap Navigation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPop(520);
                setShowScannerModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>{t('Simulate QR Scan')}</span>
            </button>
          </div>
        </div>
      </div>

      {pickups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pickup List Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Active Redistribution Pickups ({pickups.length})
              </h2>
            </div>

            <div className="space-y-3">
              {pickups.map((p) => {
                const isSelected = selectedPickup && selectedPickup.id === p.id;
                const d = (donations || []).find((don) => don && don.id === p.donationId);

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      sound.playPop(500);
                      setSelectedPickupId(p.id);
                    }}
                    className={`p-4 rounded-3xl border-2 transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-slate-800">
                        Pass #{p.pickupCode}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full capitalize ${
                          p.status === 'collected'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'in_transit'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 text-sm truncate">
                      {d?.foodName || p.donorName}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[150px]">
                          {d?.pickupAddress || 'Downtown'}
                        </span>
                      </div>
                      <span className="font-bold text-emerald-700">
                        ETA {p.etaMinutes}m
                      </span>
                    </div>

                    {/* Donor Type Badge */}
                    <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                      {d?.donorType === 'individual' ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 font-bold">
                          💒 Wedding / Event Donor
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">
                          🏢 Commercial Entity (FSSAI)
                        </span>
                      )}

                      {p.inspectionPassed && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-extrabold">
                          ✓ Inspection Passed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Pickup Card */}
          {selectedPickup && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 space-y-6 shadow-sm">
                
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand-heading">
                        Rescue Pass #{selectedPickup.pickupCode}
                      </h2>
                      <span
                        className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                          selectedPickup.status === 'collected'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedPickup.status === 'in_transit'
                            ? 'bg-amber-100 text-amber-900 animate-pulse'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {selectedPickup.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Donor: <strong className="text-slate-800">{selectedPickup.donorName}</strong> ➔ Receiver:{' '}
                      <strong className="text-slate-800">{selectedPickup.receiverName}</strong>
                    </p>
                  </div>

                  {/* Advance Status Button if authorized */}
                  {selectedPickup.status !== 'collected' && (
                    <button
                      onClick={handleAdvanceStatus}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
                    >
                      {selectedPickup.status === 'scheduled'
                        ? 'Simulate Driver En Route'
                        : 'Mark Delivery Completed'}
                    </button>
                  )}
                </div>

                {/* Progress Timeline Stepper */}
                <div className="relative py-2">
                  <div className="grid grid-cols-3 gap-2 text-center relative z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-xs mb-1">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-slate-800">1. Matched</span>
                      <span className="text-[10px] text-slate-400">Accepted by NGO</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs mb-1 ${
                          selectedPickup.status === 'in_transit' || selectedPickup.status === 'collected'
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        🚚
                      </div>
                      <span className="text-xs font-bold text-slate-800">2. In Transit</span>
                      <span className="text-[10px] text-slate-400">Inspected &amp; Dispatched</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs mb-1 ${
                          selectedPickup.status === 'collected'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        ⭐
                      </div>
                      <span className="text-xs font-bold text-slate-800">3. Collected</span>
                      <span className="text-[10px] text-slate-400">Delivered to shelter</span>
                    </div>
                  </div>
                </div>

                {/* ON-SITE QUALITY & SENSORY INSPECTION (Mandatory before OTP Verification) */}
                <div className="bg-slate-50 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-sm">
                        🛡️
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">
                          Volunteer On-Site Physical Quality &amp; Sensory Check
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Inspect food condition upon arrival before generating or unlocking the handover OTP.
                        </p>
                      </div>
                    </div>

                    {isOtpUnlocked ? (
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 self-start sm:self-auto">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inspection Passed</span>
                      </span>
                    ) : (
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1 self-start sm:self-auto">
                        <Lock className="w-3.5 h-3.5" />
                        <span>OTP Locked</span>
                      </span>
                    )}
                  </div>

                  {/* 3 Sensory & Visual Checkpoints */}
                  <div className="grid grid-cols-1 gap-3">
                    {/* Checkpoint 1 */}
                    <div
                      onClick={() => handleToggleCheck('visualCleanCovered')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        currentChecks.visualCleanCovered
                          ? 'bg-emerald-50/80 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={currentChecks.visualCleanCovered}
                        disabled={isOtpUnlocked}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="text-xs space-y-0.5">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-emerald-700" />
                          <span>1. Visual Check: Food packaging is clean, covered, and unexposed to dust/insects.</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Confirm seals are intact and containers were shielded from external contaminants.
                        </p>
                      </div>
                    </div>

                    {/* Checkpoint 2 */}
                    <div
                      onClick={() => handleToggleCheck('smellFreshNoOdor')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        currentChecks.smellFreshNoOdor
                          ? 'bg-emerald-50/80 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={currentChecks.smellFreshNoOdor}
                        disabled={isOtpUnlocked}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="text-xs space-y-0.5">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-amber-700" />
                          <span>2. Smell Check: No foul, sour, or rancid odor detected.</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Sensory odor test confirms food freshness and absence of early-stage microbial breakdown.
                        </p>
                      </div>
                    </div>

                    {/* Checkpoint 3 */}
                    <div
                      onClick={() => handleToggleCheck('tempHotOrCold')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        currentChecks.tempHotOrCold
                          ? 'bg-emerald-50/80 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={currentChecks.tempHotOrCold}
                        disabled={isOtpUnlocked}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="text-xs space-y-0.5">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          <Thermometer className="w-3.5 h-3.5 text-rose-700" />
                          <span>3. Temperature Check: Food is hot (above 60°C) OR cold/refrigerated.</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Avoid the bacterial danger zone (5°C to 60°C) for extended durations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Digital Disclaimer once all 3 boxes are checked */}
                  {all3Checked && (
                    <div className="p-3.5 bg-emerald-100 border-2 border-emerald-500 rounded-2xl text-emerald-950 font-extrabold text-xs flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>Physical inspection passed. Proceeding with safe handoff.</span>
                    </div>
                  )}

                  {/* Action button to unlock OTP if not yet unlocked */}
                  {!isOtpUnlocked && (
                    <button
                      type="button"
                      onClick={handleApproveInspectionAndGenerateOtp}
                      disabled={!all3Checked}
                      className={`w-full py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-xs ${
                        all3Checked
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-200 hover:scale-[1.01]'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Unlock className="w-4 h-4" />
                      <span>
                        {all3Checked
                          ? 'Generate Pickup OTP & Shift to In-Transit'
                          : 'Complete All 3 Checks to Unlock Handover OTP'}
                      </span>
                    </button>
                  )}
                </div>

                {/* QR Code and Handover OTP Card Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Digital QR Pass Box (Unlocked only after inspection) */}
                  <div
                    className={`rounded-3xl border-2 p-6 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden ${
                      isOtpUnlocked
                        ? 'bg-amber-50/70 border-dashed border-amber-300'
                        : 'bg-slate-100 border-slate-300 opacity-90'
                    }`}
                  >
                    {isOtpUnlocked ? (
                      <>
                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-amber-200">
                          <svg width="140" height="140" viewBox="0 0 15 15" className="shape-rendering-crispEdges">
                            {generateQrMatrix(selectedPickup.pickupCode).map((row, r) =>
                              row.map((active, c) => (
                                <rect
                                  key={`${r}-${c}`}
                                  x={c}
                                  y={r}
                                  width="1"
                                  height="1"
                                  fill={active ? '#0f172a' : '#ffffff'}
                                />
                              ))
                            )}
                          </svg>
                        </div>

                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                            Verified Pickup OTP
                          </div>
                          <div className="font-mono text-xl font-black text-slate-900 tracking-wider">
                            {selectedPickup.pickupCode}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Donor verifies this code upon loading
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="py-8 px-4 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xl mx-auto">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-extrabold text-slate-800 text-sm">
                            Handover OTP &amp; QR Pass Locked
                          </div>
                          <p className="text-xs text-slate-500 max-w-xs">
                            Complete the 3-step physical inspection checklist above to verify food safety and reveal the pickup authorization code.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pickup Instructions, Donor KYC & Rescue Summary */}
                  <div className="space-y-3 text-xs">
                    
                    {/* Donor Type & Verification Badge */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 block text-[11px] font-bold">DONOR KYC &amp; VERIFICATION</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Audited Stream
                        </span>
                      </div>
                      
                      {relatedDonation?.donorType === 'individual' ? (
                        <div className="space-y-1">
                          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>💍 Event Donor: {relatedDonation?.eventType || 'Private Event'}</span>
                          </div>
                          <div className="text-slate-600 text-[11px]">
                            Govt Photo ID: <span className="font-mono font-bold text-slate-800">{relatedDonation?.governmentIdType || 'Aadhaar'} ({relatedDonation?.governmentIdNumber || 'Verified'})</span>
                          </div>
                          <div className="text-amber-800 font-bold text-[11px]">
                            Event Finished: {relatedDonation?.eventEndTime || 'Evening'} (Max shelf life: 3.5 hrs)
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>🏢 Commercial Kitchen: {relatedDonation?.donorOrg || selectedPickup.donorName}</span>
                          </div>
                          <div className="text-emerald-800 text-[11px] font-bold">
                            FSSAI License: <span className="font-mono">{relatedDonation?.fssaiLicense || '10020042001892'}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-400 block text-[11px] font-bold">PICKUP ADDRESS</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{relatedDonation?.pickupAddress || '428 Blossom Street, Downtown'}</span>
                      </div>
                      <p className="text-slate-500 pt-1">
                        Instructions: {relatedDonation?.pickupLocation || 'Service Gate 2, Ring Bell'}
                      </p>
                    </div>

                    {/* Two-Way Confirmation Box */}
                    <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-2">
                      <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                        <span>Two-Way Safe Handover Confirmation:</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectedPickup?.id && confirmPickup(selectedPickup.id, 'donor')}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-colors flex items-center justify-center gap-1 ${
                            selectedPickup.donorConfirmed
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-emerald-50'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>Donor Handover: {selectedPickup.donorConfirmed ? 'Signed' : 'Sign'}</span>
                        </button>

                        <button
                          onClick={() => selectedPickup?.id && confirmPickup(selectedPickup.id, 'receiver')}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-colors flex items-center justify-center gap-1 ${
                            selectedPickup.receiverConfirmed
                              ? 'bg-teal-100 text-teal-800 border-teal-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-teal-50'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>Receiver Receipt: {selectedPickup.receiverConfirmed ? 'Signed' : 'Sign'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mx-auto">
            🚚
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Active Pickups Scheduled</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse available surplus food on the OpenStreetMap view and accept batches to schedule live pickups.
          </p>
        </div>
      )}

      {/* Simulated QR Camera Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 animate-in zoom-in-95">
            <h3 className="font-extrabold text-slate-900 text-base">
              Simulate Mobile Scanner Verification
            </h3>
            <p className="text-xs text-slate-600">
              In real deployment, NGO drivers use phone camera to scan donor's physical or digital QR pass.
            </p>
            <div className="w-48 h-48 mx-auto border-4 border-dashed border-amber-400 rounded-3xl flex items-center justify-center bg-slate-900 text-amber-400 text-3xl">
              📷
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowScannerModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulatedScan}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700"
              >
                Confirm Scan Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
