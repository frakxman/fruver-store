import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  constructor() {}

  getProducts(category_id?: string) {
    const url = new URL('http://localhost:3000/products');
    if (category_id){
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
}
