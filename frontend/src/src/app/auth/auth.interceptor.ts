import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError, BehaviorSubject, of, EMPTY} from 'rxjs';
import {catchError, switchMap, filter, first, finalize} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

export const WITHOUT_AUTHORIZATION = 'withoutAuthorization';

const DEFAULT_TRANSLATIONS_PATH = '/assets/i18n/pl.json';
const REFRESH_TOKEN_URL = "api/refreshToken"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly refreshingToken = new BehaviorSubject(false);

  get session() {
    return this.auth.currentSession;
  }

  constructor(private auth: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const {url, headers} = req;
    if (!headers.has(WITHOUT_AUTHORIZATION) && this.session && this.session.accessToken && !url.endsWith(DEFAULT_TRANSLATIONS_PATH)) {
      req = this.withAuthorization(req, this.session.accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handleUnauthorizedError(error);
        }
        if (error.status === 403) {
          if(url.includes(REFRESH_TOKEN_URL)) {
            this.auth.unauthorize();
            this.router.navigateByUrl('/login')
            return EMPTY;
          }
          return this.handleTokenExpirationError(req, next);
        }
        return throwError(error);
      }),
    );
  }

  private withAuthorization(req: HttpRequest<any>, token: string) {
    return req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handleUnauthorizedError(error: HttpErrorResponse) {
    this.auth.unauthorize();
    return throwError(error && error.error);
  }

  private handleTokenExpirationError(req: HttpRequest<any>, next: HttpHandler) {
    const isRefreshTokenExpired = this.auth.unathorizeIfRefreshTokenExpired();
    if(isRefreshTokenExpired) {
      return of();
    }

    if (!this.refreshingToken.value) {
      this.refreshingToken.next(true);

      return this.auth.refresh().pipe(
        switchMap(({accessToken}) => {
          return next.handle(this.withAuthorization(req, accessToken!));
        }),
        finalize(() => {
          this.refreshingToken.next(false);
        })
      );
    }

    return this.refreshingToken.pipe(
      filter(value => !value),
      first(),
      switchMap(() => next.handle(this.withAuthorization(req, this.session!.accessToken!))),
    );
  }
}
