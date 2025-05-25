import { ActivatedRouteSnapshot, Route } from "@angular/router";

export type AppRouteData = {
  step?: number;
};

export type AppRoute<Data extends AppRouteData = AppRouteData> = Omit<Route, 'data' | 'children'> & {
  data?: Data;
  children?: AppRoutes<Data>;
  pathMatch?: 'full';
};

export type AppActivatedRouteSnapshot<Data extends AppRouteData = AppRouteData> = Omit<
  ActivatedRouteSnapshot,
  'data'
> & {
  data: Data;
};

export type AppRoutes<Data extends AppRouteData = AppRouteData> = AppRoute<Data>[];
