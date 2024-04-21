import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uploadImage(file: File) {
    throw new Error('Method not implemented.');
  }

  private http = inject(HttpClient);
  private url = new URL('http://localhost:3000/products');

  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(`${this.url}`);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(product: Product) {
    return this.http.post<Product>(`${this.url}`, product);
  }

  update(id: string, changes: Partial<Product>) {
    return this.http.patch<Product>(`${this.url}/${id}`, changes);
  }

  remove(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
