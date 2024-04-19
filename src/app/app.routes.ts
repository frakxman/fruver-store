import { Routes } from '@angular/router';

// Components
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component')
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
