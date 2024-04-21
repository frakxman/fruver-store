import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  private cartService = inject(CartService);
  public router = inject(Router);

  cart = this.cartService.cart;
  total = this.cartService.total;

  add(product: Product) {
    console.log('add');
    this.cartService.add( product );
  }

  minus(product: Product) {
    console.log('minus');
    this.cartService.remove(product);
  }

  userConfirm() {
    this.router.navigate(['/auth/login']);
  }
}
