import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

import { TableComponent } from "@shared/components/table/table.component";

import { CartService } from '@shared/services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CommonModule,RouterLinkWithHref, TableComponent]
})
export default class CartComponent {

  private cartService = inject(CartService);
  router = inject(Router);

  cart = this.cartService.cart;
  total = this.cartService.total;

  userConfirm() {
    this.router.navigate(['/auth/login']);
  }

}
