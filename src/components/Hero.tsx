/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Truck, Sparkles, AlertCircle, Wrench } from 'lucide-react';
import { BRANDS } from '../data';

// Try to use the exact generated image. We'll fallback to a premium high-tech stock photo or high quality CSS layout if needed.
const HERO_IMAGE_PATH = '/src/assets/images/enhanced_storefront_1783871111899.jpg';

interface HeroProps {
  onSearch: (brand: string, query: string) => void;
  onSubscribeClick: () => void;
}

export default function Hero({ onSearch, onSubscribeClick }: HeroProps) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedBrand, searchQuery);
    // Smooth scroll to catalog
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f2fcf6] via-[#f7f9f8] to-[#f4f7f5] text-right text-emerald-950" id="hero-section-root">
      
      {/* Cinematic Background Image with Dark Overlay and Laser Grids */}
      <div className="absolute inset-0 z-0 overflow-hidden" id="hero-bg-wrapper">
        <img
          src={HERO_IMAGE_PATH}
          alt="Afaq Cinematic Car Glass Hero Banner"
          className="w-full h-full object-cover scale-105 filter opacity-15 brightness-95 contrast-100 saturate-[1.0] mix-blend-multiply transition-transform duration-10000"
          style={{ transform: 'scale(1.03)' }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to high-quality Unsplash image of luxury car reflection if the generated image is not loaded
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1920';
          }}
        />
        {/* Layered gradients for deep premium cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f7f5] via-[#f4f7f5]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#f4f7f5]/95 via-transparent to-transparent"></div>
        
        {/* High-tech animated laser scan lines representing "Afaq glass precision" */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-40 animate-[pulse_2s_infinite]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col lg:flex-row items-center gap-12" id="hero-content-grid">
        
        {/* Right Column: Copywriting & CTAs */}
        <div className="flex-1 flex flex-col space-y-8" id="hero-text-column">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-bold shadow-xs shadow-emerald-800/5"
            id="hero-tag-badge"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>الرائدون في جودة وضمان زجاج السيارات بالمملكة</span>
          </motion.div>

          {/* Main Cinematic Headings */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-tight font-sans"
              id="hero-title"
            >
              دقة متناهية.. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 drop-shadow-xs">
                وزجاج يحميك كالدروع
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed max-w-xl"
              id="hero-description"
            >
              في شركة <span className="text-emerald-800 font-extrabold">آفاق العالمية لزجاج السيارات</span>، نوفّر كافة أنواع الزجاج الأمامي، الخلفي والجانبي لجميع طرازات السيارات بأعلى معايير الجودة والضمان، مع خدمة التركيب الاحترافي الفوري وخدمة تلبية الطلبات المتنقلة أينما كنت.
            </motion.p>
          </div>

          {/* Search Glass Engine form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white border border-emerald-100/80 p-6 rounded-2xl shadow-xl shadow-emerald-950/5 transition-all"
            id="search-box-wrap"
          >
            <h3 className="text-emerald-950 font-extrabold text-base mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              محرك البحث الفوري لزجاج سيارتك:
            </h3>
            
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="hero-search-form">
              {/* Brand Dropdown */}
              <div className="flex flex-col space-y-1.5 text-right">
                <label className="text-slate-600 text-xs font-bold">الماركة المصنعة</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                  id="brand-select-dropdown"
                >
                  <option value="">كل الماركات</option>
                  {BRANDS.map((br) => (
                    <option key={br} value={br}>{br}</option>
                  ))}
                </select>
              </div>

              {/* Model / Year Text search */}
              <div className="flex flex-col space-y-1.5 text-right sm:col-span-2">
                <label className="text-slate-600 text-xs font-bold">الموديل أو سنة الصنع (مثال: كامري 2021)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن سيارتك هنا..."
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors text-right"
                    id="search-text-input"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700" id="search-icon-container">
                    <Search className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sm:col-span-3 flex flex-col sm:flex-row gap-3 pt-2" id="search-actions-row">
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 text-center cursor-pointer"
                  id="hero-submit-search"
                >
                  ابحث في المخزون المتوفر
                </button>
                <button
                  type="button"
                  onClick={onSubscribeClick}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100 font-bold text-sm py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-subscribe-notif"
                >
                  <AlertCircle className="w-4 h-4 text-emerald-700" />
                  اشترك في تنبيهات وصول البضائع الجديدة
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 text-right" id="hero-stats-row">
            <div className="p-4 bg-white border border-emerald-50 rounded-xl shadow-xs">
              <span className="block text-emerald-700 font-black text-2xl sm:text-3xl font-mono">100%</span>
              <span className="text-slate-500 text-xs sm:text-sm font-medium">مطابقة للوكالة والمواصفات</span>
            </div>
            <div className="p-4 bg-white border border-emerald-50 rounded-xl shadow-xs">
              <span className="block text-emerald-700 font-black text-2xl sm:text-3xl font-mono">5 سنوات</span>
              <span className="text-slate-500 text-xs sm:text-sm font-medium">ضمان ذهبي ضد التسريب والعيوب</span>
            </div>
            <div className="p-4 bg-white border border-emerald-50 rounded-xl shadow-xs">
              <span className="block text-emerald-700 font-black text-2xl sm:text-3xl font-mono">24 ساعة</span>
              <span className="text-slate-500 text-xs sm:text-sm font-medium">خدمة تلبية متنقلة في حفر الباطن</span>
            </div>
          </div>

        </div>

        {/* Left Column: Glass Visual Feature Card */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center" id="hero-badge-column">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-emerald-100 bg-white p-2.5 shadow-2xl shadow-emerald-950/5 group"
            id="hero-promo-card"
          >
            {/* Storefront Image Frame */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden" id="hero-image-frame">
              <img
                src="/src/assets/images/enhanced_storefront_1783871111899.jpg"
                alt="Afaq Al-Alamiya Storefront"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/src/assets/images/afaq_hero_banner_1783867037728.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent"></div>
              
              {/* Floating Location Badge */}
              <div className="absolute bottom-3 right-3 bg-emerald-700/95 backdrop-blur-md border border-emerald-500/30 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5" id="storefront-loc-badge">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>المركز الرئيسي والتركيب والمستودعات - حفر الباطن</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 text-right space-y-3" id="hero-promo-details">
              <div className="flex items-center justify-between" id="promo-footer-header">
                <h4 className="text-emerald-950 font-black text-base sm:text-lg flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-700" />
                  أجهزة وتقنيات التركيب المعتمدة
                </h4>
                <span className="bg-amber-500/10 text-amber-800 border border-amber-500/25 text-[10px] px-2.5 py-1 rounded-lg font-black font-sans">تجهيز فوري</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                صورة حية لمركز خدماتنا ومستودعاتنا بحفر الباطن. نلتزم بتوريد وتركيب زجاج السيارات المعتمد والمصنع بأحدث تقنيات مقاومة الخدوش والحرارة، مع توفير الضمان المالي والذهبي الموثق.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
