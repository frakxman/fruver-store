import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  prodsQuantity = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.quantity, 0);
  });
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce( (total, product) => total + (product.price * product.quantity), 0 );
  });

  find(id: number) {
    return this.cart().find(product => product.id === id);
  }

  add(product: Product) {
    this.cart.update(state => {
      const existingProductIndex = state.findIndex(item => item.id === product.id)
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...state, product];
      }
    });
  }

  decreaseQuantity(product: Product) {
  this.cart.update(state => {
    const existingProductIndex = state.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...state];
      updatedCart[existingProductIndex].quantity -= 1;

      if (updatedCart[existingProductIndex].quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      }

      return updatedCart;
    } else {
      return state;
    }
  });
}

removeProduct(product: Product) {
  this.cart.update(state => {
    const existingProductIndex = state.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...state];
      updatedCart.splice(existingProductIndex, 1);
      return updatedCart;
    } else {
      return state;
    }
  });
}

  updateQuantity(product: Product, quantity: number) {
    this.cart.update(state => state.map( p => p.id === product.id ? { ...p, quantity } : p ));
  }
}
