import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';

import { CategoryService } from '@shared/services/category.service';
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
  private categoriesService = inject(CategoryService);
  private productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: {} as any, // TODO: Fix this type
    images: [],
    quantity: 0,
    stock: 0
  };

  categs = signal<Category[]>([]);
  prods = signal<Product[]>([]);

  public productForm: FormGroup = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    category: [''],
    quantity: [0],
    stock: ['', [Validators.required]],
    // images: this.fb.array(['']),
  });

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    if ( !this.router.url.includes('edit') ) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.productService.getOne(id)),
      tap(prod => console.log('Product id', prod._id))
    ).subscribe({
      next: prod => {
        this.productForm.reset({
          ...prod,
          category: prod.category._id
        })
      },
      error: () => this.router.navigate(['/products'])
    });
  }

  get currentProduct() {
    const product = this.productForm.value as Product;
    return product;
  }

  private getCategories() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (categories) => {
          console.log('Categories', categories);
          this.categs.set(categories);
        },
        error: (error) => {
          console.error(error);
        }
      });
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
    console.log(this.productForm.value);
    console.log('Form is valid?', this.productForm.valid);
    console.log('Form errors?',this.productForm.errors);
    if (this.productForm.invalid) return;

    console.log('Current product', this.currentProduct._id);
    if (this.currentProduct._id) {
      console.log('Updating product', this.currentProduct._id, 'with data', this.productForm.value);
      this.productService.update(this.currentProduct._id, this.productForm.value)
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

    const defaultImage = 'https://picsum.photos/640/640?r=' + Math.random();

    this.productForm.patchValue({
      images: [defaultImage]
    });

    this.productService.create(this.productForm.value)
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
