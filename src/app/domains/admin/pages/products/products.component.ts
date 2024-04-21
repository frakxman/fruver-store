import { Component, inject, signal } from '@angular/core';

import { TableComponent } from "@shared/components/table/table.component";

import { Product } from '@shared/models/product.model';
import { Category } from '@shared/models/category.model';

import { ProductsService } from '@shared/services/products.service';
import { CategoryService } from '@shared/services/category.service';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [TableComponent]
})
export default class ProductsComponent {

  products: Product[] = [];
  prods = signal<Product[]>([]);
  categs = signal<Category[]>([]);

  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoryService);

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    console.log('Products:', this.products);
  }

  private getProducts() {
    this.productsService.getProducts()
      .subscribe({
        next: (products) => {
          this.prods.set(products);
          this.products =  products;
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
