import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.api}/register`, data);
  }
  login(data: { email: string; password: string }) {
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((user: any) => {
        this.setUser(user); // 🔥 KLUCZ
        localStorage.removeItem('bookId');
      }),
    );
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    localStorage.removeItem('user');
  }


getUserId(): string | null {
    return localStorage.getItem('user_id');
  }





}
