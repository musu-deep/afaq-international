/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Mail, Smartphone, Check, Sparkles, X, BellOff, Info } from 'lucide-react';
import { StockNotification, NotificationSubscription } from '../types';
import { BRANDS } from '../data';

interface NotificationCenterProps {
  notifications: StockNotification[];
  subscriptions: NotificationSubscription[];
  onSubscribe: (email: string, phone: string, brands: string[]) => void;
  onClearNotifications: () => void;
  onClose: () => void;
}

export default function NotificationCenter({
  notifications,
  subscriptions,
  onSubscribe,
  onClearNotifications,
  onClose
}: NotificationCenterProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBrandCheckboxChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || selectedBrands.length === 0) return;

    onSubscribe(email, phone, selectedBrands);
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
      setPhone('');
      setSelectedBrands([]);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="notifications-modal-wrapper">
      
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xs"
        id="notif-modal-overlay"
      ></motion.div>

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white border border-emerald-100 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 text-right p-6 sm:p-8 space-y-8"
        id="notif-modal-box"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-full border border-slate-200 cursor-pointer"
          id="notif-modal-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-start gap-4 border-b border-slate-200 pb-4" id="notif-header">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl shrink-0">
            <Bell className="w-6 h-6 animate-swing" style={{ transformOrigin: 'top center' }} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-emerald-950">مركز تنبيهات البضاعة والمنتجات الجديدة</h2>
            <p className="text-slate-600 text-xs sm:text-sm">تابع فوراً وصول شحنات وحاويات زجاج السيارات المستورد لآفاق العالمية</p>
          </div>
        </div>

        {/* Divided into 2 sections: 1. Current Alerts list, 2. Subscription engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="notif-body-grid">
          
          {/* Column 1: Live arrivals notifications feed */}
          <div className="space-y-4" id="notif-feed-col">
            <div className="flex justify-between items-center">
              <h3 className="text-emerald-950 font-bold text-sm">شحنات زجاج وصلت حديثاً:</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearNotifications}
                  className="text-slate-400 hover:text-red-600 text-xs font-semibold cursor-pointer"
                  id="clear-notif-feed-btn"
                >
                  مسح السجل
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1" id="notif-list-container">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
                    id={`notif-card-${notif.id}`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-emerald-700 font-bold mb-1">
                      <span>⚡ بضاعة جديدة</span>
                      <span className="font-mono text-slate-400">{notif.date}</span>
                    </div>
                    <h4 className="text-emerald-950 font-extrabold">{notif.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{notif.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400 space-y-2" id="notif-feed-empty">
                  <BellOff className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-xs">لا يوجد إشعارات نشطة حاليًا</p>
                  <p className="text-[10px] text-slate-400 max-w-[180px] mx-auto">سيظهر هنا جديد البضائع والزجاج المستلم عند تفريغ شاحنات الاستيراد.</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Email / Phone brand Alert Registration Subscription */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4" id="notif-subscription-col">
            <h3 className="text-emerald-950 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
              اشترك بجديد الماركات المفضلة:
            </h3>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-3"
                  id="notif-sub-success"
                >
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="text-emerald-950 font-extrabold text-sm">تم تفعيل اشتراكك بنجاح!</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    سنقوم بإرسال رسالة SMS ورسالة بريدية فور وصول أي زجاج جديد للماركات التي اخترتها إلى مستودعات آفاق العالمية.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" id="notif-sub-form">
                  <div className="space-y-1">
                    <label className="text-slate-600 text-[10px] font-bold">البريد الإلكتروني</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl pl-3 pr-9 py-2 text-xs focus:border-emerald-600 focus:outline-none text-right font-mono"
                        id="sub-email"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 text-[10px] font-bold">رقم الجوال لتنبيهات SMS الفورية</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl pl-3 pr-9 py-2 text-xs focus:border-emerald-600 focus:outline-none text-right font-mono"
                        id="sub-phone"
                      />
                      <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 text-[10px] font-bold">اختر ماركات السيارات التي تهمك:</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[14vh] overflow-y-auto bg-white p-2.5 rounded-xl border border-slate-200" id="sub-brands-grid">
                      {BRANDS.map((brand) => {
                        const brandShort = brand.split(' ')[0];
                        return (
                          <label key={brand} className="flex items-center gap-1.5 text-[10px] text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brandShort)}
                              onChange={() => handleBrandCheckboxChange(brandShort)}
                              className="rounded border-slate-300 bg-white text-emerald-700 focus:ring-0 cursor-pointer"
                            />
                            <span>{brandShort}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/10 cursor-pointer"
                    id="sub-submit-btn"
                  >
                    تفعيل جرس التنبيهات الذكي
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer informative notice */}
        <div className="p-3 bg-emerald-50 border border-emerald-100 text-slate-600 rounded-xl text-[10px] leading-relaxed" id="notif-info-block">
          💡 <strong>ملحوظة:</strong> يمكنك في أي وقت محاكاة استلام وحاويات بضاعة زجاج جديدة لتجربة إشعارات الويب المنبثقة من خلال تفعيل <strong>"لوحة تحكم الإدارة"</strong> في الشريط العلوي وتفريغ الحاويات التجريبية!
        </div>

      </motion.div>
    </div>
  );
}
