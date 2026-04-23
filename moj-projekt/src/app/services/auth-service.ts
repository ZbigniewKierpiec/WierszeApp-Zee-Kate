import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {


private api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { email, password }).pipe(
      tap(res => {
        console.log('🔥 LOGIN RESPONSE', res);

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  refresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>(`${this.api}/refresh`, { refreshToken }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.clear();
  }
}












