/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GlassProduct {
  id: string;
  name: string; // Brand names (e.g. Toyota Camry Front Windshield)
  arName: string; // Arabic name
  brand: string; // e.g., Toyota, Hyundai, GMC, Mercedes, Ford, Nissan
  carModel: string; // Camry, Accent, Yukon, S-Class, etc.
  yearStart: number;
  yearEnd: number;
  type: 'front' | 'rear' | 'side' | 'sunroof';
  price: number;
  stock: number;
  image: string;
  features: string[]; // e.g., عازل حراري، حساس مطر، عازل صوت، معالج للأشعة فوق البنفسجية
  quality: 'OEM' | 'OES' | 'Aftermarket'; // جودة أصلية، جودة معتمدة، جودة بديلة بضمان
}

export interface CartItem {
  product: GlassProduct;
  quantity: number;
  installationRequested: boolean; // طلب خدمة التركيب
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryMethod: 'delivery_only' | 'installation_at_branch' | 'mobile_installation'; // توصيل فقط، تركيب بالفرع، خدمة متنقلة
  carDetails: {
    make: string;
    model: string;
    year: number;
    vin?: string;
  };
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'shipped_out' | 'completed'; // معلق، جاري التجهيز، جاري التوصيل/التركيب، مكتمل
  trackingNumber: string;
  createdAt: string;
}

export interface CustomRequest {
  id: string;
  customerName: string;
  phone: string;
  carMake: string;
  carModel: string;
  year: number;
  glassType: string;
  details: string;
  status: 'received' | 'pricing' | 'approved' | 'unavailable';
  createdAt: string;
}

export interface NotificationSubscription {
  id: string;
  email: string;
  phone: string;
  brands: string[];
}

export interface StockNotification {
  id: string;
  title: string;
  content: string;
  brand: string;
  glassType: string;
  date: string;
  read: boolean;
}
