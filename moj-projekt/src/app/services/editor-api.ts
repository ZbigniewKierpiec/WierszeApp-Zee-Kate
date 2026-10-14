import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../api-config';
export interface Book {
  id: string;
  title: string;
  cover: any;
  pages_count: number;
  preview: any;
  updated_at: string;
}
@Injectable({
  providedIn: 'root',
})
export class EditorApiService {
  private apiUrl = `${API_BASE_URL}/books`;





  constructor(private http: HttpClient) {}

  saveBook(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  // 🔥 FIX — dodaj user_id
  getBook(id: string, userId: string) {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get(`${this.apiUrl}/${id}`, { params });
  }

  getUserBooks(userId: string) {
    return this.http.get(`${API_BASE_URL}/books/user/${userId}`);
  }

  getUserBooksFull(userId: string) {
    return this.http.get<Book[]>(`${API_BASE_URL}/books/user/${userId}/full`);
  }


  deleteBook(id: string, userId: string) {
    const params = new HttpParams().set('user_id', userId);
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }




  createEmptyBook(userId: string) {
    return this.http.post(this.apiUrl, {
      user_id: userId,
      title: 'Mój tomik',
      cover: {
        title: 'Mój tomik',
        author: '',
        image: '',
        bgColor: '#000000',
        textColor: '#ffffff',
      },
      pages: [],
      selectedTheme: '',
    });
  }



}
