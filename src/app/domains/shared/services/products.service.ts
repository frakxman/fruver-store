import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<Product[]>([]);

  private http = inject(HttpClient)

  constructor() {
    const initProducts: Product[]  = [
      {
        id: 1,
        name: 'Pro 1',
        price: 100,
        images: ['https://picsum.photos/640/640?r=23'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      },
      {
        id: 2,
        name: 'Pro 2',
        price: 100,
        images: ['https://picsum.photos/640/640?r=12'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      },
      {
        id: 3,
        name: 'Pro 3',
        price: 100,
        images: ['https://picsum.photos/640/640?r=50'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      },
      {
        id: 4,
        name: 'Pro 4',
        price: 100,
        images: ['https://picsum.photos/640/640?r=230'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      },
      {
        id: 5,
        name: 'Pro 5',
        price: 100,
        images: ['https://picsum.photos/640/640?r=121'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      },
      {
        id: 6,
        name: 'Pro 6',
        price: 100,
        images: ['https://picsum.photos/640/640?r=12120'],
        category: {
          id: 1,
          name: 'Category 1',
          image: 'https://picsum.photos/640/640?r=1'
        },
        description: 'Product description',
        quantity: 10,
      }
    ];
    this.products.set(initProducts);
  }

  // getProducts() {
  // //   return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  // }
}
