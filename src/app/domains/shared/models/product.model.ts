export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}


