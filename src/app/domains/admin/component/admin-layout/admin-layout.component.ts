import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css',
    imports: [CommonModule, HeaderComponent, RouterModule]
})
export class AdminLayoutComponent {

  /**
   * Represents an array of links for the admin layout component.
   */
  links: any[] = [
      { path: '/admin', label: 'Dashboard' },
      { path: '/admin/products', label: 'Products' },
      { path: '/admin/categories', label: 'Categories' },
      { path: '/admin/create', label: 'Create' }
  ];
}
