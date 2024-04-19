import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  constructor() {}

  getProducts() {
  //   return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getOne(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
}
