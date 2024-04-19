import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components imports
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

// Modules imports
import { Product } from '../../../shared/models/product.model';

// Services imports
import { CartService } from '../../../shared/services/cart.service';

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

  constructor() {
    const initProducts: Product[] = [
      {
        id: 1,
        name: 'Orange',
        description: 'Fresh to make juice.',
        price: 5000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Fruits',
        quantity: 0,
        isAvailable: false
      },
      {
        id: 2,
        name: 'Apple',
        description: 'Green or red, always crispies.',
        price: 2000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Fruits',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 3,
        name: 'Pineapple',
        description: 'Flavored sweet tropical.',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Fruits',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 4,
        name: 'Passion fruit',
        description: 'The Exotic fruit to passion.',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Fruits',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 5,
        name: 'Carrot',
        description: 'Fresh and organic.',
        price: 3000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Vegetables',
        quantity: 0,
        isAvailable: false
      },
      {
        id: 6,
        name: 'Onion',
        description: 'Aromatic and tasty.',
        price: 2000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Vegetables',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 7,
        name: 'Tomato',
        description: 'From the garden to your table.',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Vegetables',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 8,
        name: 'Potato',
        description: 'Versatile and delicious.',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Vegetables',
        quantity: 5,
        isAvailable: true
      }
    ];
    this.prods.set(initProducts);
  }

  addToCart( product: Product ) {
    this.cartService.add(product);
  }
}
