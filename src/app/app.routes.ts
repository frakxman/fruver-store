import { Routes } from '@angular/router';

// Components
import { ListComponent } from './domains/products/pages/list/list.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
