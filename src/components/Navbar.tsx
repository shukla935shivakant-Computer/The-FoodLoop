import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../utils/translations';
import { FoodLoopLogo } from './FoodLoopLogo';
import {
  Sparkles,
  MapPin,
  HeartHandshake,
  Truck,
  BarChart3,
  Bot,
  ShieldCheck,
  Bell,
  Volume2,
  VolumeX,
  PlayCircle,
  PlusCircle,
  Menu,
  X,
  CheckCircle2,
  Settings,
  Globe2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
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
    language,
    setLanguage,
    t,
  } = useFoodLoop();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifs = (notifications || []).filter((n) => n && !n.isRead);

  const navItems = [
    { id: 'map', label: t('surplusMap'), icon: MapPin },
    { id: 'create_donation', label: t('donateFood'), icon: PlusCircle, highlight: true },
    { id: 'matching', label: t('smartMatching'), icon: HeartHandshake },
    { id: 'pickups', label: t('pickups'), icon: Truck },
    { id: 'impact', label: t('impactDashboard'), icon: BarChart3 },
    { id: 'ai_assistant', label: t('aiAssistant'), icon: Bot },
    { id: 'admin', label: t('adminHub'), icon: ShieldCheck },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Top Banner for Hackathon Demo Mode if running */}
      {demoRunning && (
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 text-white px-4 py-1.5 text-xs font-bold text-center tracking-wide animate-pulse">
          ⚡ HACKATHON LIVE DEMO FLOW RUNNING · WATCH THE STEP-BY-STEP WORKFLOW UNFOLD
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Single text element wordmark with playful emblem */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <FoodLoopLogo size={40} className="group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">
                  FoodLoop<span className="text-amber-500 font-black">.</span>
                </span>
                <span className="hidden sm:inline-block ml-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Global
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                      : item.highlight
                      ? 'bg-amber-100/80 text-amber-900 hover:bg-amber-200/80'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Demo Flow, Sound FX, Notifications, Role Switcher) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* 1-Click Interactive Demo Flow CTA Button */}
            <button
              onClick={runHackathonDemoFlow}
              disabled={demoRunning}
              title="Run 1-Click Complete Hackathon Flow"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                demoRunning
                  ? 'bg-amber-200 text-amber-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white hover:scale-105 active:scale-95'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">1-Click Demo</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Quick Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  sound.playPop(520);
                  setShowLangMenu(!showLangMenu);
                  setShowNotifs(false);
                  setShowRoleMenu(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-amber-50 text-slate-700 text-xs font-bold transition-colors"
                title="Select Indian Language"
              >
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName || 'Language'}
                </span>
                <span className="sm:hidden">{language.toUpperCase()}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border-2 border-amber-200 py-2 z-50 animate-in fade-in">
                  <div className="px-3 pb-1.5 border-b border-amber-100 text-[11px] font-extrabold text-slate-800">
                    Indian & Global Languages
                  </div>
                  <div className="max-h-64 overflow-y-auto p-1 divide-y divide-slate-100 text-xs">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          sound.playSuccess();
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                          language === lang.code
                            ? 'bg-amber-100 text-amber-950 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <div>
                            <div className="font-bold">{lang.nativeName}</div>
                            <div className="text-[10px] text-slate-400">{lang.name}</div>
                          </div>
                        </div>
                        {language === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sound FX Toggle with sound wave icon */}
            <button
              onClick={toggleSound}
              title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className={`p-2 rounded-xl border transition-all ${
                isSoundMuted
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  sound.playPop(500);
                  setShowNotifs(!showNotifs);
                  setShowRoleMenu(false);
                }}
                className="relative p-2 rounded-xl border border-slate-200 bg-white hover:bg-amber-50 text-slate-700 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border-2 border-amber-200 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2 border-b border-amber-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      🔔 Community Alerts
                    </span>
                    <span className="text-[11px] font-medium text-emerald-600">
                      {unreadNotifs.length} unread
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 cursor-pointer transition-colors text-xs ${
                          notif.isRead ? 'bg-white hover:bg-slate-50' : 'bg-amber-50/70 hover:bg-amber-100/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className="font-bold text-slate-800">{notif.title}</span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-amber-100 text-center">
                    <button
                      onClick={() => setShowNotifs(false)}
                      className="text-xs text-amber-700 font-bold hover:underline"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Settings Bar Shortcut Button */}
            <button
              onClick={() => {
                sound.playPop(550);
                setActiveTab('settings');
              }}
              title="Settings & Multilingual Indian Languages"
              className={`p-2 rounded-xl border transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs scale-105'
                  : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => {
                  sound.playPop(520);
                  setShowRoleMenu(!showRoleMenu);
                  setShowNotifs(false);
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all text-xs font-semibold text-slate-800"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${currentUser?.avatarBg || 'bg-amber-100'}`}>
                  {currentUser?.avatarEmoji || '👤'}
                </div>
                <div className="hidden md:block text-left leading-tight max-w-[110px] truncate">
                  <div className="truncate font-bold text-slate-900">{currentUser?.name || 'Account'}</div>
                  <div className="text-[10px] text-amber-700 capitalize font-medium truncate">
                    {currentUser?.role || 'Guest'} · {currentUser?.subtype || 'User'}
                  </div>
                </div>
              </button>

              {/* Role Switcher Menu */}
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border-2 border-amber-200 py-2.5 z-50">
                  <div className="px-3 pb-2 border-b border-amber-100">
                    <div className="text-xs font-extrabold text-slate-800">Switch Demo Role:</div>
                    <div className="text-[11px] text-slate-500">Test platform perspectives instantly</div>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-1 divide-y divide-slate-100">
                    <div className="py-1">
                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                        Food Donors
                      </div>
                      {(users || []).filter((u) => u && u.id && u.role === 'donor').map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUserById(u.id);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            currentUser?.id === u.id
                              ? 'bg-emerald-50 text-emerald-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{u.avatarEmoji}</span>
                          <div className="truncate flex-1">
                            <div className="truncate font-medium">{u.organizationName}</div>
                            <div className="text-[10px] text-slate-400 capitalize">{u.subtype}</div>
                          </div>
                          {currentUser?.id === u.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      ))}
                    </div>

                    <div className="py-1">
                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
                        Receivers (NGOs & Shelters)
                      </div>
                      {(users || []).filter((u) => u && u.id && u.role === 'receiver').map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUserById(u.id);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            currentUser?.id === u.id
                              ? 'bg-teal-50 text-teal-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{u.avatarEmoji}</span>
                          <div className="truncate flex-1">
                            <div className="truncate font-medium">{u.organizationName}</div>
                            <div className="text-[10px] text-slate-400 capitalize">{u.subtype}</div>
                          </div>
                          {currentUser?.id === u.id && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                        </button>
                      ))}
                    </div>

                    <div className="py-1">
                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">
                        Platform Administration
                      </div>
                      {(users || []).filter((u) => u && u.id && u.role === 'admin').map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUserById(u.id);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            currentUser?.id === u.id
                              ? 'bg-indigo-50 text-indigo-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{u.avatarEmoji}</span>
                          <div className="truncate flex-1">
                            <div className="truncate font-medium">{u.name}</div>
                            <div className="text-[10px] text-slate-400">Admin Inspector</div>
                          </div>
                          {currentUser?.id === u.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                sound.playPop(480);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-white/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-left ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
