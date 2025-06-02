import { inject } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { APP_ROUTE_NAMES } from "../../app.route-names";
import { CanActivateFn, Router } from "@angular/router";
import { AuthoritiesEnum } from "../enums/authoritiesEnum";

export const userAuthenticatedGuard = (): boolean => {
  const authService = inject(AuthService);
  if(authService.refreshTokenNotExistOrExpired()) {
    authService.logout();
    return false;
  }
  return true
}

export const userUnauthenticatedGuard = (): boolean => {
  const authService = inject(AuthService);
  if(authService.refreshTokenNotExistOrExpired()) {
    return true;
  }
  inject(Router).navigate([APP_ROUTE_NAMES.MAIN]);
  return false
}

export const haveAuthorityGuard = (authoritie: AuthoritiesEnum): CanActivateFn => {
  return () => inject(AuthService).currentSession?.authorities.includes(authoritie) ?? false;
}
