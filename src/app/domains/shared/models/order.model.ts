import { Product } from "./product.model";

export interface Order {
  userId: string;
  locationData: Customer;
  payMethodData: Payment;
  products: Product[];
  total: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Payment {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
