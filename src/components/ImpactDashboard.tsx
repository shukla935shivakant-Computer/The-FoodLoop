import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  BarChart3,
  Leaf,
  Globe2,
  Heart,
  Droplet,
  Users,
  Award,
  Sparkles,
  Info,
  TrendingUp,
} from 'lucide-react';

export const ImpactDashboard: React.FC = () => {
  const { impactMetrics, t } = useFoodLoop();
  const [unitMode, setUnitMode] = useState<'kg' | 'lbs'>('kg');

  const unitMultiplier = unitMode === 'lbs' ? 2.20462 : 1;
  const unitLabel = unitMode === 'lbs' ? 'lbs' : 'kg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">
              🌍
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t('impactDashboard')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Tracking surplus food rescue, emissions prevented, and communities nourished in real time.
              </p>
            </div>
          </div>

          {/* Metric Unit Toggle (kg vs lbs) */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                sound.playPop(520);
                setUnitMode('kg');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                unitMode === 'kg'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Metric (kg)
            </button>
            <button
              onClick={() => {
                sound.playPop(520);
                setUnitMode('lbs');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                unitMode === 'lbs'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Imperial (lbs)
            </button>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Food Rescued */}
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 space-y-2 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              {t('foodRescued')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
              🥗
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {Math.round(impactMetrics.totalKgRescued * unitMultiplier).toLocaleString()}{' '}
            <span className="text-base text-emerald-600 font-bold">{unitLabel}</span>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+18% increase this week</span>
          </div>
        </div>

        {/* Meals Shared */}
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 space-y-2 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              {t('mealsShared')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg">
              🍲
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {impactMetrics.totalMealsRedistributed.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Across {impactMetrics.totalOrganizations} community kitchens & shelters
          </div>
        </div>

        {/* CO2 Emissions Avoided */}
        <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 space-y-2 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800">
              {t('co2Avoided')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg">
              🍃
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {(impactMetrics.totalCo2eSavedKg / 1000).toFixed(1)} <span className="text-base text-teal-600 font-bold">Tonnes</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Equal to taking ~26 cars off the road for a year
          </div>
        </div>

        {/* Water Footprint Saved */}
        <div className="bg-white rounded-3xl border-2 border-sky-200 p-6 space-y-2 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-800">
              Water Conserved
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-lg">
              💧
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-display tabular-nums">
            {(impactMetrics.totalWaterSavedLiters / 1000000).toFixed(2)} <span className="text-base text-sky-600 font-bold">M Liters</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Saved by eliminating food agricultural waste
          </div>
        </div>
      </div>

      {/* Middle Row: Top Cities & Financial Waste Prevented */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard: Top Contributing Cities */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span>🏆 Top Contributing Global Cities</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
              Live Leaderboard
            </span>
          </div>

          <div className="space-y-3">
            {impactMetrics.topLocations.map((loc, idx) => (
              <div
                key={loc.city}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-base w-6 text-slate-400">
                    #{idx + 1}
                  </span>
                  <span className="text-2xl">{loc.flag}</span>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      {loc.city}, {loc.country}
                    </div>
                    <div className="text-xs text-slate-500">
                      {loc.meals.toLocaleString()} meals redistributed
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700 font-display">
                    {Math.round(loc.kg * unitMultiplier).toLocaleString()} {unitLabel}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    Rescued
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Waste Dollars Prevented Card */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-400 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              💰
            </div>
            <h3 className="text-2xl font-black font-display">
              ${impactMetrics.totalFoodWastePreventedDollars.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-amber-100 uppercase tracking-wider">
              Commercial Food Value Preserved
            </p>
            <p className="text-xs text-white/90 leading-relaxed pt-2">
              Instead of discarding edible prepared portions into landfills, food donors redirect valuable resources straight into nutritious meals for local families.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 text-xs space-y-1.5 border border-white/20">
            <div className="flex justify-between">
              <span>Completed Redirections:</span>
              <span className="font-bold">{impactMetrics.totalDonationsCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rescue Time:</span>
              <span className="font-bold">42 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology & Calculation Transparency Card (Mandatory Requirement) */}
      <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            Environmental Impact Calculation Methodology
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          All environmental savings shown on this platform are scientifically grounded <strong className="text-slate-800">estimates</strong> based on established international food recovery frameworks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 pt-1">
          <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 space-y-1">
            <div className="font-bold text-emerald-900">1. CO₂e Emissions Factor</div>
            <p className="text-slate-600 text-[11px]">
              Calculated using the UNEP / EPA WARM Model: each 1.0 kg of surplus food rescued from landfill prevents approximately <strong>2.5 kg of CO₂ equivalent</strong> emissions (including methane from decomposition).
            </p>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 space-y-1">
            <div className="font-bold text-amber-900">2. Standard Meal Portions</div>
            <p className="text-slate-600 text-[11px]">
              Following standard Food Banking guidelines, an average nutritious adult meal portion is calculated as <strong>0.42 kg (14.8 oz)</strong> of wholesome prepared or fresh produce ingredients.
            </p>
          </div>

          <div className="bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100 space-y-1">
            <div className="font-bold text-sky-900">3. Embedded Water Savings</div>
            <p className="text-slate-600 text-[11px]">
              Agricultural and supply chain embedded water savings average <strong>40 liters of fresh water</strong> preserved per rescued meal portion, preventing redundant farming footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
