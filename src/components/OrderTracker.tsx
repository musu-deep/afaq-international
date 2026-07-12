/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, Search, Truck, ShieldCheck, Calendar, MapPin, User, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerProps {
  orders: Order[];
}

export default function OrderTracker({ orders }: OrderTrackerProps) {
  const [searchTracking, setSearchTracking] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTracking) return;

    // Search case-insensitive
    const found = orders.find(
      (o) => o.trackingNumber.trim().toLowerCase() === searchTracking.trim().toLowerCase() ||
             o.id.trim().toLowerCase() === searchTracking.trim().toLowerCase()
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStatusStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'shipped_out': return 2;
      case 'completed': return 3;
    }
  };

  const steps = [
    { label: 'تم تأكيد الدفع والطلب', desc: 'تم استلام وتوثيق طلبك الرقمي بنجاح' },
    { label: 'تجهيز زجاج السيارة', desc: 'جاري استخراج وفحص الزجاج بمستودع آفاق' },
    { label: 'جاري التوصيل / التركيب', desc: 'الفريق الفني المتنقل أو الشحن في الطريق إليك' },
    { label: 'تم التسليم والتركيب المعتمد', desc: 'تم تسليم الزجاج بالكامل، والضمان الذهبي فعال' }
  ];

  return (
    <section className="py-20 bg-slate-50 text-right border-t border-slate-200" id="order-tracker-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header block */}
        <div className="text-center space-y-4 mb-12" id="tracker-header">
          <div className="inline-flex p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl mb-2">
            <ClipboardList className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-emerald-950 font-sans">تتبع طلبات وشحنات زجاج السيارات</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            أدخل رقم تتبع الشحنة المخصص (AFQ-XXXXXX) المعطى لك في الفاتورة أو رسالة التأكيد لتتابع فوراً حالة تجهيز الزجاج، وتحديث تحركات طاقم التركيب المتنقل.
          </p>
        </div>

        {/* Tracker Search card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8" id="tracker-search-box">
          
          <form onSubmit={handleTrackerSearch} className="flex flex-col sm:flex-row gap-4" id="tracker-search-form">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                placeholder="أدخل رقم التتبع هنا... (مثال: AFQ-123456)"
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-2xl pl-4 pr-12 py-3.5 text-sm focus:border-emerald-600 focus:outline-none transition-all text-right font-mono"
                id="tracker-input-field"
              />
              <ClipboardList className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700" />
            </div>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-md shadow-emerald-700/10 cursor-pointer flex items-center justify-center gap-2"
              id="tracker-submit-btn"
            >
              <Search className="w-5 h-5" />
              تتبع الحالة الآن
            </button>
          </form>

          {/* Search Result display block */}
          <AnimatePresence mode="wait">
            {hasSearched && (
              searchedOrder ? (
                /* ORDER FOUND BLOCK */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8 pt-6 border-t border-slate-200"
                  id="tracker-result-block"
                >
                  {/* Customer order header briefs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm" id="tracker-brief-grid">
                    <div className="space-y-1.5">
                      <span className="text-slate-500 block">العميل والمستلم:</span>
                      <span className="text-emerald-950 font-extrabold flex items-center gap-1.5">
                        <User className="w-4 h-4 text-emerald-700" />
                        {searchedOrder.customerName}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono">
                      <span className="text-slate-500 block">رقم الجوال المسجل:</span>
                      <span className="text-slate-900 font-extrabold flex items-center gap-1.5 font-sans">
                        <Smartphone className="w-4 h-4 text-emerald-700" />
                        {searchedOrder.phone}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-slate-500 block">تاريخ الشراء:</span>
                      <span className="text-slate-900 font-extrabold flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                        {searchedOrder.createdAt}
                      </span>
                    </div>

                    <div className="space-y-1.5 sm:col-span-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center text-xs text-slate-600">
                      <span>الوجهة: <strong className="text-slate-900">{searchedOrder.city} - {searchedOrder.address}</strong></span>
                      <span>السيارة المستهدفة للتركيب: <strong className="text-emerald-700 font-bold">{searchedOrder.carDetails.make} {searchedOrder.carDetails.model}</strong></span>
                    </div>
                  </div>

                  {/* Horizontal visual stepper lines */}
                  <div className="space-y-6" id="tracker-stepper-visual">
                    <h3 className="text-emerald-950 font-extrabold text-sm sm:text-base">تتبع حالة التوصيل والتركيب:</h3>
                    
                    <div className="relative pt-4 flex flex-col sm:flex-row justify-between gap-6" id="stepper-horizontal">
                      {/* Stepper background connecting line */}
                      <div className="absolute top-8 right-8 left-8 h-[3px] bg-slate-200 hidden sm:block z-0" id="step-line-bg"></div>
                      {/* Stepper progress highlighted line */}
                      <div 
                        className="absolute top-8 right-8 h-[3px] bg-emerald-700 hidden sm:block z-0 transition-all duration-500" 
                        style={{ 
                          left: `${100 - (getStatusStepIndex(searchedOrder.status) / (steps.length - 1)) * 100}%`,
                          right: '32px'
                        }}
                        id="step-line-progress"
                      ></div>

                      {steps.map((st, idx) => {
                        const isCurrent = getStatusStepIndex(searchedOrder.status) === idx;
                        const isCompleted = getStatusStepIndex(searchedOrder.status) >= idx;
                        
                        return (
                          <div 
                            key={idx} 
                            className="relative z-10 flex sm:flex-col items-center gap-4 sm:gap-2.5 sm:text-center sm:flex-1"
                            id={`stepper-node-${idx}`}
                          >
                            {/* Stepper Circle Indicator */}
                            <div 
                              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
                                isCurrent 
                                  ? 'bg-emerald-700 border-emerald-600 text-white scale-110 shadow-[0_0_15px_rgba(4,120,87,0.4)]' 
                                  : isCompleted 
                                    ? 'bg-white border-emerald-600 text-emerald-700' 
                                    : 'bg-white border-slate-300 text-slate-400'
                              }`}
                              id={`node-circle-${idx}`}
                            >
                              {isCompleted && !isCurrent ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="text-xs font-black font-mono">{idx + 1}</span>
                              )}
                            </div>

                            {/* Stepper Copy Texts */}
                            <div className="space-y-1 sm:text-center text-right" id={`node-copy-${idx}`}>
                              <span className={`block font-black text-xs sm:text-sm ${isCurrent ? 'text-emerald-700' : isCompleted ? 'text-emerald-950' : 'text-slate-400'}`}>
                                {st.label}
                              </span>
                              <span className="block text-[10px] sm:text-xs text-slate-500 leading-relaxed">
                                {st.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary of products inside order */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3" id="tracker-products-invoice">
                    <h4 className="text-emerald-950 font-bold text-xs">قائمة الزجاج في هذا الطلب:</h4>
                    <div className="space-y-2.5" id="tracker-items">
                      {searchedOrder.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs" id={`tracker-item-${idx}`}>
                          <span className="text-slate-600">{it.product.arName} × {it.quantity}</span>
                          <span className="text-emerald-950 font-mono font-bold">{it.product.price * it.quantity} ر.س</span>
                        </div>
                      ))}
                      <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-black text-emerald-700">
                        <span>المبلغ المستوفي:</span>
                        <span className="font-mono">{searchedOrder.totalPrice} ر.س</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                /* ORDER NOT FOUND BLOCK */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3"
                  id="tracker-not-found-block"
                >
                  <AlertTriangle className="w-10 h-10 text-red-500 mx-auto animate-bounce" />
                  <h4 className="text-red-950 font-black text-base">لم يتم العثور على شحنة بهذا الرقم</h4>
                  <p className="text-red-700 text-xs max-w-sm mx-auto">
                    يرجى التأكد من كتابة رقم التتبع بشكل صحيح كما هو موضح بالفاتورة الخاصة بك (مثال: AFQ-123456) أو تفضل بفتح لوحة الإدارة لمشاهدة جميع أرقام التتبع النشطة وتجربتها.
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
