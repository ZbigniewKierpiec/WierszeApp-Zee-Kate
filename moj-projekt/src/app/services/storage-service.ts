import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // 📄 PAGES
  savePages(pages: any[]) {
    localStorage.setItem('pages', JSON.stringify(pages));
  }

  getPages(): any[] {
    const data = localStorage.getItem('pages');
    return data ? JSON.parse(data) : [];
  }

  // 📚 BOOK ID
  saveBookId(id: string) {
    localStorage.setItem('bookId', id);
  }

  getBookId(): string | null {
    return localStorage.getItem('bookId');
  }

  removeBookId() {
    localStorage.removeItem('bookId');
  }

  // 🎨 COVER
  saveCover(cover: any) {
    localStorage.setItem('cover', JSON.stringify(cover));
  }

  getCover(): any {
    const data = localStorage.getItem('cover');
    return data ? JSON.parse(data) : null;
  }
}
