/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Shield, Truck, Settings, CreditCard, ChevronRight, CheckCircle, Info, X } from 'lucide-react';
import { CartItem, Order } from '../types';
import { SAUDI_CITIES } from '../data';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onToggleInstall: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'trackingNumber'>) => void;
  onClose: () => void;
}

export default function Cart({
  cartItems,
  onUpdateQty,
  onToggleInstall,
  onRemoveItem,
  onCheckout,
  onClose
}: CartProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(SAUDI_CITIES[0]);
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<Order['deliveryMethod']>('installation_at_branch');
  
  // Payment gateway simulation states
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple_pay' | 'credit_card'>('mada');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvoice, setShowInvoice] = useState<Order | null>(null);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Fees calculation
  let deliveryFee = 0;
  if (deliveryMethod === 'mobile_installation') {
    deliveryFee = 150; // الخدمة المتنقلة الفنية
  } else if (deliveryMethod === 'delivery_only') {
    deliveryFee = 75; // شحن سريع بتغليف خشبي آمن
  }

  // Installation fee is already included in the gold package or we can set a helper
  const installationFee = cartItems.reduce((acc, item) => {
    return acc + (item.installationRequested ? 50 * item.quantity : 0);
  }, 0);

  const vat = Math.round((subtotal + deliveryFee + installationFee) * 0.15); // VAT 15% in KSA
  const total = subtotal + deliveryFee + installationFee + vat;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !address) return;

    setIsProcessing(true);

    // Simulate payment loading
    setTimeout(() => {
      setIsProcessing(false);
      
      const trackingNum = 'AFQ-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: Order = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        customerName: name,
        phone,
        email,
        city,
        address,
        deliveryMethod,
        carDetails: {
          make: cartItems[0]?.product.brand || 'غير محدد',
          model: cartItems[0]?.product.carModel || 'غير محدد',
          year: cartItems[0]?.product.yearStart || 2022
        },
        items: [...cartItems],
        totalPrice: total,
        status: 'pending',
        trackingNumber: trackingNum,
        createdAt: new Date().toLocaleDateString('ar-SA')
      };

      onCheckout(newOrder);
      setShowInvoice(newOrder);
    }, 2000);
  };

  return (
    <div className="fixed inset-y-0 left-0 right-0 md:left-auto md:w-[650px] bg-white z-50 shadow-2xl border-r md:border-l md:border-r-0 border-slate-200 text-right flex flex-col h-full" id="cart-drawer-root">
      
      {/* Drawer Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50" id="cart-drawer-header">
        <button
          onClick={onClose}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-xl border border-slate-200 cursor-pointer"
          id="close-cart-drawer"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-emerald-700" />
          سلة المشتريات والطلب الرقمي
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8" id="cart-drawer-scroll-body">
        <AnimatePresence mode="wait">
          
          {showInvoice ? (
            /* SUCCESS INVOICE STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-6"
              id="invoice-container-root"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-emerald-950 font-black text-xl">تم إتمام حجز الدفع والطلب بنجاح!</h3>
                <p className="text-slate-600 text-xs sm:text-sm">شكرًا لتعاملك مع آفاق العالمية لزجاج السيارات.</p>
              </div>

              {/* Order reference details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-right space-y-3" id="invoice-receipt-card">
                <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-2">
                  <span className="text-slate-500">رقم الطلب الفريد:</span>
                  <span className="text-slate-900 font-black font-mono">{showInvoice.id}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-2">
                  <span className="text-slate-500">رقم تتبع الشحنة:</span>
                  <span className="text-emerald-700 font-black font-mono">{showInvoice.trackingNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-2">
                  <span className="text-slate-500">طريقة الاستلام:</span>
                  <span className="text-slate-900 font-bold">
                    {showInvoice.deliveryMethod === 'installation_at_branch' && 'تركيب احترافي بالفرع الرئيسي'}
                    {showInvoice.deliveryMethod === 'mobile_installation' && 'الخدمة المتنقلة الفورية للتركيب'}
                    {showInvoice.deliveryMethod === 'delivery_only' && 'شحن سريع بتغليف خشبي آمن'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">المبلغ المدفوع (شامل الضريبة):</span>
                  <span className="text-emerald-700 font-extrabold text-base font-mono">{showInvoice.totalPrice} ر.س</span>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs text-right flex items-start gap-2.5" id="delivery-notice-box">
                <Info className="w-5 h-5 shrink-0" />
                <p className="leading-relaxed">
                  يمكنك تتبع تقدم طلبك بأي وقت عبر الضغط على <strong>"تتبع الشحنة"</strong> في القائمة العلوية وإدخل رقم التتبع <strong>{showInvoice.trackingNumber}</strong>. سيتواصل معك الفني المختص فوراً لتجهيز وتوصيل زجاج سيارتك.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-xl transition-all cursor-pointer"
                id="invoice-back-btn"
              >
                العودة لتصفح المنتجات
              </button>
            </motion.div>
          ) : cartItems.length === 0 ? (
            /* EMPTY CART STATE */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 space-y-4"
              id="empty-cart-state"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto border border-slate-200 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-emerald-950 font-black text-lg">سلتك لا تزال فارغة</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">تصفح كتالوج الزجاج الفاخر الخاص بنا وأضف الزجاج الملائم لسيارتك للبدء.</p>
              <button
                onClick={onClose}
                className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                id="empty-cart-go-back"
              >
                تصفح كتالوج الزجاج
              </button>
            </motion.div>
          ) : (
            /* CART CONTENT STATE */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
              id="cart-items-form"
            >
              {/* Product items lists */}
              <div className="space-y-4" id="cart-items-list">
                <h3 className="text-emerald-950 font-extrabold text-sm border-b border-slate-200 pb-2">المنتجات المختارة:</h3>
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-center"
                    id={`cart-item-row-${item.product.id}`}
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.arName}
                      className="w-16 h-12 sm:w-20 sm:h-15 rounded-xl object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />

                    {/* Item Details */}
                    <div className="flex-1 space-y-1" id={`cart-item-details-${item.product.id}`}>
                      <h4 className="text-emerald-950 font-extrabold text-xs sm:text-sm line-clamp-1">{item.product.arName}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>سنة الصنع: {item.product.yearStart} - {item.product.yearEnd}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{item.product.price} ر.س</span>
                      </div>

                      {/* Professional Installation Request Switch */}
                      <div className="flex items-center gap-1.5 pt-1.5" id={`cart-item-install-option-${item.product.id}`}>
                        <input
                          type="checkbox"
                          checked={item.installationRequested}
                          onChange={() => onToggleInstall(item.product.id)}
                          className="rounded border-slate-300 bg-white text-emerald-700 focus:ring-0 cursor-pointer"
                          id={`install-checkbox-${item.product.id}`}
                        />
                        <label htmlFor={`install-checkbox-${item.product.id}`} className="text-slate-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer">
                          إضافة خدمة التركيب المعتمدة (+50 ر.س)
                        </label>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex flex-col items-end justify-between gap-3 h-full" id={`cart-item-controls-${item.product.id}`}>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="حذف المنتج من السلة"
                        id={`delete-btn-${item.product.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-slate-200" id={`qty-ctrl-${item.product.id}`}>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                          className="w-5 h-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs flex items-center justify-center font-bold cursor-pointer"
                          id={`plus-${item.product.id}`}
                        >
                          +
                        </button>
                        <span className="text-slate-900 font-bold text-[11px] w-4 text-center font-mono">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-5 h-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs flex items-center justify-center font-bold cursor-pointer"
                          id={`minus-${item.product.id}`}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout shipping details form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-6 pt-4 border-t border-slate-200" id="checkout-order-form">
                <h3 className="text-emerald-950 font-extrabold text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  تفاصيل الشحن وموقع التسليم والتركيب:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="checkout-user-info">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-slate-700 text-xs font-semibold">اسم العميل الثلاثي <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="عبدالله محمد الحربي"
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-600 focus:outline-none transition-colors"
                      id="order-cust-name"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-slate-700 text-xs font-semibold">رقم الجوال الفعال للتنسيق <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-600 focus:outline-none transition-colors font-mono"
                      id="order-cust-phone"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 sm:col-span-2">
                    <label className="text-slate-700 text-xs font-semibold">عنوان البريد الإلكتروني <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-600 focus:outline-none transition-colors"
                      id="order-cust-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="checkout-shipping-loc">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-slate-700 text-xs font-semibold">المدينة <span className="text-red-500">*</span></label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-600 focus:outline-none transition-colors"
                      id="order-cust-city"
                    >
                      {SAUDI_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5 sm:col-span-2">
                    <label className="text-slate-700 text-xs font-semibold">تفاصيل العنوان / موقع السيارة المندوب <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="الحي، اسم الشارع، أو إحداثيات الموقع"
                      className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-600 focus:outline-none transition-colors"
                      id="order-cust-address"
                    />
                  </div>
                </div>

                {/* Delivery and installation method selection */}
                <div className="space-y-2" id="delivery-method-selectors">
                  <label className="text-slate-700 text-xs font-semibold">طريقة التركيب وتلبية الطلب:</label>
                  <div className="grid grid-cols-1 gap-2.5" id="delivery-choices">
                    
                    {/* Branch install */}
                    <label className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${deliveryMethod === 'installation_at_branch' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery_method"
                          checked={deliveryMethod === 'installation_at_branch'}
                          onChange={() => setDeliveryMethod('installation_at_branch')}
                          className="text-emerald-700 focus:ring-0 cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <span className="block text-slate-900 font-bold text-xs">التركيب الاحترافي بالفرع الرئيسي حفر الباطن</span>
                          <span className="block text-slate-500 text-[10px]">تجهيز زجاج سيارتك والتركيب مجانًا بالسيليكون سريع الجفاف.</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-extrabold text-xs">مجاني بالكامل</span>
                    </label>

                    {/* Mobile service install */}
                    <label className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${deliveryMethod === 'mobile_installation' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery_method"
                          checked={deliveryMethod === 'mobile_installation'}
                          onChange={() => setDeliveryMethod('mobile_installation')}
                          className="text-emerald-700 focus:ring-0 cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <span className="block text-slate-900 font-bold text-xs">الخدمة المتنقلة الفورية (إلى موقع سيارتك)</span>
                          <span className="block text-slate-500 text-[10px]">يأتي طاقمنا الفني المتكامل إليك لتركيب الزجاج في بيتك أو مقر عملك.</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-extrabold text-xs font-mono">+150 ر.س</span>
                    </label>

                    {/* Deliver-only wood case packing */}
                    <label className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${deliveryMethod === 'delivery_only' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery_method"
                          checked={deliveryMethod === 'delivery_only'}
                          onChange={() => setDeliveryMethod('delivery_only')}
                          className="text-emerald-700 focus:ring-0 cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <span className="block text-slate-900 font-bold text-xs">شحن سريع بتغليف خشبي آمن (لكافة مدن المملكة)</span>
                          <span className="block text-slate-500 text-[10px]">تعبئة الزجاج داخل أقفاص خشبية متينة ممتصة للصدمات لضمان عدم الكسر.</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-extrabold text-xs font-mono">+75 ر.س</span>
                    </label>

                  </div>
                </div>

                {/* Simulated Payment details */}
                <div className="space-y-4 pt-4 border-t border-slate-200" id="checkout-payment-details">
                  <h3 className="text-emerald-950 font-extrabold text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    بوابة الدفع الرقمي الآمنة (Mada / Apple Pay):
                  </h3>

                  {/* Payment option selectors */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200" id="payment-gateways">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mada')}
                      className={`text-center py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${paymentMethod === 'mada' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                      id="pay-mada"
                    >
                      💳 مدى (Mada)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`text-center py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${paymentMethod === 'apple_pay' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                      id="pay-apple"
                    >
                      🍎 Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`text-center py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${paymentMethod === 'credit_card' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                      id="pay-visa"
                    >
                      💳 بطاقة ائتمانية
                    </button>
                  </div>

                  {/* Payment Credit details input fields */}
                  {paymentMethod !== 'apple_pay' ? (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200" id="credit-inputs">
                      <div className="flex flex-col space-y-1">
                        <label className="text-slate-500 text-[10px] font-semibold">رقم البطاقة المكون من 16 خانة</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0,16))}
                          placeholder="4000 1234 5678 9010"
                          className="bg-white text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none font-mono text-center"
                          id="pay-card-num"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3" id="credit-expiry-row">
                        <div className="flex flex-col space-y-1 col-span-2">
                          <label className="text-slate-500 text-[10px] font-semibold">الاسم المطبوع على البطاقة</label>
                          <input
                            type="text"
                            required
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="AHMED M ALHARBI"
                            className="bg-white text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none text-center"
                            id="pay-card-holder"
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="text-slate-500 text-[10px] font-semibold">تاريخ الانتهاء</label>
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value.slice(0,5))}
                            placeholder="MM/YY"
                            className="bg-white text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none font-mono text-center"
                            id="pay-card-expiry"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-3" id="apple-pay-sim">
                      <p className="text-slate-600 text-xs">اضغط على زر الشراء لإتمام الدفع السريع والآمن بلمسة واحدة عبر حماية Apple Pay الفائقة.</p>
                      <div className="w-32 py-2 bg-slate-900 text-white rounded-xl text-xs font-black mx-auto shadow-md"> Pay</div>
                    </div>
                  )}
                </div>

                {/* Subtotal, tax, and order submission pricing panel */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3" id="pricing-invoice-breakdown">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">المجموع الفرعي للزجاج:</span>
                    <span className="text-slate-800 font-bold font-mono">{subtotal} ر.س</span>
                  </div>
                  {installationFee > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">رسوم تركيب بالفرع (الضمان الذهبي):</span>
                      <span className="text-slate-800 font-bold font-mono">+{installationFee} ر.س</span>
                    </div>
                  )}
                  {deliveryFee > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">
                        {deliveryMethod === 'mobile_installation' ? 'رسوم الخدمة المتنقلة الفنية:' : 'رسوم الشحن والتغليف الخشبي:'}
                      </span>
                      <span className="text-slate-800 font-bold font-mono">+{deliveryFee} ر.س</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">ضريبة القيمة المضافة (15%):</span>
                    <span className="text-slate-800 font-bold font-mono">+{vat} ر.س</span>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="flex justify-between items-center text-sm font-extrabold text-emerald-800">
                    <span>المبلغ الكلي المستحق:</span>
                    <span className="text-lg font-black font-mono">{total} ر.س</span>
                  </div>
                </div>

                {/* Final Order trigger button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/10 hover:scale-[1.01] cursor-pointer"
                  id="final-order-checkout-btn"
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? 'جاري التحقق ومعالجة الدفع الرقمي...' : 'تأكيد الحجز والدفع الفوري الآمن'}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
