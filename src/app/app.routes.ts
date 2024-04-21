import { Routes } from '@angular/router';

// Components
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { AuthLayoutComponent } from './domains/auth/components/auth-layout/auth-layout.component';

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
      },
      {
        path: 'cart',
        loadComponent: () => import('./domains/products/pages/cart/cart.component')
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./domains/auth/pages/register/register.component')
      },
      {
        path: 'login',
        loadComponent: () => import('./domains/auth/pages/login/login.component')
      },
      {
        path: 'create',
        loadComponent: () => import('./domains/products/pages/form/form.component')
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
