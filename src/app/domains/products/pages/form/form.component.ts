import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Product } from '@shared/models/product.model';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent {

  private fb = inject( FormBuilder );
  private productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    images: [],
    quantity: 0,
    stock: 0
  };

  prods = signal<Product[]>([]);

  public productForm: FormGroup = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    quantity: [0],
    stock: ['', [Validators.required]],
  });

  ngOnInit() {
    this.getProducts();
    this.getProducts();
    if ( !this.router.url.includes('edit') ) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.productService.getOne(id)),
      tap(prod => console.log('Product id', prod._id))
    ).subscribe({
      next: prod => {
        this.productForm.reset({
          ...prod
        })
      },
      error: () => this.router.navigate(['/products'])
    });
  }

  get currentProduct() {
    const product = this.productForm.value as Product;
    return product;
  }

  private getProducts() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.prods.set(products);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSubmit() {

    if (this.productForm.invalid) return;

    // To edit a product
    if (this.currentProduct._id) {
      const { _id, ...productWithoutId } = this.productForm.value;
      this.productService.update(this.currentProduct._id, productWithoutId)
        .subscribe({
          next: (product) => {
            const index = this.prods().findIndex(p => p._id === product._id);
            this.prods.update(state => {
              state[index] = product;
              this.router.navigate(['/admin/products']);
              return state;
            });
            console.log('Product updated', product);
          },
          error: (e) => alert('Error updating product')
        });
      return;
    }

    // To create a product
    const defaultImage = 'https://picsum.photos/640/640?r=' + Math.random();

    const product = {
      ...this.productForm.value,
      quantity: 1,
    };

    delete product._id;

    if (!product.images || product.images.length === 0) {
      product.images = [defaultImage]; 
    }

    this.productService.create(product)
      .subscribe({
        next: (product) => {
          this.prods.update(state => [...state, product]);
          console.log('Product created', product);
          this.router.navigate(['/admin/products']);
          this.productForm.reset();
        },
        error: (e) => alert('Error creating product')
      });
  }
}
