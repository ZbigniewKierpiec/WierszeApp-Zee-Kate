import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(data: { email: string; password: string }) {
    return this.http.post(`${this.api}/register`, data);
  }

  // ✅ LOGIN (połączone wersje)
  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.api}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }

        localStorage.removeItem('bookId');
      }),
    );
  }

  // ✅ REFRESH
  refresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>(`${this.api}/refresh`, { refreshToken }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
      }),
    );
  }

  // ✅ TOKEN
  getToken() {
    return localStorage.getItem('accessToken');
  }

  // ✅ USER
  getUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) return JSON.parse(savedUser);

    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // ✅ ROLE
  getUserRole(): string {
    return this.getUser()?.role || 'user';
  }

  // ✅ USER ID
  getUserId(): string | null {
    const user = this.getUser();
    return user?.id || user?.userId || null;
  }

  // ✅ LOGIN STATUS
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}
