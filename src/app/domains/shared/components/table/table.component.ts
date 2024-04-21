import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  private cartService = inject(CartService);

  cart = this.cartService.cart;
  total = this.cartService.total;

}
