import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorApiService {
  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  saveBook(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  getBook(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
