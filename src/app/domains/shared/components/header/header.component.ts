import { Component, OnInit, inject, signal } from '@angular/core';

import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { CartService } from '../../services/cart.service';

import { CommonModule } from '@angular/common';

import { TableComponent } from "../table/table.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, RouterLinkWithHref, RouterLinkActive, TableComponent]
})
export class HeaderComponent implements OnInit{

  private cartService = inject(CartService);
  private router = inject(Router);

  hideSideMenu = signal(true);
  prodsTotal = this.cartService.prodsQuantity;
  user = '';

  ngOnInit() {
    this.user = localStorage.getItem('user') ?? '';
  }

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.hideSideMenu.update(() => true);
  }

  logout() {
    localStorage.clear();
    this.user = '';
  }

}
