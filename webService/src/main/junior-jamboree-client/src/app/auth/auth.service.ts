import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserSession} from "./model/user.type";

const SESSION_STORAGE_KEY = 'your-doc-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionSubject = new BehaviorSubject(this.getSessionFromStorage());

  readonly session = this.sessionSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  public get currentSession() {
    return this.sessionSubject.value;
  }

  public get isLoggedIn() {
    return this.currentSession!!;
  }

  login(email: string, password: string) {
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

  refresh() {
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

  logout() {
    if (!this.currentSession) {
      return;
    }
    this.unauthorize();
  }

  unauthorize() {
    this.removeSession();
    this.router.navigate(['login']);
  }

  unathorizeIfRefreshTokenExpired() {
    const refreshToken = this.getSessionFromStorage()?.refreshToken;
    if(!refreshToken || this.tokenExpired(refreshToken)) {
      this.router.navigate(['login']);
      this.unauthorize();
      return true;
    }
    return false;
  }

  getSessionFromStorage(): UserSession | null {
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  }

  private storeSession(user: UserSession) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    this.sessionSubject.next(user);
  }

  private removeSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
