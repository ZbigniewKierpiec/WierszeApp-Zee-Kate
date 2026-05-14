import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Editor } from './features/editor/editor/editor';
import { EditorTest } from './features/editor/editor-test/editor-test';
import { Login } from './features/editor/login/login';
import { Register } from './features/editor/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './main-layout/main-layout';
import { AuthGuard } from './services/auth-guard';
import { PoemEditor } from './features/poem-editor/poem-editor';

// export const routes: Routes = [
//   // 🔓 bez layoutu
//   { path: '', component: Home },
//   { path: 'login', component: Login },
//   { path: 'register', component: Register },

//   // 🔒 layout tylko dla wybranych tras
//   {
//     path: '',
//     component: MainLayout,
//     children: [
//       { path: 'dashboard', component: Dashboard },
//       { path: 'editor', component: EditorTest },
//       { path: 'editor/:id', component: EditorTest },
//     ],
//   },
// ];
export const routes: Routes = [
  // 🔓 public bez layoutu
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🔓 cała aplikacja z layoutem (BEZ guard)
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'editor', component: EditorTest },
      { path: 'editor/:id', component: EditorTest },
      { path: 'dashboard', component: Dashboard },
      { path: 'poem-editor', component: PoemEditor },
      { path: 'poem-editor/:id', component: PoemEditor },
    ],
  },

  // fallback
  { path: '**', redirectTo: '' },
];
