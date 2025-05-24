import {HttpClient} from '@angular/common/http';
import {provideTransloco, Translation, TranslocoLoader, TranslocoModule} from '@ngneat/transloco';
import {Injectable, NgModule} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
        config: {
          availableLangs: ['en', 'pl'],
          defaultLang: 'pl',
          fallbackLang: 'pl',
          reRenderOnLangChange: true,
          prodMode: environment.production,
        },
        loader: TranslocoHttpLoader
      }
    )
  ]
})
export class TranslocoRootModule {}
