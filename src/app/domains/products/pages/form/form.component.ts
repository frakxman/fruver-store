import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '@shared/models/category.model';

import { Product } from '@shared/models/product.model';

import { CategoryService } from '@shared/services/category.service';
import { ProductsService } from '@shared/services/products.service';

// import { ProductImagePipe } from "@shared/pipes/prod-img.pipe";

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

  product: Product = {
    id: 0,
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


  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  public productForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    categoryId: ['', [Validators.required]],
    quantity: [0],
    stock: ['', [Validators.required]],
    images: this.fb.array(['']),
  });


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

  addProduct() {
  const newId = this.prods().length + 1;

  const defaultImages = Array.from({ length: 3 }, () => `https://picsum.photos/640/640?r=${Math.random()}`);

  const imagesValue = this.productForm.get('images')?.value;

  this.productForm.patchValue({
    id: newId.toString(),
    images: imagesValue && imagesValue.length ? imagesValue : defaultImages
  });

  console.log('Form value', this.productForm.value)

  this.productService.create(this.productForm.value)
    .subscribe({
      next: (product) => {
        this.prods.update(state => [...state, product]);
        console.log('Product created', product);
        // this.productForm.reset();
      },
      error: (e) => alert('Error creating product')
    });
  }
}
