import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components imports
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';

// Modules imports
import { Product } from '@shared/models/product.model';

// Services imports
import { CartService } from '@shared/services/cart.service';
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
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);

  ngOnInit() {
    // this.productsService.getProducts()
    // .subscribe({
    //   next: (products) => {
    //     this.prods.set(products);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // });
    this.prods.set(this.productsService.products());
  }

  addToCart( product: Product ) {
    this.cartService.add(product);
  }

  removeFromCart( product: Product ) {
    this.cartService.remove(product);
  }
}
