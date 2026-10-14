import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('posts login credentials and stores the returned session', () => {
    localStorage.setItem('bookId', 'old-book');

    service.login({ email: 'reader@example.test', password: 'test-password' }).subscribe();

    const request = httpTesting.expectOne('http://localhost:3000/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'reader@example.test',
      password: 'test-password',
    });
    request.flush({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: { id: 'user-1' },
    });

    expect(localStorage.getItem('accessToken')).toBe('access-token');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
    expect(JSON.parse(localStorage.getItem('user') ?? 'null')).toEqual({ id: 'user-1' });
    expect(localStorage.getItem('bookId')).toBeNull();
  });

  it('refreshes the access token using the stored refresh token', () => {
    localStorage.setItem('refreshToken', 'refresh-token');

    service.refresh().subscribe();

    const request = httpTesting.expectOne('http://localhost:3000/api/auth/refresh');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ refreshToken: 'refresh-token' });
    request.flush({ accessToken: 'new-access-token' });

    expect(localStorage.getItem('accessToken')).toBe('new-access-token');
  });

  it('restricts trusted requests to the configured backend API origin and path', () => {
    expect(service.isTrustedApiRequest('http://localhost:3000/api/books')).toBe(true);
    expect(service.isTrustedApiRequest('http://localhost:3000/api/auth/login')).toBe(true);
    expect(service.isTrustedApiRequest('https://example.test/api/books')).toBe(false);
    expect(service.isTrustedApiRequest('http://localhost:3000/private')).toBe(false);
  });

  it('clears authentication and the selected book id without discarding cached draft data', () => {
    for (const [key, value] of Object.entries({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: '{"id":"user-1"}',
      bookId: 'book-1',
      pages: '[]',
      cover: '{}',
      lang: 'pl',
    })) {
      localStorage.setItem(key, value);
    }

    service.logout();

    for (const key of ['accessToken', 'refreshToken', 'user', 'bookId']) {
      expect(localStorage.getItem(key)).toBeNull();
    }
    expect(localStorage.getItem('pages')).toBe('[]');
    expect(localStorage.getItem('cover')).toBe('{}');
    expect(localStorage.getItem('lang')).toBe('pl');
  });

  it('ignores malformed stored user JSON instead of throwing', () => {
    localStorage.setItem('user', '{invalid');

    expect(service.getUser()).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
