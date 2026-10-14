import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Dashboard } from './dashboard';
import { AuthService } from '../../services/auth-service';
import { BooksService } from '../../services/books-service';
import { EditorApiService } from '../../services/editor-api';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let api: {
    getUserBooksFull: ReturnType<typeof vi.fn>;
    createEmptyBook: ReturnType<typeof vi.fn>;
    deleteBook: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let booksService: { increment: ReturnType<typeof vi.fn>; decrement: ReturnType<typeof vi.fn> };
  let snackBar: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    localStorage.clear();
    api = {
      getUserBooksFull: vi.fn().mockReturnValue(of([])),
      createEmptyBook: vi.fn().mockReturnValue(of({ id: 'book-1' })),
      deleteBook: vi.fn().mockReturnValue(of(null)),
    };
    router = { navigate: vi.fn().mockResolvedValue(true) };
    booksService = { increment: vi.fn(), decrement: vi.fn() };
    snackBar = { open: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: EditorApiService, useValue: api },
        { provide: AuthService, useValue: { getUser: () => ({ id: 'user-1' }), getUserId: () => 'user-1' } },
        { provide: Router, useValue: router },
        { provide: BooksService, useValue: booksService },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) } },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('loads books from the API', () => {
    expect(api.getUserBooksFull).toHaveBeenCalledWith('user-1');
    expect(component.books).toEqual([]);
    expect(component.loading).toBe(false);
    expect(component.loadFailed).toBe(false);
  });

  it('shows an error state rather than the empty-library state when loading fails', () => {
    api.getUserBooksFull.mockReturnValue(throwError(() => new Error('network error')));

    component.loadBooks();

    expect(component.loadFailed).toBe(true);
    expect(component.loading).toBe(false);
    expect(snackBar.open).toHaveBeenCalledWith(
      'DASHBOARD.LOAD_ERROR',
      'OK',
      expect.objectContaining({ verticalPosition: 'top' }),
    );
  });

  it('only reports book creation after the API returns an id', () => {
    api.createEmptyBook.mockReturnValue(of({ id: 'book-2' }));

    component.createBook();

    expect(localStorage.getItem('bookId')).toBe('book-2');
    expect(booksService.increment).toHaveBeenCalledOnce();
    expect(router.navigate).toHaveBeenCalledWith(['/editor']);
  });

  it('does not navigate or increment the count when book creation fails', () => {
    api.createEmptyBook.mockReturnValue(throwError(() => new Error('network error')));

    component.createBook();

    expect(booksService.increment).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith(
      'DASHBOARD.CREATE_ERROR',
      'OK',
      expect.objectContaining({ verticalPosition: 'top' }),
    );
  });

  it('does not remove a book from the dashboard when deletion fails', () => {
    api.deleteBook.mockReturnValue(throwError(() => new Error('network error')));
    component.books = [{ id: 'book-1' }];
    const event = new Event('click');

    component.deleteBook({ id: 'book-1' }, event);

    expect(component.books).toEqual([{ id: 'book-1' }]);
    expect(booksService.decrement).not.toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith(
      'DASHBOARD.DELETE_ERROR',
      'OK',
      expect.objectContaining({ verticalPosition: 'top' }),
    );
  });
});
