import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { EditorApiService } from './editor-api';

describe('EditorApiService', () => {
  let service: EditorApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EditorApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('posts a new empty book with the current create payload', () => {
    service.createEmptyBook('user-1').subscribe();

    const request = httpTesting.expectOne('http://localhost:3000/api/books');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      user_id: 'user-1',
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
    request.flush({ id: 'book-1' });
  });

  it('posts the supplied book when saving', () => {
    const payload = {
      id: 'book-1',
      user_id: 'user-1',
      title: 'A book',
      pages: [],
    };

    service.saveBook(payload).subscribe();

    const request = httpTesting.expectOne('http://localhost:3000/api/books');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(payload);
    request.flush({ id: 'book-1' });
  });

  it('gets a book using its id and owner query parameter', () => {
    service.getBook('book-1', 'user-1').subscribe();

    const request = httpTesting.expectOne(
      (candidate) =>
        candidate.url === 'http://localhost:3000/api/books/book-1' &&
        candidate.params.get('user_id') === 'user-1',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ id: 'book-1', pages: [] });
  });

  it('loads the full user book list', () => {
    service.getUserBooksFull('user-1').subscribe();

    const request = httpTesting.expectOne(
      'http://localhost:3000/api/books/user/user-1/full',
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('deletes a book using its id and owner query parameter', () => {
    service.deleteBook('book-1', 'user-1').subscribe();

    const request = httpTesting.expectOne(
      (candidate) =>
        candidate.url === 'http://localhost:3000/api/books/book-1' &&
        candidate.params.get('user_id') === 'user-1',
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
