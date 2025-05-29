import { inject } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { APP_ROUTE_NAMES } from "../../app.route-names";
import { Router } from "@angular/router";

export const userAuthenticatedGuard = (): boolean => {
  const authService = inject(AuthService);
  if(authService.refreshTokenNotExistOrExpired()) {
    authService.unathorizeAndRedirect();
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
