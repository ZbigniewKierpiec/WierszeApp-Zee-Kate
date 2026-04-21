import { routes } from './../../app.routes';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { EditorApiService } from '../../services/editor-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { BooksService } from '../../services/books-service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  books: any[] = [];
  loading = true;
  lastBookId = localStorage.getItem('bookId');
  constructor(
    private api: EditorApiService,
    private auth: Auth,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private booksService: BooksService,
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getUserBooksFull(user.id).subscribe({
      next: (books: any) => {
        console.log(books);
        this.books = books;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ LOAD BOOKS ERROR:', err);
        this.loading = false;
      },
    });
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  openBook(book: any) {
    localStorage.setItem('bookId', book.id);
    this.router.navigate(['/editor']);
  }

  // createBook() {
  //   const user = this.auth.getUser();

  //   if (!user?.id) {
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   this.api.createEmptyBook(user.id).subscribe((res: any) => {
  //     localStorage.setItem('bookId', res.id);
  //     this.router.navigate(['/editor']);
  //   });
  // }



createBook() {
  const user = this.auth.getUser();

  if (!user?.id) {
    this.router.navigate(['/login']);
    return;
  }

  this.api.createEmptyBook(user.id).subscribe((res: any) => {
    localStorage.setItem('bookId', res.id);

    this.booksService.increment(); // 🔥 KLUCZ

    this.router.navigate(['/editor']);
  });
}







  goToLastBook() {
    const lastId = localStorage.getItem('bookId');

    if (!lastId) return;

    this.router.navigate(['/editor']);
  }

  getVariantStylesForPreview(p: any) {
    return this.getVariantStylesBase(p?.template, p?.variant?.name);
  }

  getVariantStylesBase(t: string, v?: string) {
    if (t === 'Floral') {
      if (!v || v === 'Soft') return { border: '3px solid pink', borderRadius: '16px' };
    }

    if (t === 'Romantic') {
      if (v === 'Hearts') {
        return {
          border: '2px solid #f9a8d4',
          borderRadius: '20px',
          backgroundColor: '#fff1f2',
          position: 'relative',
        };
      }
    }

    if (t === 'Dark') {
      return {
        background: '#111827',
        color: 'white',
      };
    }

    return {};
  }

  deleteBook(book: any, event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      panelClass: 'custom-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== true) return;

      const userId = this.auth.getUserId();
      if (!userId) {
        console.error('NO USER ID');
        return;
      }

      // this.api.deleteBook(book.id, userId).subscribe({
      //   next: () => {
      //     this.books = this.books.filter((b) => b.id !== book.id);
      //     this.router.navigate(['editor']);
      //   },
      //   error: (err) => {
      //     console.error('DELETE ERROR:', err);
      //   },
      // });

      this.api.deleteBook(book.id, userId).subscribe({
        next: () => {
          this.books = this.books.filter((b) => b.id !== book.id);

          this.booksService.decrement(); // 🔥 KLUCZ

          this.router.navigate(['editor']);
        },
        error: (err) => {
          console.error('DELETE ERROR:', err);
        },
      });
    });
  }

  goBackToEditor() {
    // jeśli masz ostatnią książkę → otwórz ją
    if (this.lastBookId) {
      this.router.navigate(['editor', this.lastBookId]);
      return;
    }

    // jeśli NIE ma → po prostu wejdź do editora
    this.router.navigate(['editor']);
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
