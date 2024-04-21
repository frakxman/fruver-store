import { Category } from "./category.model";

export interface Product {
  id?:         number;
  name:        string;
  price:       number;
  description: string;
  category:    Category;
  quantity:    number;
  stock:       number;
  images:      string[];
}




