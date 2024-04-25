import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

import { TableComponent } from "@shared/components/table/table.component";
import { CustomerDataComponent } from "../../components/customer-data/customer-data.component";

import { CartService } from '@shared/services/cart.service';
import { PayMethodsComponent } from "../../components/pay-methods/pay-methods.component";

import { Customer, Order, Payment } from '@shared/models/order.model';

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
  showModal = false;
  step = 0;
  locationData!: Customer;
  payMethodData!: Payment;
  orderData!: Order;


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.logged = !!user;
  }

  userConfirm() {
    this.router.navigate(['/auth/login']);
  }

  onLocation(data: any) {
    console.log(data)
    this.locationData = data;
    this.step++;
  }

  onPayMethod(data: any) {
    console.log(data)
    this.showModal = true;
    const userId = localStorage.getItem('user') ?? '';

    this.orderData = {
      userId: userId,
      locationData: this.locationData,
      payMethodData: data,
      products: this.cart(),
      total: this.total()
    };
  }

  closeModal() {
    this.showModal = false;
  }

  confirmOrder() {
    console.log('Order generated', this.orderData);

    this.cartService.generateOrder(this.orderData)
      .subscribe({
        next: () => {
          this.cartService.cart.set([]);
          this.router.navigate(['/products']);
        },
        error: () => alert('Error generating order')
      });
  }
}
