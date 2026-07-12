/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, Bell, Settings, Search, ShieldCheck, MapPin, ClipboardList, HelpCircle } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onAdminToggle: () => void;
  isAdmin: boolean;
  onNotificationsClick: () => void;
  notificationsCount: number;
  onOrderTrackerClick: () => void;
  onHomeClick: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({
  cartCount,
  onCartClick,
  onAdminToggle,
  isAdmin,
  onNotificationsClick,
  notificationsCount,
  onOrderTrackerClick,
  onHomeClick,
  scrollToSection
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-sm" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={onHomeClick} id="logo-container">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg shadow-emerald-700/20" id="logo-icon-wrap">
              {/* Abstract luxury car windshield icon */}
              <div className="absolute inset-1 rounded-lg bg-white flex items-center justify-center">
                <span className="text-emerald-700 font-black text-xl font-sans">أ</span>
                <div className="absolute bottom-1 w-6 h-[2px] bg-amber-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-emerald-950 font-black text-xl tracking-wide font-sans leading-tight">آفاق العالمية</span>
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">لزجاج السيارات</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 space-x-reverse" id="desktop-nav">
            <button 
              onClick={onHomeClick}
              className="text-emerald-950 hover:text-emerald-700 font-semibold text-sm transition-colors cursor-pointer"
              id="nav-home"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => scrollToSection('products-section')}
              className="text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors cursor-pointer"
              id="nav-products"
            >
              المنتجات
            </button>
            <button 
              onClick={() => scrollToSection('custom-request-section')}
              className="text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors cursor-pointer"
              id="nav-custom-order"
            >
              طلب زجاج خاص
            </button>
            <button 
              onClick={onOrderTrackerClick}
              className="text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1.5"
              id="nav-track"
            >
              <ClipboardList className="w-4 h-4 text-emerald-700" />
              تتبع الشحنة
            </button>
            <button 
              onClick={() => scrollToSection('map-section')}
              className="text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1"
              id="nav-map"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              موقعنا
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse" id="header-actions">
            
            {/* Notifications Alert Bell */}
            <button 
              onClick={onNotificationsClick}
              className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 transition-all border border-slate-200/80 hover:border-emerald-300 group cursor-pointer"
              title="التنبيهات ووصول البضاعة"
              id="bell-button"
            >
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all hover:scale-105 shadow-md shadow-emerald-700/10 flex items-center gap-2 font-bold group cursor-pointer"
              id="cart-button"
            >
              <ShoppingCart className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline text-sm">السلة</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

            {/* Admin Toggle button */}
            <button 
              onClick={onAdminToggle}
              className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold border cursor-pointer ${
                isAdmin 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
              title="لوحة تحكم الإدارة"
              id="admin-toggle-btn"
            >
              <Settings className={`w-5 h-5 ${isAdmin ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="hidden lg:inline">{isAdmin ? 'لوحة التحكم نشطة' : 'لوحة الإدارة'}</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
