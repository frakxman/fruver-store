import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  @Input({ required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();

  ngOnInit() {
    console.log('Product:', this.product);
  }

  addCart() {
    this.addToCart.emit(this.product);
  }
}
