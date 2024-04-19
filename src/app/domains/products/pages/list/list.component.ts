import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components imports
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';

// Modules imports
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';

// Services imports
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  prods = signal<Product[]>([]);
  categs = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoryService);

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  addToCart( product: Product ) {
    this.cartService.add(product);
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

 private getCategories() {
  this.categoriesService.getCategories()
    .subscribe({
      next: (categories) => {
        this.categs.set(categories);
      },
      error: (error) => {
        console.error(error);
      }
    });
 }
}
