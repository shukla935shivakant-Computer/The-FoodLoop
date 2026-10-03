import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { FoodLoopLogo } from './FoodLoopLogo';
import {
  Heart,
  ShieldCheck,
  MapPin,
  Truck,
  Leaf,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Globe2,
  HelpCircle,
  FileCheck,
  Scale,
  Thermometer,
  Layers,
  Database,
  Navigation,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveTab, impactMetrics, runHackathonDemoFlow, demoRunning, t } = useFoodLoop();
  const [activeSubTab, setActiveSubTab] = useState<'mission' | 'how_it_works' | 'tech' | 'safety' | 'impact'>('mission');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-white via-amber-50/50 to-emerald-50/40 rounded-3xl border-2 border-amber-200/80 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 text-center md:text-left">
          <FoodLoopLogo size={120} className="shrink-0 drop-shadow-xl hover:scale-105 transition-transform" />
          
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t('About FoodLoop')} · {t('Zero Food Waste Mission')}</span>
            </div>

            <h1 className="font-brand-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              FoodLoop<span className="text-amber-500 font-black">.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 font-medium max-w-2xl leading-relaxed">
              FoodLoop is an intelligent surplus food recovery and redistribution network connecting commercial food donors—bakeries, restaurants, supermarkets, and event caterers—with verified local shelters, soup kitchens, and charities in real-time using OpenStreetMap technology.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playPop(520);
                  setActiveTab('create_donation');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 transition-all flex items-center gap-2"
              >
                <span>{t('donateFood')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop(500);
                  setActiveTab('map');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('surplusMap')}</span>
              </button>

              <button
                onClick={runHackathonDemoFlow}
                disabled={demoRunning}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-amber-300 shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('1-Click Demo Tour')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Details */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-amber-200">
        {[
          { id: 'mission', label: t('Our Mission') || 'Our Mission', icon: Heart },
          { id: 'how_it_works', label: t('How It Works') || 'How It Works', icon: Truck },
          { id: 'tech', label: t('Core Technology') || 'Technology & OSM', icon: Navigation },
          { id: 'safety', label: t('Food Safety & Trust') || 'Safety & Standards', icon: ShieldCheck },
          { id: 'impact', label: t('Key Statistics') || 'Impact & ESG', icon: Scale },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveSubTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                  : 'bg-white hover:bg-amber-50 text-slate-700 border border-amber-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OUR MISSION & CLOSED LOOP PARADIGM */}
      {activeSubTab === 'mission' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                🌍
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand-heading">
                The Global Challenge
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Globally, over <strong>1.3 billion metric tons</strong> of food is wasted every year, generating 8-10% of global greenhouse gas emissions. Simultaneously, millions in urban centers lack reliable access to warm, nutritious meals. Much of this waste occurs not because food has spoiled, but because logistically connecting same-day surplus with verified receivers was too fragmented, slow, and unverified.
              </p>
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-medium text-amber-950">
                💡 <em>"Food waste is not a production problem; it is a hyper-local coordination challenge."</em>
              </div>
            </div>

            <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                🔄
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand-heading">
                The FoodLoop Solution: Closed-Loop Food Recovery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                FoodLoop implements a <strong>"Donor to Consumer"</strong> circular loop that treats surplus edible food as a vital community asset. By utilizing OpenStreetMap Nominatim geocoding, OSRM turn-by-turn routing, and dual-verification QR code passes, we ensure surplus food is collected and served within <strong>45 to 90 minutes</strong> of listing.
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-medium text-emerald-950">
                ✅ <strong>Zero Landfill Goal:</strong> 100% of edible commercial surplus redistributed with auditable ESG reporting.
              </div>
            </div>
          </div>

          {/* Three Core Guiding Principles */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-brand-heading text-center">
              Our 3 Core Guiding Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-3xl">⏱️</div>
                <div className="font-extrabold text-slate-900 text-sm">Hyper-Speed Redistribution</div>
                <p className="text-xs text-slate-600">
                  Cooked meals are matched and dispatched immediately to avoid food entering the temperature danger zone.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-3xl">🛡️</div>
                <div className="font-extrabold text-slate-900 text-sm">Uncompromising Safety &amp; Trust</div>
                <p className="text-xs text-slate-600">
                  FSSAI/FDA food safety standards, sealed packaging requirements, and cryptographic chain-of-custody passes.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-3xl">📊</div>
                <div className="font-extrabold text-slate-900 text-sm">Auditable ESG Impact</div>
                <p className="text-xs text-slate-600">
                  Every gram of food saved automatically calculates greenhouse gas emissions averted and meals provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOW IT WORKS STEP-BY-STEP */}
      {activeSubTab === 'how_it_works' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand-heading">
              How the FoodLoop Workflow Functions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A transparent, 4-step workflow connecting commercial kitchens and verified receivers in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 space-y-3 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Donor Posts Surplus</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restaurants, bakeries, or supermarkets list quantity, food type (cooked, dairy, produce), storage guidelines, and pickup window. GPS location is pinned using OpenStreetMap.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                📍 OSM Verified Address
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl border-2 border-emerald-200/80 p-5 space-y-3 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Smart Receiver Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our algorithm scores nearby verified shelters and NGOs based on road distance, dietary alignment, dietary preferences, and current beneficiary counts.
              </p>
              <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg">
                🤝 98% Optimal Match Score
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl border-2 border-indigo-200/80 p-5 space-y-3 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">OSM Route &amp; Pickup Pass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The volunteer courier receives real-time OSRM turn-by-turn driving directions. A unique QR Pickup Pass is generated for tamper-proof verification at donor handover.
              </p>
              <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg">
                🚚 Turn-by-Turn OSRM Navigation
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl border-2 border-teal-200/80 p-5 space-y-3 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Delivery &amp; Verified Impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The receiver scans the pass upon delivery. Beneficiaries receive hot, fresh meals. Impact metrics (CO2e saved, meals provided) immediately update on the public ESG dashboard.
              </p>
              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg">
                🌱 Instant ESG Carbon Credit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPENSTREETMAP & CORE TECHNOLOGY */}
      {activeSubTab === 'tech' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                🗺️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand-heading">
                  Powered by OpenStreetMap (OSM) Platform
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Open geospatial mapping infrastructure delivering open-source geocoding, routing, and live surplus visualization.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-emerald-800 text-sm flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>OSM Nominatim Search</span>
                </div>
                <p className="text-xs text-slate-600">
                  Real-time address autocomplete and forward geocoding across Indian cities and international locations with rate-limited server caching.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-emerald-800 text-sm flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>OSRM Road Routing</span>
                </div>
                <p className="text-xs text-slate-600">
                  Real street network routing (Open Source Routing Machine) drawing accurate vehicle delivery paths rather than straight lines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-emerald-800 text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Leaflet 1.9 Cartography</span>
                </div>
                <p className="text-xs text-slate-600">
                  Custom hardware-accelerated tile layers: OpenStreetMap Standard tiles, CartoDB Voyager, and high-resolution Esri satellite imagery.
                </p>
              </div>
            </div>
          </div>

          {/* Multilingual Support */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                🌐
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-brand-heading">
                  13-Language Multilingual Engine
                </h3>
                <p className="text-xs text-slate-600">
                  Full localization supporting English, हिन्दी, বাংলা, मराठी, తెలుగు, தமிழ், ગુજરાતી, اردو, ಕನ್ನಡ, മലയാളം, ଓଡ଼ିଆ, ਪੰਜਾਬੀ, and অসমীয়া.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAFETY, QUALITY & COMPLIANCE */}
      {activeSubTab === 'safety' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand-heading">
                  Food Safety, Quality Verification &amp; Trust Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Dual-tier donor verification, automated event shelf-life guardrails, and volunteer on-site sensory inspection before OTP handoff.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Point 1: Dual Donor Stream */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Dual Donor Streams: Commercial FSSAI vs. Event KYC</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Commercial entities verify via official 14-digit FSSAI licenses. Private event donors (weddings, banquets, home donors) are verified through Government Photo ID (Aadhaar, Driving License, Voter ID) KYC encryption.
                </p>
              </div>

              {/* Point 2: Automated 3-4 Hour Event Shelf-Life Rule */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Automated 3–4 Hour Event Shelf-Life Engine</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  For unrefrigerated cooked food from weddings and parties, the platform automatically locks maximum shelf-life to 3.5 hours from the Exact Event End Time, averting bacterial incubation in ambient danger zones.
                </p>
              </div>

              {/* Point 3: Mandatory 4-Point Donor Hygiene & Photo Proof */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <div className="font-extrabold text-indigo-950 text-sm flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-700" />
                  <span>4-Point Hygiene Checklist &amp; Container Photo Upload</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Individual donors must digitally certify clean prep environments, covered post-event storage, sensory fresh odor, and temperature maintenance alongside real-time photo proof of food containers.
                </p>
              </div>

              {/* Point 4: Volunteer On-Site 3-Step Sensory Inspection & OTP Gate */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="font-extrabold text-rose-950 text-sm flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-rose-700" />
                  <span>On-Site Sensory Inspection &amp; OTP Handover Gate</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Before accepting batches, NGO volunteers complete a 3-step check: Visual (clean/covered), Smell (no sour/foul odor), and Temperature (&gt;60°C or chilled). The Pickup OTP is generated only after passing inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDITABLE ESG IMPACT & METRICS */}
      {activeSubTab === 'impact' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl border-2 border-emerald-200 p-5 text-center shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-brand-heading">
                {(impactMetrics.totalKgRescued / 1000).toFixed(1)}k kg
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Food Rescued</div>
              <p className="text-[11px] text-slate-400">Diverted from municipal landfills</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-teal-200 p-5 text-center shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-teal-600 font-brand-heading">
                {(impactMetrics.totalMealsRedistributed).toLocaleString()}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Meals Provided</div>
              <p className="text-[11px] text-slate-400">To children &amp; vulnerable families</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 text-center shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 font-brand-heading">
                {(impactMetrics.totalCo2eSavedKg / 1000).toFixed(1)}t
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">CO₂e Averted</div>
              <p className="text-[11px] text-slate-400">Methane &amp; carbon reduction</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-indigo-200 p-5 text-center shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-brand-heading">
                {(impactMetrics.totalWaterSavedLiters / 1000).toFixed(0)}k L
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Water Conserved</div>
              <p className="text-[11px] text-slate-400">Virtual water embedded in food</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 space-y-4 shadow-sm text-center">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-brand-heading">
              Ready to Join the Movement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Whether you are a food business looking to eliminate edible surplus or a certified non-profit seeking fresh provisions, FoodLoop is free, verified, and community-driven.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('create_donation')}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200"
              >
                Donate Surplus Food
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Register Organization &amp; Badges
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
