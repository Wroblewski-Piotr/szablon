import { Routes } from "@angular/router";
import { MainComponent } from "./views/main/main.component";
import { APP_ROUTE_NAMES } from "./app.route-names";
import { MAIN_PANEL_ROUTE_NAMES } from "./views/main/views/main-panel/main-panel.routes-names";
import {
  haveAuthorityGuard,
  userAuthenticatedGuard,
  userUnauthenticatedGuard
} from "./commons/guards/user-authenticated.guard";
import { NEW_EVENT_ROUTE_NAMES } from "./views/main/views/new-event/new-event.routes-names";
import { AuthoritiesEnum } from "./commons/enums/authoritiesEnum";

export const APP_ROUTES: Routes = [
  {
    path: APP_ROUTE_NAMES.HOME_PAGE,
    canActivate: [userUnauthenticatedGuard],
    loadChildren: () => import('./views/home-page/home-page.routes')
  },
  {
    path: APP_ROUTE_NAMES.LOGIN,
    canActivate: [userUnauthenticatedGuard],
    loadChildren: () => import('./views/login/login.routes')
  },
  {
    path: APP_ROUTE_NAMES.MAIN,
    component: MainComponent,
    canActivate: [userAuthenticatedGuard],
    children: [
      {
        path: MAIN_PANEL_ROUTE_NAMES.BASE,
        loadChildren: () => import('./views/main/views/main-panel/main-panel.routes')
      },
      {
        path: NEW_EVENT_ROUTE_NAMES.BASE,
        canActivate: [haveAuthorityGuard(AuthoritiesEnum.MANAGE_ORGANIZATION_EVENTS)],
        loadChildren: () => import('./views/main/views/new-event/new-event.routes')
      },
      {
        path: '**',
        redirectTo: MAIN_PANEL_ROUTE_NAMES.BASE,
      },
    ]
  },
  {
    path: '**',
    redirectTo: APP_ROUTE_NAMES.HOME_PAGE,
    canActivate: [userUnauthenticatedGuard],
  },
]
