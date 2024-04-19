export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}


