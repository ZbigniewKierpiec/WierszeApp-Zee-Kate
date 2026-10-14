import { routes } from './../../app.routes';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { EditorApiService } from '../../services/editor-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { BooksService } from '../../services/books-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import  { AuthService } from '../../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  books: any[] = [];
  loading = true;
  loadFailed = false;
  lastBookId = localStorage.getItem('bookId');
  constructor(
    private api: EditorApiService,
   private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadBooks(user.id);
  }

  loadBooks(userId = this.auth.getUserId()): void {
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.loadFailed = false;
    this.api.getUserBooksFull(userId).subscribe({
      next: (books: any) => {
        this.books = books;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ LOAD BOOKS ERROR:', err);
        this.loadFailed = true;
        this.loading = false;
        this.snackBar.open(this.translate.instant('DASHBOARD.LOAD_ERROR'), 'OK', {
          duration: 3500,
          verticalPosition: 'top',
        });
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
    if (typeof res?.id !== 'string' || !res.id.trim()) {
      console.error('CREATE BOOK RESPONSE DID NOT INCLUDE A BOOK ID');
      this.snackBar.open(this.translate.instant('DASHBOARD.CREATE_ERROR'), 'OK', {
        duration: 3500,
        verticalPosition: 'top',
      });
      return;
    }

    localStorage.setItem('bookId', res.id);

    this.booksService.increment(); // 🔥 KLUCZ

    this.router.navigate(['/editor']);
  }, (err) => {
    console.error('❌ CREATE BOOK ERROR:', err);
    this.snackBar.open(this.translate.instant('DASHBOARD.CREATE_ERROR'), 'OK', {
      duration: 3500,
      verticalPosition: 'top',
    });
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
        this.snackBar.open(this.translate.instant('DASHBOARD.DELETE_ERROR'), 'OK', {
          duration: 3500,
          verticalPosition: 'top',
        });
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

          if (this.lastBookId === book.id) {
            this.lastBookId = null;
            localStorage.removeItem('bookId');
            localStorage.removeItem('pages');
            localStorage.removeItem('cover');
          }

          this.router.navigate(['editor']);
        },
        error: (err) => {
          console.error('DELETE ERROR:', err);
          this.snackBar.open(this.translate.instant('DASHBOARD.DELETE_ERROR'), 'OK', {
            duration: 3500,
            verticalPosition: 'top',
          });
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
