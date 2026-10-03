import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { SUPPORTED_LANGUAGES } from '../utils/translations';
import { FoodLoopLogo } from './FoodLoopLogo';
import {
  MapPin,
  HeartHandshake,
  Truck,
  BarChart3,
  Bot,
  ShieldCheck,
  Bell,
  Volume2,
  VolumeX,
  PlusCircle,
  Settings,
  Globe2,
  Home,
  CheckCircle2,
  Sparkles,
  User,
  Building2,
  Award,
  ChevronDown,
  ChevronRight,
  Layers,
  Map as MapIcon,
  X,
  Info,
} from 'lucide-react';

interface VerticalSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const {
    currentUser,
    users,
    setCurrentUserById,
    activeTab,
    setActiveTab,
    isSoundMuted,
    toggleSound,
    notifications,
    markNotificationRead,
    runHackathonDemoFlow,
    demoRunning,
    demoStep,
    demoMessage,
    language,
    setLanguage,
    t,
  } = useFoodLoop();

  const [langSectionOpen, setLangSectionOpen] = useState(true);
  const [roleSectionOpen, setRoleSectionOpen] = useState(true);
  const [notifsOpen, setNotifsOpen] = useState(false);

  const unreadNotifs = (notifications || []).filter((n) => n && !n.isRead);

  // Vertical Navigation Options
  const mainNavOptions = [
    { id: 'landing', label: t('Home') || 'Home', icon: Home },
    { id: 'about', label: t('About Us') || 'About FoodLoop', icon: Info },
    { id: 'map', label: t('surplusMap'), icon: MapPin },
    { id: 'create_donation', label: t('donateFood'), icon: PlusCircle, highlight: true },
    { id: 'matching', label: t('smartMatching'), icon: HeartHandshake },
    { id: 'pickups', label: t('pickups'), icon: Truck },
    { id: 'impact', label: t('impactDashboard'), icon: BarChart3 },
    { id: 'ai_assistant', label: t('aiAssistant'), icon: Bot },
    { id: 'donor_dashboard', label: t('donorPortal') || 'Donor Portal', icon: Building2 },
    { id: 'receiver_dashboard', label: t('receiverPortal') || 'Shelter Hub', icon: HeartHandshake },
    { id: 'profile', label: t('trustBadges') || 'Trust Badges', icon: Award },
    { id: 'admin', label: t('adminHub'), icon: ShieldCheck },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const handleSelectNav = (tabId: string) => {
    sound.playPop(520);
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 h-screen w-72 lg:w-80 bg-white border-r-2 border-amber-200/90 shadow-lg flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Sidebar Header: Brand & Live Indicator */}
      <div className="p-4 border-b border-amber-200/80 bg-gradient-to-b from-amber-50/70 to-white flex items-center justify-between shrink-0">
        <button
          onClick={() => handleSelectNav('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <FoodLoopLogo size={42} className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">
              FoodLoop<span className="text-amber-500 font-black">.</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('OpenStreetMap Live')}</span>
            </div>
          </div>
        </button>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-xl text-slate-500 hover:bg-amber-100 transition-colors"
            title="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Demo Mode Live Status Pill if Running */}
      {demoRunning && (
        <div className="p-3 mx-3 my-2 bg-slate-900 text-white rounded-2xl border-2 border-amber-400 shadow-sm shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              Demo Step {demoStep}/6
            </span>
          </div>
          <p className="text-[11px] text-slate-200 truncate">{demoMessage}</p>
        </div>
      )}

      {/* Scrollable Container with All Options Vertically Stacked */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-amber-200">
        
        {/* SECTION 1: ALL NAVIGATION OPTIONS VERTICALLY */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>{t('Navigation')}</span>
            <span className="text-[9px] text-slate-400 font-bold">{mainNavOptions.length} {t('All Options')}</span>
          </div>

          <nav className="flex flex-col gap-1">
            {mainNavOptions.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-200 scale-[1.02]'
                      : item.highlight
                      ? 'bg-amber-100/90 text-amber-950 hover:bg-amber-200/90 border border-amber-300'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-amber-700' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTION 2: PREFERRED LANGUAGE OPTIONS VERTICALLY */}
        <div className="pt-2 border-t border-amber-200/60">
          <button
            onClick={() => setLangSectionOpen(!langSectionOpen)}
            className="w-full flex items-center justify-between px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('Preferred Language')}</span>
            </div>
            {langSectionOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {langSectionOpen && (
            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1 text-xs">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      sound.playSuccess();
                      setLanguage(lang.code);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-100 text-emerald-950 font-extrabold border border-emerald-300'
                        : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm shrink-0">{lang.flag}</span>
                      <div className="truncate">
                        <div className="font-bold text-[11px] leading-tight">{lang.nativeName}</div>
                        <div className="text-[9px] text-slate-500 truncate">{lang.name}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 3: SWITCH PERSPECTIVE / DEMO PERSONA OPTIONS VERTICALLY */}
        <div className="pt-2 border-t border-amber-200/60">
          <button
            onClick={() => setRoleSectionOpen(!roleSectionOpen)}
            className="w-full flex items-center justify-between px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('Switch Perspective')}</span>
            </div>
            {roleSectionOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {roleSectionOpen && (
            <div className="flex flex-col gap-1.5">
              {(users || []).slice(0, 5).map((u) => {
                const isCurrent = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      sound.playPop(520);
                      setCurrentUserById(u.id);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left transition-all text-xs ${
                      isCurrent
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-base shrink-0">{u.avatarEmoji}</span>
                    <div className="truncate flex-1">
                      <div className="truncate font-semibold text-[11px]">{u.organizationName}</div>
                      <div className="text-[9px] text-slate-400 capitalize">{u.role} · {u.subtype}</div>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 4: QUICK CONTROLS & UTILITIES (VERTICALLY ARRANGED) */}
        <div className="pt-2 border-t border-amber-200/60 space-y-2">
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            {t('Quick Controls')}
          </div>

          {/* 1-Click Interactive Demo Tour Button */}
          <button
            onClick={runHackathonDemoFlow}
            disabled={demoRunning}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold transition-all shadow-xs ${
              demoRunning
                ? 'bg-amber-200 text-amber-900 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white hover:scale-[1.02] active:scale-95'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{t('1-Click Demo Tour')}</span>
          </button>

          {/* Sound FX Toggle & Community Notifications in vertical stack */}
          <div className="grid grid-cols-2 gap-2">
            {/* Audio Toggle Option */}
            <button
              onClick={toggleSound}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                isSoundMuted
                  ? 'bg-slate-100 text-slate-500 border-slate-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Toggle Audio Feedback"
            >
              {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{isSoundMuted ? 'Muted' : 'Sound'}</span>
            </button>

            {/* Notifications Button Option */}
            <button
              onClick={() => {
                sound.playPop(500);
                setNotifsOpen(!notifsOpen);
              }}
              className={`relative flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold transition-colors ${
                notifsOpen ? 'bg-amber-100 text-amber-950' : 'bg-white hover:bg-amber-50 text-slate-700'
              }`}
              title="Community Notifications"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('Alerts') || 'Alerts'}</span>
              {unreadNotifs.length > 0 && (
                <span className="w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifs.length}
                </span>
              )}
            </button>
          </div>

          {/* Collapsible Notifications Drawer in Sidebar */}
          {notifsOpen && (
            <div className="bg-amber-50/70 rounded-2xl p-2 border border-amber-200 text-xs max-h-48 overflow-y-auto space-y-1.5 animate-in fade-in">
              <div className="font-extrabold text-[10px] uppercase text-slate-700 px-1 flex items-center justify-between">
                <span>Community Alerts</span>
                <span className="text-emerald-700">{unreadNotifs.length} new</span>
              </div>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-2 rounded-lg cursor-pointer transition-colors text-[11px] ${
                    notif.isRead ? 'bg-white/80' : 'bg-white font-semibold border-l-3 border-emerald-500 shadow-xs'
                  }`}
                >
                  <div className="text-slate-900 font-bold">{notif.title}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">{notif.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Footer: OSM & Leaflet Attribution */}
      <div className="p-3 border-t border-amber-200/80 bg-amber-50/30 text-[10px] text-slate-500 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <MapIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-bold text-slate-700">OpenStreetMap & OSRM</span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
          API v0.6
        </span>
      </div>
    </aside>
  );
};
