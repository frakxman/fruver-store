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
        name: 'Gourmet',
        description: 'Kitchen technician with extense experience and knowledge in Catering, Sommelier, Barista, Bartender, Waiter and Protocol Master',
        price: 0,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Food',
        quantity: 0,
        isAvailable: false
      },
      {
        id: 2,
        name: 'Full Stack Developer',
        description: 'Technologist in Systems Analysis and Development with emphasis on Fullstack Development with MEAN, MEVN',
        price: 2000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Technology',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 3,
        name: 'Multimedia Producer',
        description: 'Technologist in Multimedia Production with knowledge in Photography, Video, Radial Guidelines, Graphic Design',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Graphic Design',
        quantity: 5,
        isAvailable: true
      },
      {
        id: 4,
        name: 'Drone Pilot',
        description: 'Professional Drone Pilot with specialization in Photogrammetry, Crop Fumigation, Photography and Video with about 180 flight hours',
        price: 1000,
        image: 'https://picsum.photos/640/640?=' + Math.random(),
        category: 'Technology',
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
