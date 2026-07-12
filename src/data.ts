/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlassProduct } from './types';

// Let's use clean professional placeholder images that represent high quality car glass
export const GLASS_PRODUCTS: GlassProduct[] = [
  {
    id: 'toyota-camry-front',
    name: 'Toyota Camry Front Windshield',
    arName: 'زجاج أمامي تويوتا كامري (مدعم بالحساسات والحراري)',
    brand: 'تويوتا (Toyota)',
    carModel: 'كامري (Camry)',
    yearStart: 2018,
    yearEnd: 2024,
    type: 'front',
    price: 850,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
    features: ['مقاومة عالية للخدش والكسر', 'دعم حساس المطر التلقائي', 'عازل حراري متكامل للأشعة تحت الحمراء', 'ضمان ذهبي لمدة 5 سنوات من آفاق'],
    quality: 'OEM'
  },
  {
    id: 'hyundai-elantra-front',
    name: 'Hyundai Elantra Front Windshield',
    arName: 'زجاج أمامي هيونداي إلنترا (ثنائي الطبقات عازل للصوت)',
    brand: 'هيونداي (Hyundai)',
    carModel: 'إلنترا (Elantra)',
    yearStart: 2016,
    yearEnd: 2023,
    type: 'front',
    price: 650,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    features: ['تقنية منع الضباب وعزل الصوت', 'حماية بنسبة 99% من الأشعة فوق البنفسجية', 'مطابق لمواصفات الوكالة OES', 'ضمان سنتين ضد التسريب والعيوب'],
    quality: 'OES'
  },
  {
    id: 'gmc-yukon-front',
    name: 'GMC Yukon Front Windshield',
    arName: 'زجاج أمامي جمس يوكن (حجم عائلي مدعم بحراري وعزل صوتي)',
    brand: 'جمس (GMC)',
    carModel: 'يوكن (Yukon)',
    yearStart: 2015,
    yearEnd: 2023,
    type: 'front',
    price: 1200,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    features: ['زجاج مصفح ثنائي الطبقات لزيادة الأمان', 'تقنية عزل الصوت المتقدمة AcoustiGlass', 'متوافق مع أنظمة التنبيه بالخروج عن المسار HUD', 'ضمان 5 سنوات'],
    quality: 'OEM'
  },
  {
    id: 'nissan-patrol-front',
    name: 'Nissan Patrol Front Windshield',
    arName: 'زجاج أمامي نيسان باترول (بطل الدروب مخصص للظروف الصحراوية)',
    brand: 'نيسان (Nissan)',
    carModel: 'باترول (Patrol)',
    yearStart: 2010,
    yearEnd: 2024,
    type: 'front',
    price: 1100,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=600',
    features: ['مقاوم للصدمات والرمال وضغط الرياح العالي', 'تصفية وحماية فائقة من حرارة الشمس', 'مطابق لمعايير الأمان الخليجية SASO', 'ضمان ذهبي ممتد ضد الخدوش والبهتان'],
    quality: 'OEM'
  },
  {
    id: 'toyota-landcruiser-rear',
    name: 'Toyota Land Cruiser Rear Glass',
    arName: 'زجاج خلفي تويوتا لاندكروزر (مجهز بخطوط إذابة الضباب)',
    brand: 'تويوتا (Toyota)',
    carModel: 'لاندكروزر (Land Cruiser)',
    yearStart: 2016,
    yearEnd: 2024,
    type: 'rear',
    price: 950,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
    features: ['نظام تسخين كهربائي متكامل لإزالة الصقيع', 'زجاج سيكوريت عالي المقاومة للصدمات', 'فتحة مجهزة لممسحة الزجاج الخلفية', 'ضمان 3 سنوات على الوصلات الكهربائية'],
    quality: 'OES'
  },
  {
    id: 'ford-taurus-front',
    name: 'Ford Taurus Front Windshield',
    arName: 'زجاج أمامي فورد تورس (مدعم بكاميرات مساعدة القيادة)',
    brand: 'فورد (Ford)',
    carModel: 'تورس (Taurus)',
    yearStart: 2019,
    yearEnd: 2024,
    type: 'front',
    price: 890,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
    features: ['نوافذ مخصصة لحساسات الكاميرا الأمامية والرادار', 'عازل شمس ذو فلترة متطورة', 'معالج ضد الضوضاء الخارجية', 'ضمان شامل 3 سنوات'],
    quality: 'OEM'
  },
  {
    id: 'toyota-camry-side-front-right',
    name: 'Toyota Camry Front Right Side Glass',
    arName: 'زجاج باب جانبي أمامي يمين تويوتا كامري',
    brand: 'تويوتا (Toyota)',
    carModel: 'كامري (Camry)',
    yearStart: 2018,
    yearEnd: 2024,
    type: 'side',
    price: 280,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600',
    features: ['زجاج مقسى سيكوريت مقاوم للكسر التام', 'منحني بدقة لسهولة حركة نافذة الباب', 'تلوين خفيف أصلي مطابق لباقي زجاج السيارة', 'ضمان سنتين'],
    quality: 'Aftermarket'
  },
  {
    id: 'hyundai-sonata-sunroof',
    name: 'Hyundai Sonata Sunroof Glass',
    arName: 'زجاج فتحة سقف بانوراما هيونداي سوناتا',
    brand: 'هيونداي (Hyundai)',
    carModel: 'سوناتا (Sonata)',
    yearStart: 2018,
    yearEnd: 2023,
    type: 'sunroof',
    price: 1550,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    features: ['زجاج مصفح ذو كفاءة حرارية قصوى (99% عزل)', 'مطابق للأبعاد والانحناءات الهندسية للفتحة البانورامية', 'سماكة معززة لحماية فائقة من الأجسام الساقطة', 'ضمان 5 سنوات شامل التركيب'],
    quality: 'OEM'
  }
];

export const SAUDI_CITIES = [
  'حفر الباطن (الفرع الرئيسي)',
  'الرياض',
  'جدة',
  'الدمام',
  'الخبر',
  'الجبيل',
  'المدينة المنورة',
  'مكة المكرمة',
  'تبوك',
  'الأحساء',
  'بريدة',
  'عرعر',
  'سكاكا'
];

export const BRANDS = [
  'تويوتا (Toyota)',
  'هيونداي (Hyundai)',
  'جمس (GMC)',
  'فورد (Ford)',
  'نيسان (Nissan)',
  'مرسيدس (Mercedes)',
  'شفروليه (Chevrolet)',
  'لكزس (Lexus)',
  'بي ام دبليو (BMW)'
];

export const GLASS_TYPES_AR = {
  front: 'زجاج أمامي',
  rear: 'زجاج خلفي',
  side: 'زجاج جانبي',
  sunroof: 'فتحة سقف'
};
