import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

import { TableComponent } from "@shared/components/table/table.component";
import { CustomerDataComponent } from "../../components/customer-data/customer-data.component";

import { CartService } from '@shared/services/cart.service';
import { PayMethodsComponent } from "../../components/pay-methods/pay-methods.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CommonModule, RouterLinkWithHref, TableComponent, CustomerDataComponent, PayMethodsComponent]
})
export default class CartComponent implements OnInit  {

  router = inject(Router);
  private cartService = inject(CartService);

  cart = this.cartService.cart;
  total = this.cartService.total;
  logged = false;
  step = 0;
  locationData: any = {};
  payMethodData: any = {};
  

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.logged = !!user;
  }

  userConfirm() {
    this.router.navigate(['/auth/login']);
  }

  onSubmitLocation(data: any) {
    this.locationData = data;
    this.step++;
  }

  onSubmitPayMethod(data: any) {
    this.payMethodData = data;
    this.step++;
  }

  generateOrder() {
    // if (!this.logged || !this.payMethod) return;

    const userId = localStorage.getItem('user');

    const orderData = {
      userId: userId,
      locationData: this.locationData,
      payMethodData: this.payMethodData
    };

    console.log(orderData);

    this.cartService.generateOrder(orderData)
      .subscribe({
        next: () => {
          this.cartService.cart.set([]);
          this.router.navigate(['/products']);
        },
        error: () => alert('Error generating order')
      });
  }
}
