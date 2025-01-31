import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
      loadComponent: () =>
        import('./page/login/login.component').then(
          (m) => m.LoginComponent
        ),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
