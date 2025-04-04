import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
      loadComponent: () =>
        import('./page/form/form.component').then(
          (m) => m.FormComponent
        ),
    pathMatch: 'full'
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./page/form/form.component').then(
        (m) => m.FormComponent
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'generation',
    loadComponent: () =>
      import('./page/generation/generation.component').then(
        (m) => m.GenerationComponent
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
