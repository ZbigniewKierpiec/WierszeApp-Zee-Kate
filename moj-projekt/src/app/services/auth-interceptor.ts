import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, type HttpEvent } from '@angular/common/http';

import { catchError, switchMap, throwError, type Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
 constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    let authReq = req;

    // 🔐 dodaj token jeśli istnieje
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((err) => {

        // 👉 jeśli NIE ma tokena → to gość → NIC NIE RÓB
        if (!token) {
          return throwError(() => err);
        }

        // 👉 jeśli 401 → spróbuj refresh
        if (err.status === 401 && !req.url.includes('/auth/refresh')) {

          return this.auth.refresh().pipe(
            switchMap(() => {
              const newToken = this.auth.getToken();

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });

              return next.handle(retryReq);
            }),
            catchError((refreshErr) => {
              console.log('❌ refresh failed → logout');

              this.auth.logout(); // tylko dla zalogowanego

              return throwError(() => refreshErr);
            })
          );
        }

        return throwError(() => err);
      })
    );
  }


  
}
