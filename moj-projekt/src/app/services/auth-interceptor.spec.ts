import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('does not attach credentials or refresh for requests to other origins', () => {
    localStorage.setItem('accessToken', 'old-access-token');
    let requestFailed = false;

    http.get('https://example.test/data').subscribe({
      error: () => (requestFailed = true),
    });

    const request = httpTesting.expectOne('https://example.test/data');
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(requestFailed).toBe(true);
    httpTesting.expectNone('http://localhost:3000/api/auth/refresh');
  });

  it('shares one refresh request between concurrent unauthorized requests', async () => {
    localStorage.setItem('accessToken', 'old-access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    const results: unknown[] = [];

    http.get('http://localhost:3000/api/books/first').subscribe((value) => results.push(value));
    http.get('http://localhost:3000/api/books/second').subscribe((value) => results.push(value));

    const firstRequest = httpTesting.expectOne('http://localhost:3000/api/books/first');
    const secondRequest = httpTesting.expectOne('http://localhost:3000/api/books/second');
    expect(firstRequest.request.headers.get('Authorization')).toBe('Bearer old-access-token');
    expect(secondRequest.request.headers.get('Authorization')).toBe('Bearer old-access-token');

    firstRequest.flush({}, { status: 401, statusText: 'Unauthorized' });
    secondRequest.flush({}, { status: 401, statusText: 'Unauthorized' });

    const refreshRequest = httpTesting.expectOne('http://localhost:3000/api/auth/refresh');
    expect(refreshRequest.request.body).toEqual({ refreshToken: 'refresh-token' });
    refreshRequest.flush({ accessToken: 'new-access-token' });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const retriedFirst = httpTesting.expectOne('http://localhost:3000/api/books/first');
    const retriedSecond = httpTesting.expectOne('http://localhost:3000/api/books/second');
    expect(retriedFirst.request.headers.get('Authorization')).toBe('Bearer new-access-token');
    expect(retriedSecond.request.headers.get('Authorization')).toBe('Bearer new-access-token');
    retriedFirst.flush({ id: 'first' });
    retriedSecond.flush({ id: 'second' });

    expect(results).toEqual([{ id: 'first' }, { id: 'second' }]);
    httpTesting.expectNone('http://localhost:3000/api/auth/refresh');
  });

  it('does not enter a refresh loop when a retried request is still unauthorized', async () => {
    localStorage.setItem('accessToken', 'old-access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    let requestFailed = false;

    http.get('http://localhost:3000/api/books/book-1').subscribe({
      error: () => (requestFailed = true),
    });

    httpTesting
      .expectOne('http://localhost:3000/api/books/book-1')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    httpTesting
      .expectOne('http://localhost:3000/api/auth/refresh')
      .flush({ accessToken: 'new-access-token' });

    await new Promise((resolve) => setTimeout(resolve, 0));

    httpTesting
      .expectOne('http://localhost:3000/api/books/book-1')
      .flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(requestFailed).toBe(true);
    httpTesting.expectNone('http://localhost:3000/api/auth/refresh');
  });
});
