/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FoodLoopProvider, useFoodLoop } from './context/FoodLoopContext';
import { VerticalSidebar } from './components/VerticalSidebar';
import { HeroLanding } from './components/HeroLanding';
import { FoodMap } from './components/FoodMap';
import { CreateDonationView } from './components/CreateDonationView';
import { MatchingView } from './components/MatchingView';
import { PickupTrackingView } from './components/PickupTrackingView';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AiAssistantView } from './components/AiAssistantView';
import { AdminDashboard } from './components/AdminDashboard';
import { DonorDashboard } from './components/DonorDashboard';
import { ReceiverDashboard } from './components/ReceiverDashboard';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { Sparkles, Menu, Globe2 } from 'lucide-react';
import { sound } from './utils/sound';
import { SUPPORTED_LANGUAGES } from './utils/translations';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    demoRunning,
    demoMessage,
    demoStep,
    language,
    t,
  } = useFoodLoop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  return (
    <div className="min-h-screen flex bg-amber-50/40 text-slate-800">
      {/* Backdrop for Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* ALL OPTIONS DISPLAYED VERTICALLY ON THE LEFT SIDE OF THE SCREEN */}
      <VerticalSidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Right Column: Main Content & Header */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        
        {/* Top Header for Mobile & Quick Status Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Mobile Options Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playPop(500);
                setMobileMenuOpen(true);
              }}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 font-bold text-xs shadow-xs"
              title="Open Options on Left"
            >
              <Menu className="w-4 h-4 text-emerald-700" />
              <span>{t('All Options')}</span>
            </button>

            {/* Breadcrumb / Active Screen title */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="hidden sm:inline font-bold text-slate-400">FoodLoop</span>
              <span className="hidden sm:inline text-slate-300">/</span>
              <span className="font-extrabold text-slate-900 capitalize">
                {t(activeTab) || activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active Preferred Language Indicator */}
            <button
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-colors"
              title="Change Language"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLangObj?.flag} {currentLangObj?.nativeName || 'Language'}</span>
            </button>

            {/* Browsing Account Pill */}
            {currentUser && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                <span>{currentUser.avatarEmoji}</span>
                <span className="hidden sm:inline truncate max-w-[120px] font-bold text-slate-800">
                  {currentUser.organizationName}
                </span>
                <span className="text-[10px] text-slate-500 capitalize">({currentUser.role})</span>
              </div>
            )}
          </div>
        </header>

        {/* Floating Demo Status Card during 1-Click Hackathon Tour */}
        {demoRunning && (
          <div className="sticky top-14 z-20 max-w-xl mx-auto w-full px-4 my-2 animate-in slide-in-from-top-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border-2 border-amber-400 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xs animate-spin">
                  ⚡
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-amber-400 uppercase tracking-wider">
                    Live Demo Step {demoStep} of 6
                  </div>
                  <div className="font-medium text-slate-200">{demoMessage}</div>
                </div>
              </div>
              <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${(demoStep / 6) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* View Routers */}
        <main className="flex-1">
          {activeTab === 'landing' && <HeroLanding />}
          {activeTab === 'map' && <FoodMap />}
          {activeTab === 'create_donation' && <CreateDonationView />}
          {activeTab === 'matching' && <MatchingView />}
          {activeTab === 'pickups' && <PickupTrackingView />}
          {activeTab === 'impact' && <ImpactDashboard />}
          {activeTab === 'ai_assistant' && <AiAssistantView />}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'donor_dashboard' && <DonorDashboard />}
          {activeTab === 'receiver_dashboard' && <ReceiverDashboard />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'about' && <AboutView />}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FoodLoopProvider>
      <MainContent />
    </FoodLoopProvider>
  );
}
