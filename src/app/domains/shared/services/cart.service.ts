import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce( (total, product) => total + product.price, 0 );
  });

  add(product: Product) {
    this.cart.update(state => [...state, product] );
  }  

  remove(product: Product) {
    this.cart.update(state => state.filter( p => p.id !== product.id ));
  }

  updateQuantity(product: Product, quantity: number) {
    this.cart.update(state => state.map( p => p.id === product.id ? { ...p, quantity } : p ));
  }
}
