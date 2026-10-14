import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditorApiService, type Book } from './editor-api';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksCountSubject = new BehaviorSubject<number>(0);
  booksCount$ = this.booksCountSubject.asObservable();

  constructor(private api: EditorApiService) {}

  load(userId: string) {
    this.api.getUserBooksFull(userId).subscribe({
      next: (books: Book[]) => {
        this.booksCountSubject.next(books.length);
      },
      error: (err) => {
        console.error('BOOK COUNT LOAD ERROR:', err);
      },
    });
  }

  increment() {
    this.booksCountSubject.next(this.booksCountSubject.value + 1);
  }

  decrement() {
    this.booksCountSubject.next(Math.max(0, this.booksCountSubject.value - 1));
  }
}
