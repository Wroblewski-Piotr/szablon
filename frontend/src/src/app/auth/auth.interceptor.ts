import {
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, BehaviorSubject, of, EMPTY, Observable } from 'rxjs';
import {catchError, switchMap, filter, first, finalize} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import { UserSession } from "./model/user.type";

export const WITHOUT_AUTHORIZATION = 'withoutAuthorization';

const DEFAULT_TRANSLATIONS_PATH = '/assets/i18n/pl.json';
const REFRESH_TOKEN_URL = "api/refreshToken"

const refreshingToken$ = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const session = auth.currentSession;

  const {url, headers} = req;
  if (!headers.has(WITHOUT_AUTHORIZATION) && session && session.accessToken && !url.endsWith(DEFAULT_TRANSLATIONS_PATH)) {
    req = withAuthorization(req, session.accessToken);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if(url.includes(REFRESH_TOKEN_URL)) {
          auth.logout();
          return EMPTY;
        }
        return handleAccessTokenExpirationError(req, next, auth, session!);
      }
      return throwError(error);
    }),
  );
}

const handleAccessTokenExpirationError = (req: HttpRequest<any>, next: HttpHandlerFn, auth: AuthService, session: UserSession) => {
  const isRefreshTokenExpired = auth.refreshTokenNotExistOrExpired();
  if(isRefreshTokenExpired) {
    auth.logout();
    return of();
  }

  if (!refreshingToken$.value) {
    refreshingToken$.next(true);

    return auth.refresh().pipe(
      switchMap(({accessToken}) => {
        return next(withAuthorization(req, accessToken!));
      }),
      finalize(() => {
        refreshingToken$.next(false);
      })
    );
  }

  return refreshingToken$.pipe(
    filter(value => !value),
    first(),
    switchMap(() => next(withAuthorization(req, session.accessToken!))),
  );
}

const withAuthorization = (req: HttpRequest<any>, token: string) => {
  return req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
}

