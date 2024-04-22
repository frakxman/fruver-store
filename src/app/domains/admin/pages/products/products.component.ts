import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '@shared/models/product.model';

import { ProductsService } from '@shared/services/products.service';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [CommonModule]
})
export default class ProductsComponent {

  prods = signal<Product[]>([]);
  showModal: boolean = false;
  productToRemove!: Product;

  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.getProducts()
      .subscribe({
        next: (products) => {
          this.prods.set(products);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  edit(product: Product) {
    console.log('Edit product', typeof product.id, product.id);
    const id = product.id;
    this.router.navigate([`/admin/edit/${id!}`]);
  }

  remove(product: Product) {
    this.productsService.remove(product.id!.toString())
      .subscribe({
        next: () => {
          this.getProducts();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
