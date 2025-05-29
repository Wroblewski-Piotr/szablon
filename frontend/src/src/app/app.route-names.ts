import { LOGIN_ROUTE_NAMES } from "./views/login/login.route-names";
import { MAIN_PANEL_ROUTE_NAMES } from "./views/main/views/main-panel/main-panel.routes-names";
import { HOME_PAGE_ROUTE_NAMES } from "./views/home-page/home-page.route-names";

export const MAIN_ROUTE_NAMES = {
  BASE: 'home',
  MAIN_PANEL: MAIN_PANEL_ROUTE_NAMES.BASE
};

export const APP_ROUTE_NAMES = {
  HOME_PAGE: HOME_PAGE_ROUTE_NAMES.BASE,
  LOGIN: LOGIN_ROUTE_NAMES.BASE,
  MAIN: MAIN_ROUTE_NAMES.BASE,
};
