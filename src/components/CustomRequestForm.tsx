/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, UploadCloud, ClipboardCheck, Info, Check, Sparkles, FileText, X } from 'lucide-react';
import { CustomRequest } from '../types';

interface CustomRequestFormProps {
  onSubmitRequest: (request: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export default function CustomRequestForm({ onSubmitRequest }: CustomRequestFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [glassType, setGlassType] = useState('أمامي');
  const [details, setDetails] = useState('');
  
  // File upload drag & drop states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !carMake || !carModel) return;

    onSubmitRequest({
      customerName,
      phone,
      carMake,
      carModel,
      year: Number(year),
      glassType,
      details: `${details} ${uploadedFile ? `[ملف مرفق: ${uploadedFile.name}]` : ''}`
    });

    // Reset Form fields
    setCustomerName('');
    setPhone('');
    setCarMake('');
    setCarModel('');
    setYear(new Date().getFullYear());
    setGlassType('أمامي');
    setDetails('');
    setUploadedFile(null);

    // Show beautiful success popup
    setShowSuccessModal(true);
  };

  return (
    <section className="py-20 bg-white text-right border-t border-emerald-100" id="custom-request-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-12" id="custom-form-header">
          <div className="inline-flex p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl mb-2 animate-bounce" style={{ animationDuration: '3s' }}>
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black text-emerald-950 font-sans">طلب زجاج سيارة نادر أو غير متوفر</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            هل سيارتك نادرة، فارهة، كلاسيكية، أو لم تجد الزجاج المناسب لها في الكتالوج؟ لا تقلق، فريق الاستيراد السريع في آفاق العالمية سيوفره لك فوراً. املأ البيانات وسيقوم ممثلنا بالتواصل معك في غضون ساعة لتأكيد عرض السعر.
          </p>
        </div>

        {/* Dynamic Interactive Card with form inside */}
        <div className="bg-slate-50 border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-md" id="custom-form-box">
          <form onSubmit={handleSubmit} className="space-y-6" id="custom-request-interactive-form">
            
            {/* Step 1 heading */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs font-mono">1</span>
              <h3 className="text-emerald-950 font-black text-sm sm:text-base">معلومات العميل والاتصال</h3>
            </div>

            {/* Row 1: Name and phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="form-customer-info">
              <div className="flex flex-col space-y-2">
                <label className="text-slate-700 text-xs font-bold">اسم العميل بالكامل <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اكتب اسمك الثلاثي"
                  className="bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right"
                  id="custom-cust-name"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-slate-700 text-xs font-bold">رقم الجوال النشط (واتساب) <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right font-mono"
                  id="custom-cust-phone"
                />
              </div>
            </div>

            {/* Step 2 heading */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 pt-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs font-mono">2</span>
              <h3 className="text-emerald-950 font-black text-sm sm:text-base">مواصفات وطراز المركبة</h3>
            </div>

            {/* Row 2: Car Make, Model, Year, Glass Location */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6" id="form-car-specs">
              <div className="flex flex-col space-y-2 sm:col-span-1">
                <label className="text-slate-700 text-xs font-bold">الشركة المصنعة <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  placeholder="مثال: تويوتا، لكزس"
                  className="bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right"
                  id="custom-car-make"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:col-span-1">
                <label className="text-slate-700 text-xs font-bold">اسم الطراز / الفئة <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="مثال: أفالون، LX570"
                  className="bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right"
                  id="custom-car-model"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:col-span-1">
                <label className="text-slate-700 text-xs font-bold">سنة الصنع (الموديل)</label>
                <input
                  type="number"
                  min={1970}
                  max={new Date().getFullYear() + 1}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="bg-white text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right font-mono"
                  id="custom-car-year"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:col-span-1">
                <label className="text-slate-700 text-xs font-bold">مكان الزجاج المطلوب</label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="bg-white text-slate-800 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:border-emerald-600 focus:outline-none transition-all"
                  id="custom-glass-type"
                >
                  <option value="أمامي">زجاج أمامي</option>
                  <option value="خلفي">زجاج خلفي</option>
                  <option value="جانبي (أمام يمين)">جانبي (أمام يمين)</option>
                  <option value="جانبي (أمام يسار)">جانبي (أمام يسار)</option>
                  <option value="جانبي (خلف يمين)">جانبي (خلف يمين)</option>
                  <option value="جانبي (خلف يسار)">جانبي (خلف يسار)</option>
                  <option value="فتحة سقف بانوراما">فتحة سقف بانوراما</option>
                  <option value="آخر">زجاج آخر مخصص</option>
                </select>
              </div>
            </div>

            {/* Row 3: Special specs description */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">المواصفات المطلوبة أو تفاصيل إضافية (اختياري)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="مثال: مجهز بحفر لرادارات الاستشعار، عزل حراري إضافي، لون زجاج محدد..."
                className="bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition-all text-right"
                id="custom-car-details"
              ></textarea>
            </div>

            {/* Custom Drag-and-Drop File Uploader */}
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 text-xs font-bold">أرفق صورة لزجاج السيارة أو الرمز التسلسلي (اختياري)</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-emerald-600 bg-emerald-500/5' 
                    : uploadedFile 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-300 bg-white hover:border-emerald-600/50'
                }`}
                id="drag-drop-uploader-box"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="custom-file-input"
                />

                {uploadedFile ? (
                  <div className="text-center space-y-2" id="uploader-success-state">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full inline-block">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="text-slate-800 font-extrabold text-sm">{uploadedFile.name}</p>
                    <p className="text-slate-500 text-[11px]">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-700 text-xs font-bold underline flex items-center gap-1 mx-auto cursor-pointer"
                      id="remove-attached-file"
                    >
                      حذف الملف المرفق
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-2 text-slate-500 hover:text-slate-800 transition-colors" id="uploader-empty-state">
                    <UploadCloud className="w-10 h-10 text-emerald-700/80 mx-auto animate-pulse" />
                    <p className="text-slate-700 font-bold text-xs sm:text-sm">اسحب وأفلت صورة الزجاج المكسور أو رمز الهيكل هنا</p>
                    <p className="text-slate-400 text-xs">أو انقر يدويّاً للتصفح من جهازك</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit CTA button */}
            <div className="pt-4" id="submit-form-row">
              <button
                type="submit"
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-lg shadow-emerald-700/10 hover:scale-[1.02] cursor-pointer"
                id="submit-custom-request"
              >
                إرسال طلب الاستيراد السريع لآفاق
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* POPUP CONFIRMATION MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="form-success-popup-wrapper">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
              id="success-popup-overlay"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white border border-emerald-100 p-8 rounded-3xl max-w-md w-full shadow-2xl z-10 text-center space-y-6"
              id="success-popup-box"
            >
              <div className="mx-auto p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl w-16 h-16 flex items-center justify-center">
                <ClipboardCheck className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-emerald-950 font-black text-xl">تم استلام طلبك الخاص بنجاح!</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  شكرًا لاختيارك آفاق العالمية. تم تسجيل طلب الزجاج برقم تذكرة مخصص. يقوم منسق الخدمات لدينا بمراجعة مستودعات الاستيراد وسيتواصل معك مباشرة على رقم الجوال عبر الواتساب لتزويدك بعرض السعر الأفضل.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 rounded-xl transition-colors cursor-pointer"
                id="close-success-popup-btn"
              >
                حسنًا، فمت بالاستيعاب
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
