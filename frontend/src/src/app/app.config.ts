import { ApplicationConfig, Injectable } from "@angular/core";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { provideTransloco, Translation, TranslocoLoader } from "@jsverse/transloco";
import { environment } from "../environments/environment";
import { AuthService } from "./auth/auth.service";
import { AppToastrService } from "./commons/toastr/app-toastr.service";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import Nora from '@primeng/themes/nora';

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideTransloco({
        config: {
          availableLangs: ['pl'],
          defaultLang: 'pl',
          fallbackLang: 'pl',
          reRenderOnLangChange: true,
          prodMode: environment.production,
        },
        loader: TranslocoHttpLoader
      }
    ),
    provideHttpClient(),
    AuthService,
    provideToastr(),
    provideAnimations(),
    AppToastrService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Nora
      }
    })
  ]
}
