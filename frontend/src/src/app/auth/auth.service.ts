import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, tap } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserSession} from "./model/user.type";
import { APP_ROUTE_NAMES } from "../app.route-names";

const SESSION_STORAGE_KEY = 'your-doc-session';

@Injectable()
export class AuthService {

  private sessionSubject = new BehaviorSubject(this.getSessionFromStorage());

  constructor(private http: HttpClient, private router: Router) {
  }

  public get currentSession() {
    return this.sessionSubject.value;
  }

  login(email: string, password: string): Observable<UserSession> {
    return this.http
      .post<UserSession>(`api/login`, {email, password}, {
        headers: {withoutAuthorization: 'true'}
      })
      .pipe(
        tap(user => {
          if (user && user.accessToken) {
            this.storeSession(user);
          }
        }),
      );
  }

  refresh(): Observable<UserSession> {
    return this.http.post<UserSession>(`api/refreshToken`, this.currentSession?.refreshToken, {
        headers: {withoutAuthorization: 'true'}
      })
      .pipe(
        tap(user => {
          const newUserSession: UserSession = {
            ...this.getSessionFromStorage()!,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
          }
          this.storeSession(newUserSession);
        })
      );
  }

  logout(): void {
    if (!this.currentSession) {
      this.router.navigate([APP_ROUTE_NAMES.LOGIN]);
      return;
    }
    this.http.post<void>(`api/logout`, this.currentSession, {
      headers: {withoutAuthorization: 'true'}
    }).subscribe()
    this.removeSession();
    this.router.navigate([APP_ROUTE_NAMES.LOGIN]);
  }

  refreshTokenNotExistOrExpired(): boolean {
    const refreshToken = this.getSessionFromStorage()?.refreshToken;
    return !refreshToken || this.tokenExpired(refreshToken);
  }

  private getSessionFromStorage(): UserSession | null {
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  }

  private storeSession(user: UserSession): void {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    this.sessionSubject.next(user);
  }

  private removeSession(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  private tokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
