import { Component, Input, inject } from '@angular/core';

import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: string;
  private productService = inject(ProductsService);

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
         console.log(product);         
        }
      });
    }
  }
}
