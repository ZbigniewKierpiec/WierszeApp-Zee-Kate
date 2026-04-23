import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  type HttpEvent
} from '@angular/common/http';
import { AuthService } from './auth-service';
import { catchError, switchMap, throwError, type Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor { 
 constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();

    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {

        if (err.status === 401 && !req.url.includes('/auth/refresh')) {

          return this.auth.refresh().pipe(
            switchMap(() => {

              const newToken = this.auth.getToken();

              const retryReq = authReq.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });

              return next.handle(retryReq);
            }),
            catchError(refreshErr => {
              // 🔥 refresh też padł → logout
              this.auth.logout();
              return throwError(() => refreshErr);
            })
          );
        }

        return throwError(() => err);
      })
    );
  }



}