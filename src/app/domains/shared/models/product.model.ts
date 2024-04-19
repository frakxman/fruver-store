import { Category } from "./category.model";

export interface Product {
  id:          number;
  name:       string;
  price:       number;
  description: string;
  category:    Category;
  images:      string[];
  quantity:    number;
}




