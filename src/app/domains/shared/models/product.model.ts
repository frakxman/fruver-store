import { Category } from "./category.model";

export interface Product {
  _id:         string;
  name:        string;
  price:       number;
  description: string;
  quantity:    number;
  stock:       number;
  images:      string[];
}




