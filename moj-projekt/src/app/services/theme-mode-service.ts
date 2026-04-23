import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// export class ThemeModeService {
//   private key = 'theme-mode';
//   theme$ = new BehaviorSubject<'light' | 'dark'>('light');
//   mode = signal<'light' | 'dark'>('light'); // 🔥

//   init() {
//     const saved = localStorage.getItem(this.key);

//     if (saved) {
//       this.set(saved as 'light' | 'dark');
//     } else {
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       this.set(prefersDark ? 'dark' : 'light');
//     }
//   }

//   toggle() {
//     const next = this.mode() === 'dark' ? 'light' : 'dark';
//     this.set(next);
//   }

//   set(mode: 'light' | 'dark') {
//     this.mode.set(mode); // 🔥

//     document.body.classList.remove('light', 'dark');
//     document.body.classList.add(mode);

//     localStorage.setItem(this.key, mode);

//     this.theme$.next(mode);
//   }

//   get(): 'light' | 'dark' {
//     return this.mode(); // 🔥
//   }
// }
export class ThemeModeService {
  private key = 'theme-mode';

  theme$ = new BehaviorSubject<'light' | 'dark'>('light');
  mode = signal<'light' | 'dark'>('light');

  init() {
    const saved = localStorage.getItem(this.key);

    if (saved) {
      this.set(saved as 'light' | 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');
    }
  }

  toggle() {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.set(next);
  }

  set(mode: 'light' | 'dark') {
    this.mode.set(mode);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);

    localStorage.setItem(this.key, mode);

    // 🔥 najważniejsze — emit PO zmianie DOM
    queueMicrotask(() => {
      this.theme$.next(mode);
    });
  }

  get(): 'light' | 'dark' {
    return this.mode();
  }
}