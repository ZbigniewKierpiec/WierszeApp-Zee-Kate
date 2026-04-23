import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
