import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_BASE_URL } from '../api-config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = `${API_BASE_URL}/auth`;

  constructor(private http: HttpClient) {}

  isTrustedApiRequest(url: string): boolean {
    try {
      const apiUrl = new URL(API_BASE_URL, globalThis.location.origin);
      const requestUrl = new URL(url, apiUrl);
      const apiPath = apiUrl.pathname.replace(/\/+$/, '');
      return (
        requestUrl.origin === apiUrl.origin &&
        (requestUrl.pathname === apiPath || requestUrl.pathname.startsWith(`${apiPath}/`))
      );
    } catch {
      return false;
    }
  }

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
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem('user');
      }
    }

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
    localStorage.removeItem('bookId');
  }
}
