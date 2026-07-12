/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, Sparkles, Wrench, Navigation, Heart, ArrowUp, ChevronLeft, Bell, Star, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CustomRequestForm from './components/CustomRequestForm';
import Cart from './components/Cart';
import NotificationCenter from './components/NotificationCenter';
import OrderTracker from './components/OrderTracker';
import AdminDashboard from './components/AdminDashboard';
import BranchMap from './components/BranchMap';
import { GlassProduct, CartItem, Order, CustomRequest, NotificationSubscription, StockNotification } from './types';
import { GLASS_PRODUCTS, GLASS_TYPES_AR } from './data';

// Pre-populated realistic initial records for beautiful demonstration
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7811',
    customerName: 'فيصل الحربي',
    phone: '0567890123',
    email: 'faisal.harbi@gmail.com',
    city: 'حفر الباطن (الفرع الرئيسي)',
    address: 'شارع الستين، حي البلدية',
    deliveryMethod: 'mobile_installation',
    carDetails: {
      make: 'تويوتا (Toyota)',
      model: 'كامري (Camry)',
      year: 2021
    },
    items: [
      {
        product: GLASS_PRODUCTS[0], // Camry front glass
        quantity: 1,
        installationRequested: true
      }
    ],
    totalPrice: 1125, // Including mobile service and VAT
    status: 'preparing',
    trackingNumber: 'AFQ-777111',
    createdAt: '١٢ / ٧ / ٢٠٢٦'
  },
  {
    id: 'ORD-2099',
    customerName: 'سعد العتيبي',
    phone: '0555432109',
    email: 'saad.otb@hotmail.com',
    city: 'الرياض',
    address: 'حي الملقا، مخرج ٤',
    deliveryMethod: 'delivery_only',
    carDetails: {
      make: 'جمس (GMC)',
      model: 'يوكن (Yukon)',
      year: 2018
    },
    items: [
      {
        product: GLASS_PRODUCTS[2], // GMC Yukon glass
        quantity: 1,
        installationRequested: false
      }
    ],
    totalPrice: 1466, // Including wooden box packing and VAT
    status: 'shipped_out',
    trackingNumber: 'AFQ-888222',
    createdAt: '١٠ / ٧ / ٢٠٢٦'
  }
];

const INITIAL_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 'REQ-101',
    customerName: 'خالد المطيري',
    phone: '0509998887',
    carMake: 'مرسيدس (Mercedes)',
    carModel: 'S-Class S500 بانوراما',
    year: 2023,
    glassType: 'أمامي (HUD & Rain Sensor)',
    details: 'أرجو توفير زجاج أمامي أصلي مجهز لحساس المطر والرادار وتوجيه شاشة العرض الأمامية HUD على الزجاج.',
    status: 'received',
    createdAt: '١٢ / ٧ / ٢٠٢٦'
  }
];

const INITIAL_SUBSCRIPTIONS: NotificationSubscription[] = [
  {
    id: 'SUB-1',
    email: 'abdulaziz.m@gmail.com',
    phone: '0543210987',
    brands: ['تويوتا', 'لكزس']
  }
];

const INITIAL_NOTIFICATIONS: StockNotification[] = [
  {
    id: 'notif-1',
    title: 'وصول دفعة جديدة من زجاج تويوتا لاندكروزر الأصلي',
    content: 'تم بحمد الله تفريغ حاوية زجاج لاندكروزر خلفي مجهز بخطوط إذابة الصباب للثلج والمطر والمدعم من الوكالة بمستودع حفر الباطن.',
    brand: 'تويوتا',
    glassType: 'rear',
    date: '12/07/2026',
    read: false
  },
  {
    id: 'notif-2',
    title: 'تحديث المخزون: زجاج فتحات السقف البانورامية لسيارات هيونداي',
    content: 'يتوفر الآن زجاج بانوراما أصلي بمقاسات هندسية مطابقة تماماً لطرازات سوناتا وتوسان مع طبقة حماية عازلة للأشعة فوق البنفسجية بنسبة 99%.',
    brand: 'هيونداي',
    glassType: 'sunroof',
    date: '11/07/2026',
    read: false
  }
];

