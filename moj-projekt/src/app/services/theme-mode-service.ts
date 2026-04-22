import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  // private key = 'theme-mode';

  // init() {
  //   const saved = localStorage.getItem(this.key);

  //   if (saved) {
  //     this.set(saved as 'light' | 'dark');
  //   } else {
  //     // auto detect system
  //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //     this.set(prefersDark ? 'dark' : 'light');
  //   }
  // }

  // toggle() {
  //   const current = this.get();
  //   this.set(current === 'dark' ? 'light' : 'dark');
  // }

  // set(mode: 'light' | 'dark') {
  //   document.body.classList.remove('light', 'dark');
  //   document.body.classList.add(mode);

  //   localStorage.setItem(this.key, mode);
  // }

  // get(): 'light' | 'dark' {
  //   return (localStorage.getItem(this.key) as any) || 'light';
  // }


 private key = 'theme-mode';

  mode = signal<'light' | 'dark'>('light'); // 🔥

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
    this.mode.set(mode); // 🔥

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);

    localStorage.setItem(this.key, mode);
  }

  get(): 'light' | 'dark' {
    return this.mode(); // 🔥
  }












}
