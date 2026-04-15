import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Editor } from './features/editor/editor/editor';
import { EditorTest } from './features/editor/editor-test/editor-test';
export const routes: Routes = [
     { path: '', component: Home },
     { path: 'editor', component: EditorTest}
];
