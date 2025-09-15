export interface LatLng {
  lat: number;
  lng: number;
}

export interface UserAddress {
  fullAddress: string;
  coordinates: LatLng;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface UserWithAddress extends AuthUser {
  address?: UserAddress;
}

export enum CoffeeType {
  Hot = 'hot',
  Iced = 'iced',
}

export interface ProductVariant {
  id: number;
  size: CoffeeSize;
  price: number;
  stock: number;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
  image: string;
  type: CoffeeType;
}

export interface CartItem {
  id: string;
  product: CoffeeProduct;
  quantity: number;
  size: CoffeeSize;
  productVariantId: number;
}

export enum DeliOption {
  DELIVER = 'delivery',
  PICK_UP = 'pick-up',
}

export enum PaymentMethod {
  CASH = 'cash',
  KBZ_PAY = 'kbz-pay',
  WAVE_MONEY = 'wave-money',
}

export enum CoffeeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  coordinates: LatLng;
}

export interface OrderItem {
  productVariantId: number;
  quantity: number;
  price: number;
  size: CoffeeSize;
}

export interface DeliveryOrder {
  id: string;
  customer: Customer;
  items: OrderItem[];
  deliOption: DeliOption;
  paymentMethod: PaymentMethod;
  totalPayment: number;
  date: string;
  image: string;
}

export type HeroIcon = React.ComponentType<
  React.PropsWithoutRef<React.ComponentProps<'svg'>> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;
