/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Info, ShoppingCart, Check, ShieldCheck, HelpCircle, X, Sparkles, Filter } from 'lucide-react';
import { GlassProduct } from '../types';
import { GLASS_PRODUCTS, GLASS_TYPES_AR, BRANDS } from '../data';

interface ProductCatalogProps {
  onAddToCart: (product: GlassProduct, quantity: number, installationRequested: boolean) => void;
  brandFilter: string;
  searchQuery: string;
  onBrandFilterChange: (brand: string) => void;
  onSearchQueryChange: (query: string) => void;
}

export default function ProductCatalog({
  onAddToCart,
  brandFilter,
  searchQuery,
  onBrandFilterChange,
  onSearchQueryChange
}: ProductCatalogProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<GlassProduct | null>(null);
  const [installOption, setInstallOption] = useState<boolean>(true);
  const [qty, setQty] = useState<number>(1);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // Apply filtering
  const filteredProducts = GLASS_PRODUCTS.filter((product) => {
    // 1. Brand filter
    if (brandFilter && !product.brand.toLowerCase().includes(brandFilter.toLowerCase())) {
      return false;
    }

    // 2. Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchArName = product.arName.toLowerCase().includes(q);
      const matchModel = product.carModel.toLowerCase().includes(q);
      const matchYear = product.yearStart.toString().includes(q) || product.yearEnd.toString().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchName && !matchArName && !matchModel && !matchYear && !matchBrand) {
        return false;
      }
    }

    // 3. Type filter
    if (selectedType !== 'all' && product.type !== selectedType) {
      return false;
    }

    // 4. Quality filter
    if (selectedQuality !== 'all' && product.quality !== selectedQuality) {
      return false;
    }

    return true;
  });

  const handleOpenDetails = (product: GlassProduct) => {
    setActiveProduct(product);
    setInstallOption(true);
    setQty(1);
  };

  const handleCloseDetails = () => {
    setActiveProduct(null);
  };

  const handleAddToCartClick = (product: GlassProduct, quantity: number, install: boolean) => {
    onAddToCart(product, quantity, install);
    setShowSuccessToast(product.arName);
    setTimeout(() => {
      setShowSuccessToast(null);
    }, 3000);
    handleCloseDetails();
  };

  const getQualityBadge = (quality: 'OEM' | 'OES' | 'Aftermarket') => {
    switch (quality) {
      case 'OEM':
        return { label: 'أصلي وكالة (OEM)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80' };
      case 'OES':
        return { label: 'معتمد جودة أصلية (OES)', color: 'bg-blue-50 text-blue-800 border-blue-200/80' };
      case 'Aftermarket':
        return { label: 'بديل جودة عالية (Aftermarket)', color: 'bg-amber-50 text-amber-800 border-amber-200/80' };
    }
  };

  const getGlassTypeIcon = (type: string) => {
    switch (type) {
      case 'front': return '🚗 [أمامي]';
      case 'rear': return '🚘 [خلفي]';
      case 'side': return '🚙 [جانبي]';
      case 'sunroof': return '🌅 [فتحة سقف]';
      default: return '💎';
    }
  };

  return (
    <section className="py-20 bg-slate-50 text-right" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="catalog-section-header">
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-sans flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-emerald-700"></span>
            كتالوج المنتجات الفاخرة لزجاج السيارات
            <span className="w-8 h-[2px] bg-emerald-700"></span>
          </h2>
          <p className="text-slate-600 text-base">
            تصفّح تشكيلتنا الشاملة من الزجاج المصمم بأعلى المعايير والمقاسات الدقيقة التي تلائم طراز سيارتك تماماً. جميع الزجاج مضمون ضد أي عيوب أو تهريب للمياه أو الهواء.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 mb-12 shadow-sm" id="catalog-filter-card">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="filter-controls-grid">
            
            {/* 1. Quick Search */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">بحث بالكلمة الدلالية</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder="مثال: لاندكروزر، زجاج أمامي..."
                  className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors text-right"
                  id="catalog-search-input"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* 2. Brand Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">تصفية حسب الشركة المصنعة</label>
              <select
                value={brandFilter}
                onChange={(e) => onBrandFilterChange(e.target.value)}
                className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                id="catalog-brand-filter"
              >
                <option value="">كل الماركات</option>
                {BRANDS.map((br) => (
                  <option key={br} value={br}>{br}</option>
                ))}
              </select>
            </div>

            {/* 3. Glass Location Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">مكان الزجاج بالسيارة</label>
              <div className="grid grid-cols-5 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200" id="glass-location-segmented">
                <button
                  type="button"
                  onClick={() => setSelectedType('all')}
                  className={`text-center py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${selectedType === 'all' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  id="loc-filter-all"
                >
                  الكل
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('front')}
                  className={`text-center py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${selectedType === 'front' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  id="loc-filter-front"
                >
                  أمامي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('rear')}
                  className={`text-center py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${selectedType === 'rear' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  id="loc-filter-rear"
                >
                  خلفي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('side')}
                  className={`text-center py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${selectedType === 'side' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  id="loc-filter-side"
                >
                  جانبي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('sunroof')}
                  className={`text-center py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${selectedType === 'sunroof' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  id="loc-filter-roof"
                >
                  سقف
                </button>
              </div>
            </div>

            {/* 4. Quality Standard Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">معايير الجودة والتصنيع</label>
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                id="catalog-quality-filter"
              >
                <option value="all">كل معايير الجودة</option>
                <option value="OEM">أصلي وكالة (OEM)</option>
                <option value="OES">معتمد جودة أصلية (OES)</option>
                <option value="Aftermarket">بديل مضمون (Aftermarket)</option>
              </select>
            </div>

          </div>

          {/* Reset Filters Quick link */}
          {(brandFilter || searchQuery || selectedType !== 'all' || selectedQuality !== 'all') && (
            <div className="mt-4 flex justify-end" id="reset-filters-row">
              <button
                type="button"
                onClick={() => {
                  onBrandFilterChange('');
                  onSearchQueryChange('');
                  setSelectedType('all');
                  setSelectedQuality('all');
                }}
                className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                id="reset-filters-btn"
              >
                <X className="w-3.5 h-3.5" />
                إعادة تعيين كافة الفلاتر
              </button>
            </div>
          )}

        </div>

        {/* Catalog Grid View */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="catalog-products-grid">
            {filteredProducts.map((product) => {
              const qBadge = getQualityBadge(product.quality);
              return (
                <motion.div
                  key={product.id}
                  layout
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 transition-all group"
                  id={`product-card-${product.id}`}
                >
                  {/* Image Container with Hover Zoom and Glass Overlay */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden" id={`img-container-${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.arName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glass position indicator badge */}
                    <div className="absolute top-3 right-3 bg-emerald-900/90 border border-emerald-800/20 px-3 py-1 rounded-full text-white text-xs font-semibold" id={`badge-pos-${product.id}`}>
                      {getGlassTypeIcon(product.type)} {GLASS_TYPES_AR[product.type]}
                    </div>
                    {/* Stock indicator */}
                    <div className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-xs font-bold ${product.stock > 5 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`} id={`badge-stock-${product.id}`}>
                      {product.stock > 0 ? `متوفر: ${product.stock} حبة` : 'نفذت الكمية'}
                    </div>
                  </div>

                  {/* Product Details info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4" id={`info-container-${product.id}`}>
                    <div className="space-y-2">
                      <span className="text-emerald-800 text-xs font-bold tracking-wider">{product.brand}</span>
                      <h3 className="text-emerald-950 font-black text-sm sm:text-base leading-snug line-clamp-2 h-11" id={`title-${product.id}`}>
                        {product.arName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400" id={`model-years-${product.id}`}>
                        <span>الملائمة:</span>
                        <span className="text-slate-700 font-bold">{product.carModel}</span>
                        <span>({product.yearStart} - {product.yearEnd})</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {/* Quality indicator block */}
                      <div className={`text-[11px] px-2.5 py-1 rounded-lg border inline-block font-bold ${qBadge.color}`} id={`quality-tag-${product.id}`}>
                        {qBadge.label}
                      </div>

                      {/* Pricing block */}
                      <div className="flex items-baseline justify-between" id={`pricing-block-${product.id}`}>
                        <span className="text-slate-500 text-xs font-bold">السعر الأساسي:</span>
                        <span className="text-emerald-800 text-xl font-black font-mono">
                          {product.price} <span className="text-xs font-sans">ر.س</span>
                        </span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="grid grid-cols-5 gap-2 pt-2" id={`actions-${product.id}`}>
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(product)}
                          className="col-span-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          title="تفاصيل ومواصفات"
                          id={`btn-details-${product.id}`}
                        >
                          <Info className="w-3.5 h-3.5 text-emerald-700" />
                          التفاصيل
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddToCartClick(product, 1, true)}
                          disabled={product.stock === 0}
                          className="col-span-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-400 text-white py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-102 shadow-md shadow-emerald-700/5 cursor-pointer"
                          id={`btn-cart-${product.id}`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          أضف للسلة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm" id="catalog-no-results">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-emerald-950 font-extrabold text-lg">لم نعثر على زجاج مطابق لبحثك</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              لا تقلق! يمكنك تقديم "طلب زجاج خاص" مخصص وسنوفر لك الزجاج النادر لسيارتك من مستودعاتنا المركزية أو نستورده لك فوراً بأفضل الأسعار.
            </p>
            <button
              onClick={() => {
                const formElement = document.getElementById('custom-request-section');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all inline-block cursor-pointer"
              id="no-results-custom-btn"
            >
              تقديم طلب زجاج خاص الآن
            </button>
          </div>
        )}

      </div>

      {/* SUCCESS TOAST FLOATER */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-white border-2 border-emerald-600 text-emerald-950 p-4 rounded-xl shadow-2xl flex items-center gap-3"
            id="success-toast"
          >
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm">تمت الإضافة للسلة بنجاح!</p>
              <p className="text-slate-600 text-xs">{showSuccessToast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL DETAILED MODAL */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="product-details-modal-wrapper">
            {/* Modal Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
              id="details-modal-overlay"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white border border-emerald-100 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-right p-6 sm:p-8"
              id="details-modal-box"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full border border-slate-200 cursor-pointer"
                id="details-modal-close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4" id="details-modal-grid">
                
                {/* Right col: Product Image & Interactive Glass positioning card */}
                <div className="space-y-4" id="details-modal-left-col">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.arName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  </div>

                  {/* Schematic Car outline showing glass location */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3" id="car-schematic-wrap">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-bold text-xs">موقع تركيب قطعة الزجاج:</span>
                      <span className="text-emerald-800 font-extrabold text-xs bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        {GLASS_TYPES_AR[activeProduct.type]}
                      </span>
                    </div>

                    {/* Simple graphical car outline detailing where the glass goes */}
                    <div className="relative h-24 border border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-100/50" id="car-shape-outline">
                      <span className="text-[10px] text-slate-400 absolute top-1 font-mono">CAR BODY PREVIEW</span>
                      
                      <div className="w-36 h-10 border-2 border-slate-300 rounded-full relative flex items-center justify-around" id="car-body-graphic">
                        {/* Wheels */}
                        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-slate-400 rounded-full"></div>
                        <div className="absolute -bottom-1 left-6 w-3 h-3 bg-slate-400 rounded-full"></div>
                        {/* Selected Glass Highlight */}
                        <div className={`absolute top-0 w-8 h-4 rounded-t-lg border-2 ${activeProduct.type === 'front' ? 'border-emerald-600 bg-emerald-500/20 right-6 animate-pulse' : 'border-slate-300'}`}></div>
                        <div className={`absolute top-0 w-8 h-4 rounded-t-lg border-2 ${activeProduct.type === 'rear' ? 'border-emerald-600 bg-emerald-500/20 left-6 animate-pulse' : 'border-slate-300'}`}></div>
                        <div className={`absolute top-0 w-12 h-4 rounded-t-lg border-2 ${activeProduct.type === 'side' ? 'border-emerald-600 bg-emerald-500/20 left-12 animate-pulse' : 'border-slate-300'}`}></div>
                        <div className={`absolute -top-1 w-6 h-1.5 rounded-sm border-2 ${activeProduct.type === 'sunroof' ? 'border-emerald-600 bg-emerald-500/20 left-16 animate-pulse' : 'border-slate-300'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left col: Specifications, options & Add to cart */}
                <div className="space-y-6 flex flex-col justify-between" id="details-modal-right-col">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-emerald-800 font-extrabold text-xs">{activeProduct.brand}</span>
                      <h2 className="text-emerald-950 font-black text-xl sm:text-2xl leading-snug">
                        {activeProduct.arName}
                      </h2>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2">
                      <h4 className="text-emerald-950 font-bold text-xs">مواصفات ومميزات الزجاج:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600" id="specs-list">
                        {activeProduct.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 font-bold shrink-0">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 font-bold shrink-0">✓</span>
                          <span>الجودة والتصنيف: <span className="text-emerald-800 font-bold">{getQualityBadge(activeProduct.quality).label}</span></span>
                        </li>
                      </ul>
                    </div>

                    <hr className="border-slate-150" />

                    {/* Installation Request Switch */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between" id="install-switch-card">
                      <div className="space-y-1 text-right pl-4">
                        <span className="block text-slate-900 font-bold text-xs sm:text-sm">طلب خدمة التركيب والضمان الذهبي</span>
                        <span className="block text-slate-500 text-[10px] sm:text-xs">يتضمن التركيب الفوري الفائق بمادة السيليكون الأصلية وضمان 5 سنوات.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setInstallOption(!installOption)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${installOption ? 'bg-emerald-700' : 'bg-slate-300'}`}
                        id="install-toggle-switch"
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${installOption ? '-translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between" id="qty-selector-wrap">
                      <span className="text-slate-700 font-bold text-xs">الكمية المطلوبة:</span>
                      <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 border border-slate-200" id="qty-controls">
                        <button
                          type="button"
                          onClick={() => setQty(Math.min(activeProduct.stock, qty + 1))}
                          disabled={qty >= activeProduct.stock}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-black text-sm flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-xs"
                          id="qty-plus"
                        >
                          +
                        </button>
                        <span className="text-slate-900 font-bold text-sm w-6 text-center font-mono">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          disabled={qty <= 1}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-black text-sm flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-xs"
                          id="qty-minus"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Modal Price summary and Checkout action */}
                  <div className="space-y-4 pt-4 border-t border-slate-200" id="modal-checkout-footer">
                    <div className="flex items-baseline justify-between" id="modal-total-price">
                      <span className="text-slate-700 font-bold text-sm">الإجمالي:</span>
                      <div className="text-left">
                        <span className="block text-emerald-800 text-2xl sm:text-3xl font-black font-mono">
                          {activeProduct.price * qty} <span className="text-sm font-sans">ر.س</span>
                        </span>
                        {installOption && (
                          <span className="text-emerald-700 text-[10px] sm:text-xs block font-bold">
                            ✓ يشمل خدمة التركيب المعتمدة مجاناً بالفرع أو بموقعك
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCartClick(activeProduct, qty, installOption)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/10 cursor-pointer"
                      id="modal-add-to-cart-btn"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      إضافة السلة وإتمام الحجز
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
