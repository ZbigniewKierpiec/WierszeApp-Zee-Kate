import { Injectable } from '@angular/core';
import {
  HttpContextToken,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  type HttpEvent,
} from '@angular/common/http';
import { catchError, from, switchMap, throwError, type Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service';

const RETRIED_AFTER_REFRESH = new HttpContextToken<boolean>(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshInFlight: Promise<string> | null = null;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const trustedRequest = this.auth.isTrustedApiRequest(req.url);
    const token = trustedRequest ? this.auth.getToken() : null;
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (
          !token ||
          !trustedRequest ||
          err.status !== 401 ||
          req.url.includes('/auth/refresh') ||
          req.context.get(RETRIED_AFTER_REFRESH)
        ) {
          return throwError(() => err);
        }

        return from(this.getRefreshedToken()).pipe(
          switchMap((newToken) =>
            next.handle(
              req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
                context: req.context.set(RETRIED_AFTER_REFRESH, true),
              }),
            ),
          ),
        );
      }),
    );
  }

  private getRefreshedToken(): Promise<string> {
    if (!this.refreshInFlight) {
      this.refreshInFlight = firstValueFrom(this.auth.refresh())
        .then(() => {
          const token = this.auth.getToken();
          if (!token) {
            throw new Error('Token refresh completed without an access token.');
          }
          return token;
        })
        .catch((error: unknown) => {
          this.auth.logout();
          throw error;
        })
        .finally(() => {
          this.refreshInFlight = null;
        });
    }

    return this.refreshInFlight;
  }
}