export default function App() {
  // Core Business states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(INITIAL_CUSTOM_REQUESTS);
  const [subscriptions, setSubscriptions] = useState<NotificationSubscription[]>(INITIAL_SUBSCRIPTIONS);
  const [notifications, setNotifications] = useState<StockNotification[]>(INITIAL_NOTIFICATIONS);

  // Filter communication states
  const [brandFilter, setBrandFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Navigation toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Real-time live broadcast popups for simulated arrivals marketing
  const [liveArrivalToast, setLiveArrivalToast] = useState<StockNotification | null>(null);

  // Scroll to top helper
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setBrandFilter('');
    setSearchQuery('');
  };

  // Cart operations
  const handleAddToCart = (product: GlassProduct, quantity: number, installationRequested: boolean) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, installationRequested }
            : item
        );
      }
      return [...prevItems, { product, quantity, installationRequested }];
    });
  };

  const handleUpdateCartQty = (productId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleToggleCartInstall = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, installationRequested: !item.installationRequested }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout digital sales trigger
  const handleCheckout = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear cart
  };

  // Custom Glass Request trigger
  const handleCustomRequest = (req: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: CustomRequest = {
      ...req,
      id: 'REQ-' + Math.floor(100 + Math.random() * 900),
      createdAt: new Date().toLocaleDateString('ar-SA'),
      status: 'received'
    };
    setCustomRequests((prev) => [newReq, ...prev]);
  };

  // Brand Alerts Subscription trigger
  const handleNotificationSubscribe = (email: string, phone: string, brands: string[]) => {
    const newSub: NotificationSubscription = {
      id: 'SUB-' + Math.floor(1000 + Math.random() * 9000),
      email,
      phone,
      brands
    };
    setSubscriptions((prev) => [newSub, ...prev]);
  };

  // Receive simulated stock arrival & trigger direct marketing notification
  const handleReceiveNewArrival = (brand: string, type: string, title: string, content: string) => {
    const typeAr = type === 'front' ? 'أمامي' : type === 'rear' ? 'خلفي' : type === 'side' ? 'جانبي' : 'فتحة سقف';
    
    const newNotif: StockNotification = {
      id: 'notif-' + Date.now(),
      title,
      content,
      brand,
      glassType: type,
      date: new Date().toLocaleDateString('ar-SA'),
      read: false
    };

    // Add to notification array
    setNotifications((prev) => [newNotif, ...prev]);

    // Trigger instant beautiful marketing Toast Alert to any browser user!
    setLiveArrivalToast(newNotif);

    // Auto dismiss after 7 seconds
    setTimeout(() => {
      setLiveArrivalToast(null);
    }, 7000);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Admin adjustments
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  const handleDeleteRequest = (requestId: string) => {
    setCustomRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  return (
    <div className="min-h-screen bg-[#040c1e] text-white flex flex-col font-sans select-none overflow-x-hidden antialiased" id="app-wrapper-main">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onAdminToggle={() => setIsAdminActive(!isAdminActive)}
        isAdmin={isAdminActive}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
        notificationsCount={notifications.length}
        onOrderTrackerClick={() => scrollToSection('order-tracker-section')}
        onHomeClick={handleHomeClick}
        scrollToSection={scrollToSection}
      />

      {/* 2. MAJESTIC CINEMATIC HERO */}
      <Hero
        onSearch={(brand, query) => {
          setBrandFilter(brand);
          setSearchQuery(query);
        }}
        onSubscribeClick={() => setIsNotificationsOpen(true)}
      />

      {/* 3. CORE ADVERTISING VALUE GRID (Marketing elements) */}
      <section className="py-16 bg-[#071330] border-t border-b border-amber-500/10 text-right" id="marketing-value-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8" id="marketing-cards-container">
            
            <div className="p-6 bg-[#0b1b3d]/40 rounded-2xl border border-white/5 space-y-3" id="marketing-card-1">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl w-12 h-12 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-extrabold text-base">الضمان الذهبي الحقيقي</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                ننفرد بتقديم ضمان ممتد لمدة 5 سنوات شامل ضد أي عيوب مصنعية أو تسريبات للهواء والمياه لنمنحك راحة بال تامة.
              </p>
            </div>

            <div className="p-6 bg-[#0b1b3d]/40 rounded-2xl border border-white/5 space-y-3" id="marketing-card-2">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl w-12 h-12 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-extrabold text-base">توصيل وتلبية فورية</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                جميع طلبيات زجاج السيارات تشحن داخل أقفاص خشبية مخصصة لحمايتها من الكسر، مع توفير خدمة التركيب أينما كنت.
              </p>
            </div>

            <div className="p-6 bg-[#0b1b3d]/40 rounded-2xl border border-white/5 space-y-3" id="marketing-card-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl w-12 h-12 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-white font-extrabold text-base">طاقم فني معتمد</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                تركيب الزجاج يتم تحت إشراف نخبة من الفنيين المدربين على التعامل مع أحدث حساسات الكاميرات والرادارات بدقة متناهية.
              </p>
            </div>

            <div className="p-6 bg-[#0b1b3d]/40 rounded-2xl border border-white/5 space-y-3" id="marketing-card-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl w-12 h-12 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-white font-extrabold text-base">جودة مطابقة للوكالة</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                نوفر زجاج سيارات أصلي (OEM) ومعتمد عالميًا من أكبر المصانع لتوفير رؤية واضحة ومقاومة ممتازة للصدمات وحرارة الصيف.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ACTIVE ADMIN CONTROL PANEL (CONDITIONAL HOVER/DRAWER) */}
      <AnimatePresence>
        {isAdminActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
            id="admin-dashboard-wrapper"
          >
            <AdminDashboard
              orders={orders}
              customRequests={customRequests}
              subscriptions={subscriptions}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onReceiveNewArrival={handleReceiveNewArrival}
              onDeleteOrder={handleDeleteOrder}
              onDeleteRequest={handleDeleteRequest}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. INTERACTIVE PRODUCT CATALOG */}
      <ProductCatalog
        onAddToCart={handleAddToCart}
        brandFilter={brandFilter}
        searchQuery={searchQuery}
        onBrandFilterChange={setBrandFilter}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Helper callout banner reminding them to try the default codes */}
      <div className="py-6 bg-slate-100 text-center border-y border-slate-200" id="simulation-banner">
        <p className="text-xs text-slate-600 inline-flex items-center gap-2 flex-wrap justify-center px-4">
          💡 <span className="text-emerald-700 font-bold">تجربة سريعة للتتبع:</span> لتجربة نظام التتبع فوراً، انسخ كود التتبع التجريبي: 
          <code className="bg-white text-emerald-950 px-2.5 py-1 rounded font-mono text-xs border border-slate-200 font-bold select-all">AFQ-777111</code> 
          أو 
          <code className="bg-white text-emerald-950 px-2.5 py-1 rounded font-mono text-xs border border-slate-200 font-bold select-all">AFQ-888222</code>
          والصقه في حقل تتبع الشحنة بالأسفل.
        </p>
      </div>

      {/* 6. CUSTOM GLASS REQUEST FOR RARITIES */}
      <CustomRequestForm onSubmitRequest={handleCustomRequest} />

      {/* 7. ORDER STEP STEP STATUS TRACKER */}
      <OrderTracker orders={orders} />

      {/* 8. MAIN BRANCH INTERACTIVE COORDINATE MAP */}
      <BranchMap />

      {/* 9. FOOTER SECTION */}
      <footer className="bg-emerald-950 border-t border-emerald-900 py-12 text-right text-xs text-emerald-100/75" id="app-footer-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-inner">
          <div className="space-y-2 text-center md:text-right" id="footer-copyright-column">
            <span className="block text-white font-black text-sm">آفاق العالمية لزجاج السيارات</span>
            <p className="max-w-md text-emerald-200/50">
              جميع الحقوق محفوظة © ٢٠٢٦. شركة سعودية مرخصة رائدة في استيراد وتوريد وتركيب زجاج السيارات لكافة الطرازات والمقاسات بمعايير الجودة الدولية.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6" id="footer-links-column">
            <button onClick={() => scrollToSection('products-section')} className="hover:text-white transition-colors cursor-pointer">كتالوج المنتجات</button>
            <button onClick={() => scrollToSection('custom-request-section')} className="hover:text-white transition-colors cursor-pointer">طلب زجاج نادر</button>
            <button onClick={() => scrollToSection('order-tracker-section')} className="hover:text-white transition-colors cursor-pointer">تتبع الشحنة</button>
            <button onClick={() => scrollToSection('map-section')} className="hover:text-white transition-colors cursor-pointer">موقع الفرع الرئيسي</button>
          </div>
        </div>
      </footer>

      {/* 10. MODALS & SLIDE DRAWERS OVERLAYS */}
      
      {/* A. Dynamic Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-xs"
              id="cart-drawer-overlay"
            ></motion.div>
            <Cart
              cartItems={cartItems}
              onUpdateQty={handleUpdateCartQty}
              onToggleInstall={handleToggleCartInstall}
              onRemoveItem={handleRemoveCartItem}
              onCheckout={handleCheckout}
              onClose={() => setIsCartOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* B. Dynamic Notifications Modal overlay */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationCenter
            notifications={notifications}
            subscriptions={subscriptions}
            onSubscribe={handleNotificationSubscribe}
            onClearNotifications={handleClearNotifications}
            onClose={() => setIsNotificationsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* C. Real-time simulated push-notification popup marketing Toast */}
      <AnimatePresence>
        {liveArrivalToast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm bg-white border-2 border-emerald-700 text-slate-800 p-5 rounded-2xl shadow-2xl space-y-3"
            id="marketing-push-toast"
          >
            <div className="flex justify-between items-start" id="push-toast-header">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Bell className="w-3 h-3 animate-bounce" />
                تنبيه بضاعة جديدة فوراً!
              </span>
              <button
                onClick={() => setLiveArrivalToast(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
                id="close-push-toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-right" id="push-toast-body">
              <h4 className="text-emerald-950 font-black text-sm">{liveArrivalToast.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{liveArrivalToast.content}</p>
            </div>

            <div className="pt-1 flex justify-end" id="push-toast-footer">
              <button
                onClick={() => {
                  setBrandFilter(liveArrivalToast.brand);
                  setLiveArrivalToast(null);
                  scrollToSection('products-section');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-black text-[11px] py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
                id="push-toast-cta"
              >
                تصفح هذه البضاعة الآن
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* D. Back to top button floater */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-30 p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg hover:scale-110 transition-all cursor-pointer"
            id="back-to-top-btn"
          >
            <ArrowUp className="w-5 h-5 font-black" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
