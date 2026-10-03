import React from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { FoodLoopLogo } from './FoodLoopLogo';
import { Heart, Globe2, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, t } = useFoodLoop();

  return (
    <footer className="border-t-2 border-amber-200/80 bg-white/90 backdrop-blur-xs mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FoodLoopLogo size={32} />
              <span className="font-display font-extrabold text-lg text-slate-900">
                {t('brandName')}
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Zero Waste
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              {t('subheading')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('About Us')}
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('surplusMap')}
            </button>
            <button
              onClick={() => setActiveTab('create_donation')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('donateFood')}
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('smartMatching')}
            </button>
            <button
              onClick={() => setActiveTab('pickups')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('pickups')}
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('impactDashboard')}
            </button>
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('aiAssistant')}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t('adminHub')}
            </button>
          </div>

          <div className="text-xs text-slate-400">
            © 2026 FoodLoop Global · Powered by community love & OSM API
          </div>
        </div>
      </div>
    </footer>
  );
};
