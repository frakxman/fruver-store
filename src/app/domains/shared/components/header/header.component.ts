import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';

import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  checkout() {
    console.log(this.cart());
    console.log(this.total());
  }

}
