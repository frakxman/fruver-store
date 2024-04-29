import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '@env/environments';

import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
