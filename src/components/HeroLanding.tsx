import React from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { FoodLoopLogo } from './FoodLoopLogo';
import {
  Sparkles,
  ArrowRight,
  Heart,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Leaf,
  Globe2,
} from 'lucide-react';

export const HeroLanding: React.FC = () => {
  const { setActiveTab, impactMetrics, donations, runHackathonDemoFlow, demoRunning, t } = useFoodLoop();

  const availableDonations = (donations || []).filter((d) => d && d.status === 'available');

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-amber-100/60 via-emerald-50/40 to-transparent rounded-3xl border-2 border-amber-200/60 mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-10 lg:px-14 shadow-sm">
        {/* Playful Floating Bubbles / Elements */}
        <div className="absolute top-4 left-6 text-3xl animate-gentle-bounce select-none pointer-events-none opacity-80">
          🍎
        </div>
        <div className="absolute top-10 right-10 text-4xl animate-wiggle select-none pointer-events-none opacity-80">
          🥖
        </div>
        <div className="absolute bottom-6 left-1/4 text-3xl animate-gentle-bounce select-none pointer-events-none opacity-70">
          🥦
        </div>
        <div className="absolute bottom-8 right-12 text-3xl animate-pulse-subtle select-none pointer-events-none opacity-80">
          🥗
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Friendly Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300 shadow-xs text-xs sm:text-sm font-extrabold text-amber-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-700">{t('Live Global Redistribution')}</span>
            <span className="text-slate-300">·</span>
            <span>{t('Zero Food Waste Mission')}</span>
          </div>

          {/* Primary Professional Brand Heading with Official FoodLoop Logo */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <FoodLoopLogo size={108} className="sm:w-32 sm:h-32 drop-shadow-xl" />
              <div className="text-center sm:text-left">
                <h1 className="font-brand-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-none">
                  <span className="bg-gradient-to-r from-emerald-800 via-teal-800 to-amber-700 bg-clip-text text-transparent">
                    FoodLoop
                  </span>
                  <span className="text-amber-500 font-black">.</span>
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-800">
                  Donor To Consumer · Surplus Food Recovery &amp; Redistribution
                </p>
              </div>
            </div>
          </div>

          {/* Mission Sub-Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight leading-snug">
            {t('saveFood')}
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('subheading')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => {
                sound.playDonationCreated();
                setActiveTab('create_donation');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('donateCta')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                sound.playPop(550);
                setActiveTab('map');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-base shadow-md shadow-amber-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('findFoodCta')}</span>
              <MapPin className="w-5 h-5" />
            </button>

            <button
              onClick={runHackathonDemoFlow}
              disabled={demoRunning}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-amber-300 hover:border-amber-400 shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('demoTour')}</span>
            </button>
          </div>

          {/* Hero Illustrated Banner Box */}
          <div className="pt-6">
            <div className="bg-white/90 backdrop-blur-xs rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-amber-100">
                <div className="p-3 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-display tabular-nums">
                    {(impactMetrics.totalKgRescued / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
                    {t('foodRescued')}
                  </div>
                </div>

                <div className="p-3 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-display tabular-nums">
                    {impactMetrics.totalMealsRedistributed.toLocaleString()}
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
                    {t('mealsShared')}
                  </div>
                </div>

                <div className="p-3 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 font-display tabular-nums">
                    {(impactMetrics.totalCo2eSavedKg / 1000).toFixed(1)}t
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
                    {t('co2Avoided')}
                  </div>
                </div>

                <div className="p-3 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-display tabular-nums">
                    {impactMetrics.totalOrganizations}
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
                    {t('verifiedOrgs')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Available Food Surplus Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🌟 {t('freshWaiting')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('Available right now from local kitchens, bakeries & supermarkets')}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('map')}
            className="text-xs sm:text-sm font-extrabold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>{t('View All on Map')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {availableDonations.filter((item) => item && item.id).slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-amber-200/70 p-5 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-2xl shadow-xs">
                    {item.imageEmoji}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                    {item.urgency === 'critical' ? t('urgentPickup') : t('freshToday')}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base line-clamp-1 mb-1">
                  {item.foodName}
                </h3>
                <div className="text-xs text-emerald-800 font-bold mb-2">
                  {t('Offered by')} {item.donorOrg}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {item.notes}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.pickupWindow}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.pickupAddress}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 bg-amber-50 px-2.5 py-1 rounded-lg">
                  {item.quantity} · ~{item.estimatedMeals} meals
                </span>
                <button
                  onClick={() => {
                    sound.playPop(580);
                    setActiveTab('matching');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  {t('matchAndRescue')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How FoodLoop Works in 4 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('howItWorks')}
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-2">
            {t('Making surplus food rescue as simple, joyful, and safe as ordering takeout.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {t('step1Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Donors specify food category, portions, pickup window, and storage requirements with AI-assisted safety check.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {t('step2Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our intelligent engine pairs the donation with nearby verified shelters, NGOs, or community kitchens based on urgency and capacity.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl font-black">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {t('step3Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receiver accepts, a secure pickup QR pass is generated, and live tracking guides volunteer couriers safely.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-black">
              4
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {t('step4Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Both parties verify handover, food feeds hungry families, and real-time CO₂ / meal impact registers globally!
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive About Section with All Details Maintained */}
      <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-amber-100 pb-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <FoodLoopLogo size={72} className="shrink-0 drop-shadow-md" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{t('About FoodLoop')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand-heading">
                  About FoodLoop: Closed-Loop Food Recovery
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  A real-time hyper-local surplus food redistribution ecosystem connecting commercial kitchens with verified shelters using OpenStreetMap intelligence.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop(520);
                setActiveTab('about');
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 shrink-0 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>{t('About Us')} Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Architectural Pillars with All Maintained Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-lg font-black">
                🔄
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Dual Donor Streams</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supports licensed <strong>commercial kitchens (FSSAI)</strong> and <strong>private event donors (Weddings/Parties with Govt Photo ID)</strong> with mandatory container photo proof.
              </p>
              <div className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                ⚡ FSSAI &amp; Govt ID KYC
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg font-black">
                🗺️
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">OpenStreetMap Tech</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated with <strong>OSM Nominatim</strong> forward/reverse geocoding and <strong>OSRM street routing</strong> for turn-by-turn road paths.
              </p>
              <div className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                📍 Real Street Paths
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-teal-50/60 rounded-2xl p-4 border border-teal-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center text-lg font-black">
                🛡️
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Sensory Inspection &amp; OTP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated <strong>3–4 hr event shelf-life</strong> calculation plus on-site volunteer inspection (Visual, Smell, Temp) before releasing the pickup OTP.
              </p>
              <div className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                🌡️ On-Site Quality Gated
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg font-black">
                📊
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Auditable ESG Impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated calculation of <strong>CO₂e avoided</strong>, virtual water saved, and meals distributed with downloadable compliance reports.
              </p>
              <div className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded">
                🌱 Verified Green Credits
              </div>
            </div>
          </div>

          {/* Key Platform Numbers */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-around gap-4 text-center">
            <div>
              <div className="font-brand-heading font-black text-xl sm:text-2xl text-emerald-600">
                {(impactMetrics.totalKgRescued / 1000).toFixed(1)}k+ kg
              </div>
              <div className="text-[11px] font-bold text-slate-500">Surplus Food Rescued</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div>
              <div className="font-brand-heading font-black text-xl sm:text-2xl text-teal-600">
                {(impactMetrics.totalMealsRedistributed).toLocaleString()}+
              </div>
              <div className="text-[11px] font-bold text-slate-500">Wholesome Meals Served</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div>
              <div className="font-brand-heading font-black text-xl sm:text-2xl text-amber-600">
                {(impactMetrics.totalCo2eSavedKg / 1000).toFixed(1)}t+
              </div>
              <div className="text-[11px] font-bold text-slate-500">CO₂e Emissions Prevented</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div>
              <div className="font-brand-heading font-black text-xl sm:text-2xl text-indigo-600">
                350+
              </div>
              <div className="text-[11px] font-bold text-slate-500">Verified Partner Shelters</div>
            </div>
          </div>

        </div>
      </section>

      {/* Safety & Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>{t('Verified Community Safety')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                {t('Food Safety & Trust Are Our Top Priority')}
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                All recipient organizations are rigorously vetted by our Compliance Board. Donors adhere to food temperature standards, and our AI assistant flags potential handling risks before handoff.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <button
                onClick={() => setActiveTab('admin')}
                className="px-5 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 transition-colors shadow-xs"
              >
                {t('Inspect Trust & Safety Hub')}
              </button>
              <button
                onClick={() => setActiveTab('ai_assistant')}
                className="px-5 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-sm border border-emerald-400 transition-colors"
              >
                {t('Ask Loopie AI Assistant')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
