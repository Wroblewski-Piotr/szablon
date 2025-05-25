import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/login/login.routes'),
      },
      {
        path: 'login',
        loadChildren: () => import('./views/login/login.routes')
      },
      {
        path: 'home',
        loadChildren: () => import('./views/main/main.routes')
      },
    ]
  }
]
