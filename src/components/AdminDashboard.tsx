/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, RefreshCw, Layers, CheckCircle2, AlertCircle, Sparkles, Send, Mail, ClipboardList, Trash2, Package } from 'lucide-react';
import { Order, CustomRequest, NotificationSubscription, StockNotification } from '../types';
import { BRANDS } from '../data';

interface AdminDashboardProps {
  orders: Order[];
  customRequests: CustomRequest[];
  subscriptions: NotificationSubscription[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onReceiveNewArrival: (brand: string, type: string, title: string, content: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onDeleteRequest: (requestId: string) => void;
}

export default function AdminDashboard({
  orders,
  customRequests,
  subscriptions,
  onUpdateOrderStatus,
  onReceiveNewArrival,
  onDeleteOrder,
  onDeleteRequest
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'simulate' | 'subscribers'>('orders');
  
  // Simulation Form states
  const [simBrand, setSimBrand] = useState('تويوتا (Toyota)');
  const [simType, setSimType] = useState('front');
  const [simTitle, setSimTitle] = useState('');
  const [simContent, setSimContent] = useState('');
  const [simSuccess, setSimSuccess] = useState(false);

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle || !simContent) return;

    onReceiveNewArrival(
      simBrand.split(' ')[0], 
      simType,
      simTitle,
      simContent
    );

    setSimSuccess(true);
    setSimTitle('');
    setSimContent('');

    setTimeout(() => {
      setSimSuccess(false);
    }, 4000);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded text-[11px] font-bold">معلق (بانتظار التأكيد)</span>;
      case 'preparing':
        return <span className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold">جاري التجهيز بالفحص</span>;
      case 'shipped_out':
        return <span className="bg-purple-50 border border-purple-200 text-purple-700 px-2 py-0.5 rounded text-[11px] font-bold">جاري التوصيل / التركيب</span>;
      case 'completed':
        return <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-bold">مكتمل والضمان نشط</span>;
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200 text-right scroll-mt-20" id="admin-dashboard-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6 mb-8" id="admin-title-row">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-2">
              <Settings className="w-6 h-6 text-emerald-700 animate-spin" style={{ animationDuration: '12s' }} />
              لوحة تحكم إدارة مبيعات وشحنات آفاق
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">لوحة برمجية خاصة بمدير النظام لمراقبة عمليات الحجز وتحديث الشحنات وبث التنبيهات التسويقية.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs text-slate-600" id="admin-stats-indicator">
            <span>إجمالي الطلبات الفعالة: <strong className="text-emerald-700 font-bold font-mono">{orders.length}</strong></span>
            <span>•</span>
            <span>طلبات زجاج خاص: <strong className="text-emerald-700 font-bold font-mono">{customRequests.length}</strong></span>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-200/60 p-1.5 rounded-xl border border-slate-300 w-fit" id="admin-tabs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeTab === 'orders' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            id="tab-trigger-orders"
          >
            📦 إدارة وتتبع الطلبات ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeTab === 'custom' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            id="tab-trigger-custom"
          >
            🛠️ طلبات زجاج مخصصة ({customRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeTab === 'simulate' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            id="tab-trigger-simulate"
          >
            🔔 بث إعلان بضاعة جديدة (Simulate)
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeTab === 'subscribers' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            id="tab-trigger-subs"
          >
            👥 المشتركين المسجلين ({subscriptions.length})
          </button>
        </div>

        {/* Dashboard Panels content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 min-h-[300px] shadow-sm" id="admin-tab-content">
          
          {/* TAB 1: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6" id="panel-orders">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-emerald-950 font-black text-sm">سجل وحالة طلبيات الزجاج الرقمية:</h3>
                <span className="text-[11px] text-emerald-700 font-bold">انقر لتحديث مسار الشحنة بالوقت الحقيقي للعميل</span>
              </div>

              {orders.length > 0 ? (
                <div className="overflow-x-auto" id="orders-table-wrapper">
                  <table className="w-full text-right text-xs" id="admin-orders-table">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-3 pt-2 font-bold pr-2">رقم الطلب / التتبع</th>
                        <th className="pb-3 pt-2 font-bold">العميل والمستلم</th>
                        <th className="pb-3 pt-2 font-bold">الموقع والوجهة</th>
                        <th className="pb-3 pt-2 font-bold">إجمالي المبلغ</th>
                        <th className="pb-3 pt-2 font-bold">مسار الشحنة الفعلي</th>
                        <th className="pb-3 pt-2 font-bold text-left pl-2">إجراءات الإدارة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50 transition-colors" id={`admin-ord-row-${ord.id}`}>
                          <td className="py-4 pr-2">
                            <span className="block font-black font-mono text-emerald-950">{ord.id}</span>
                            <span className="text-[10px] text-emerald-700 font-mono font-bold block">{ord.trackingNumber}</span>
                          </td>
                          <td className="py-4 font-bold">
                            {ord.customerName}
                            <span className="block text-[10px] text-slate-500 font-mono">{ord.phone}</span>
                          </td>
                          <td className="py-4">
                            {ord.city}
                            <span className="block text-[10px] text-slate-500">{ord.address}</span>
                          </td>
                          <td className="py-4 font-black font-mono text-emerald-700">{ord.totalPrice} ر.س</td>
                          <td className="py-4">{getStatusBadge(ord.status)}</td>
                          <td className="py-4 text-left pl-2">
                            <div className="inline-flex items-center gap-1.5" id={`actions-wrap-${ord.id}`}>
                              {/* Status progression triggers */}
                              {ord.status === 'pending' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'preparing')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer"
                                  id={`btn-prep-${ord.id}`}
                                >
                                  تجهيز الزجاج بالفحص
                                </button>
                              )}
                              {ord.status === 'preparing' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'shipped_out')}
                                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer"
                                  id={`btn-ship-${ord.id}`}
                                >
                                  بث خروج الفني/الشاحنة
                                </button>
                              )}
                              {ord.status === 'shipped_out' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'completed')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer"
                                  id={`btn-complete-${ord.id}`}
                                >
                                  تأكيد التركيب وتنشيط الضمان
                                </button>
                              )}
                              <button
                                onClick={() => onDeleteOrder(ord.id)}
                                className="text-slate-300 hover:text-red-600 p-1.5 rounded transition-colors cursor-pointer"
                                title="حذف الطلب نهائياً"
                                id={`btn-delete-${ord.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2" id="orders-panel-empty">
                  <ClipboardList className="w-10 h-10 mx-auto opacity-20" />
                  <p>لا يوجد مبيعات مسجلة حتى الآن</p>
                  <p className="text-[11px] text-slate-400">عند قيام العملاء بحجز ودفع قيمة الزجاج في المتجر الرقمي، ستظهر الفاتورة والتفاصيل والتركيب هنا فورا.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CUSTOM GLASS REQUESTS */}
          {activeTab === 'custom' && (
            <div className="space-y-6" id="panel-custom-reqs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-emerald-950 font-black text-sm">طلبات الزجاج الخاص المستورد والنادر:</h3>
                <span className="text-[11px] text-emerald-700 font-bold">تواصل للتنسيق مع العميل لتقديم عروض الأسعار</span>
              </div>

              {customRequests.length > 0 ? (
                <div className="overflow-x-auto" id="custom-reqs-table-wrapper">
                  <table className="w-full text-right text-xs" id="admin-custom-reqs-table">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-3 pt-2 font-bold pr-2">رقم التذكرة</th>
                        <th className="pb-3 pt-2 font-bold">العميل والجوال</th>
                        <th className="pb-3 pt-2 font-bold">السيارة وطرازها</th>
                        <th className="pb-3 pt-2 font-bold">زجاج القطعة</th>
                        <th className="pb-3 pt-2 font-bold">المواصفات المطلوبة</th>
                        <th className="pb-3 pt-2 font-bold text-left pl-2">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {customRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50 transition-colors" id={`admin-req-row-${req.id}`}>
                          <td className="py-4 pr-2 font-black font-mono text-emerald-700">{req.id}</td>
                          <td className="py-4 font-bold">
                            {req.customerName}
                            <span className="block text-[10px] text-slate-500 font-mono">{req.phone}</span>
                          </td>
                          <td className="py-4 font-semibold text-emerald-950">
                            {req.carMake} {req.carModel}
                            <span className="block text-[10px] text-slate-500 font-mono">موديل: {req.year}</span>
                          </td>
                          <td className="py-4 text-emerald-700 font-bold">{req.glassType}</td>
                          <td className="py-4 max-w-xs text-slate-600 truncate" title={req.details}>
                            {req.details}
                          </td>
                          <td className="py-4 text-left pl-2">
                            <button
                              onClick={() => onDeleteRequest(req.id)}
                              className="text-slate-300 hover:text-red-600 p-1.5 rounded transition-colors cursor-pointer"
                              title="حذف التذكرة"
                              id={`req-delete-btn-${req.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2" id="custom-panel-empty">
                  <Package className="w-10 h-10 mx-auto opacity-20" />
                  <p>لا يوجد طلبات زجاج مخصصة مسجلة</p>
                  <p className="text-[11px] text-slate-400">تظهر هنا التذاكر عندما يقوم عملاء السيارات النادرة برفع صور زجاجهم وتفاصيل المركبات.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECEIVE NEW ARRIVAL - SIMULATE NOTIFICATIONS */}
          {activeTab === 'simulate' && (
            <div className="space-y-6" id="panel-simulate">
              <div className="pb-2 border-b border-slate-100 space-y-1">
                <h3 className="text-emerald-950 font-black text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  جهاز بث واستقبال شحنات الزجاج (نظام الإشعارات التسويقية):
                </h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  عند وصول شاحنة أو حاوية بضاعة جديدة محملة بالزجاج، يقوم المشرف بكتابة تفاصيل الشحنة المصنفة. <strong className="text-emerald-700">سيؤدي البث فورا إلى إظهار إشعار فوري منبثق في زاوية الشاشة لجميع زوار الموقع</strong> وإضافة التنبيه في مركز تنبيهات وصول البضائع الجديدة، ومطابقة المشتركين لعلامة هذه السيارة وإرسال تنبيهات بريد افتراضية!
                </p>
              </div>

              <form onSubmit={handleSimulateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin-sim-form">
                
                <div className="space-y-4" id="sim-form-inputs">
                  
                  <div className="grid grid-cols-2 gap-4" id="sim-meta-row">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-slate-700 text-xs font-semibold">ماركة زجاج السيارة الواصلة</label>
                      <select
                        value={simBrand}
                        onChange={(e) => setSimBrand(e.target.value)}
                        className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                        id="sim-brand"
                      >
                        {BRANDS.map((br) => (
                          <option key={br} value={br}>{br}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-slate-700 text-xs font-semibold">مكان زجاج القطعة</label>
                      <select
                        value={simType}
                        onChange={(e) => setSimType(e.target.value)}
                        className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                        id="sim-type"
                      >
                        <option value="front">زجاج أمامي</option>
                        <option value="rear">زجاج خلفي</option>
                        <option value="side">زجاج جانبي</option>
                        <option value="sunroof">فتحة سقف</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-slate-700 text-xs font-semibold">عنوان الإعلان الرئيسي</label>
                    <input
                      type="text"
                      required
                      value={simTitle}
                      onChange={(e) => setSimTitle(e.target.value)}
                      placeholder="مثال: وصول حاوية زجاج أمامي تويوتا كامري 2024"
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                      id="sim-title"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-slate-700 text-xs font-semibold">نص وتفاصيل الإعلان والمميزات المرفقة</label>
                    <textarea
                      required
                      value={simContent}
                      onChange={(e) => setSimContent(e.target.value)}
                      rows={3}
                      placeholder="مثال: يسر آفاق إعلان وصول كميات ضخمة من الزجاج الأمامي الأصلي لكامري مجهزة بحساسات الرطوبة والمطر وعازل الشمس الأشعة فوق البنفسجية بأسعار مخفضة."
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                      id="sim-content"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-700/10"
                    id="sim-trigger-alert-btn"
                  >
                    <Send className="w-4 h-4" />
                    تفريغ الحاوية وإطلاق التنبيه التسويقي الفوري
                  </button>

                </div>

                {/* Live simulation mock response and guidelines info */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between" id="sim-preview-box">
                  <div className="space-y-4">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Real-time Marketing Simulator</span>
                    <div className="space-y-1">
                      <span className="block text-emerald-950 font-extrabold text-xs">كيف يعمل نظام التنبيهات الرقمية؟</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        عند تفريغ الحاويات في مستودعات حفر الباطن، يتطابق الإشعار مع ماركة السيارة. على سبيل المثال، إذا اشترك أحد الزوار بتنبيهات الماركة <strong>"Toyota"</strong>، سيظهر له إشعار مخصص ويتم تدوينه في صندوق بريد العميل.
                      </p>
                    </div>

                    <div className="h-[1px] bg-slate-200"></div>

                    {/* Success alert feedback */}
                    {simSuccess && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-700 text-xs animate-pulse" id="sim-success-alert">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <div>
                          <span className="block font-bold">تم إرسال إشعار البضاعة الجديدة بنجاح!</span>
                          <span className="block text-slate-500 text-[10px]">يمكنك الآن إلقاء نظرة على جرس التنبيهات في شريط التنقل العلوي لرؤيته مسجلاً.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-white border border-slate-200 text-emerald-700 rounded-xl text-[10px] leading-relaxed flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>سلسلة الحاويات المستوردة والمجدولة نشطة في الخلفية.</span>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* TAB 4: BRAND SUBSCRIBERS CONTACT LISTS */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6" id="panel-subs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-emerald-950 font-black text-sm">قائمة جهات اتصال المشتركين المجدولة لإرسال التنبيهات:</h3>
                <span className="text-[11px] text-emerald-700 font-bold">تلقى تحديثات بالعملاء المشتركين بكل ماركة</span>
              </div>

              {subscriptions.length > 0 ? (
                <div className="overflow-x-auto" id="subs-table-wrapper">
                  <table className="w-full text-right text-xs" id="admin-subs-table">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-3 pt-2 font-bold pr-2">رقم المشترك</th>
                        <th className="pb-3 pt-2 font-bold">البريد الإلكتروني</th>
                        <th className="pb-3 pt-2 font-bold">رقم الجوال لتلقي SMS</th>
                        <th className="pb-3 pt-2 font-bold">الماركات المفضلة المهتم بها</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {subscriptions.map((sub, idx) => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors" id={`admin-sub-row-${sub.id}`}>
                          <td className="py-4 pr-2 font-mono font-bold text-slate-400">SUB-00{idx + 1}</td>
                          <td className="py-4 font-extrabold font-mono text-emerald-950 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-700" />
                            {sub.email}
                          </td>
                          <td className="py-4 font-mono">{sub.phone}</td>
                          <td className="py-4">
                            <div className="flex flex-wrap gap-1" id={`sub-brands-wrap-${sub.id}`}>
                              {sub.brands.map((b) => (
                                <span key={b} className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold">{b}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2" id="subs-panel-empty">
                  <Mail className="w-10 h-10 mx-auto opacity-20" />
                  <p>لا يوجد مشتركون في قائمة الانتظار</p>
                  <p className="text-[11px] text-slate-400">عند قيام العملاء بالتسجيل لتلقي تنبيهات الموديلات المفضلة، ستظهر تفاصيلهم ومفضلاتهم هنا.</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
