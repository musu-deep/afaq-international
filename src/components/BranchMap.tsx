/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Clock, Phone, Navigation, Globe, Shield, Sparkles } from 'lucide-react';

export default function BranchMap() {
  const mapUrl = 'https://www.google.com/maps?q=28.4229937,46.0314764&z=17&hl=en';
  // Standard Google Maps embed URL using coordinates
  const embedUrl = 'https://maps.google.com/maps?q=28.4229937,46.0314764&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <section className="py-20 bg-white text-right border-t border-slate-200" id="map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="map-header">
          <div className="inline-flex p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl mb-2 animate-pulse">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black text-emerald-950 font-sans">موقع الفرع الرئيسي لشركة آفاق العالمية</h2>
          <p className="text-slate-600 text-sm">
            تفضّل بزيارة مركزنا الرئيسي المجهز بأحدث أجهزة ليزر محاذاة تركيب زجاج السيارات والمواد الألمانية سريعة الالتصاق.
          </p>
        </div>

        {/* Info & Map Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="map-split-grid">
          
          {/* Branch contact details panel (Left or Right depending on RTL) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6" id="map-info-card">
            
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Main Headquarters</span>
                <h3 className="text-emerald-950 font-black text-xl sm:text-2xl">مستودع ومركز حفر الباطن</h3>
              </div>

              {/* Coordinates specs */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs" id="branch-coords-info">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span className="font-extrabold text-emerald-950">إحداثيات الموقع الدقيقة:</span>
                </div>
                <div className="font-mono text-left text-emerald-800 font-bold bg-slate-100 p-2 rounded border border-slate-200 flex justify-between" id="coords-display">
                  <span>28.4229937° N</span>
                  <span>46.0314764° E</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5" id="working-hours">
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-emerald-950 font-bold text-xs sm:text-sm">ساعات العمل الرسمية:</span>
                  <span className="block text-slate-600 text-xs leading-relaxed">
                    يومياً: من 8:00 صباحاً حتى 10:00 مساءً <br />
                    (الجمعة: من 4:00 مساءً حتى 10:00 مساءً)
                  </span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5" id="telephone">
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-emerald-950 font-bold text-xs sm:text-sm">الهاتف الموحد والتنسيق:</span>
                  <span className="block text-slate-600 text-xs font-mono">+966 50 123 4567</span>
                </div>
              </div>

              {/* Quality Guarantee badge */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5" id="guarantee-badge">
                <Shield className="w-5 h-5 shrink-0" />
                <p className="leading-relaxed">
                  يقع مستودعنا الرئيسي في موقع حيوي يسهل الوصول إليه، حيث يضم آلاف قطع الزجاج المجهزة للشحن الفوري لأي مكان بالمملكة.
                </p>
              </div>
            </div>

            {/* Direct Directions Navigation Button */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-700/10 flex items-center justify-center gap-2 group cursor-pointer text-center text-sm"
              id="directions-cta-btn"
            >
              <Navigation className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              عرض الاتجاهات في خرائط Google Maps
            </a>

          </div>

          {/* Map display container (Left or Right) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-3xl p-2 min-h-[350px] lg:min-h-auto flex shadow-xl relative group overflow-hidden" id="map-frame-card">
            
            {/* Interactive embedded maps iframe */}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-2xl hover:saturate-[1.1] transition-all min-h-[350px]"
              title="Google Map Location Afaq"
              id="branch-google-map-iframe"
            ></iframe>

            {/* Glowing pin overlay label for aesthetic luxury touch */}
            <div className="absolute top-4 right-4 bg-white/95 border border-emerald-200 px-4 py-2 rounded-xl text-slate-900 text-xs font-bold flex items-center gap-2 pointer-events-none" id="map-pin-overlay">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              <span>مستودع آفاق الرئيسي المعتمد</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
