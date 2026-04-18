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


 createEmptyBook() {
    return this.http.post(this.apiUrl, {
      title: 'Mój tomik',
      cover: {
        title: 'Mój tomik',
        author: '',
        image: '',
        bgColor: '#000000',
        textColor: '#ffffff',
      },
      pages: [],
      selectedTheme: ''
    });
  }






}
