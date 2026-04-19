import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Editor } from './features/editor/editor/editor';
import { EditorTest } from './features/editor/editor-test/editor-test';
import { Login } from './features/editor/login/login';
import { Register } from './features/editor/register/register';
import { Dashboard } from './features/dashboard/dashboard';
export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'editor/:id',
    component: EditorTest,
  },
  { path: 'editor', component: EditorTest },
  { path: 'dashboard', component: Dashboard },
];
