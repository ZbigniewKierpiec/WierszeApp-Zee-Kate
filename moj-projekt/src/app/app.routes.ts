import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home/home').then((m) => m.Home) },
  {
    path: 'login',
    loadComponent: () => import('./features/editor/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/editor/register/register').then((m) => m.Register),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'editor',
        loadComponent: () =>
          import('./features/editor/editor-test/editor-test').then((m) => m.EditorTest),
      },
      {
        path: 'editor/:id',
        loadComponent: () =>
          import('./features/editor/editor-test/editor-test').then((m) => m.EditorTest),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'poem-editor',
        loadComponent: () =>
          import('./features/poem-editor/poem-editor').then((m) => m.PoemEditor),
      },
      {
        path: 'poem-editor/:id',
        loadComponent: () =>
          import('./features/poem-editor/poem-editor').then((m) => m.PoemEditor),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
