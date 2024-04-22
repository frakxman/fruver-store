import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref,  } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  private cartService = inject(CartService);
  public router = inject(Router);

  cart = this.cartService.cart;
  total = this.cartService.total;

  add(product: Product) {
    this.cartService.add( product );
  }

  minus(product: Product) {
    this.cartService.decreaseQuantity(product);
  }

  remove(product: Product) {
    this.cartService.removeProduct(product);
  }

}
