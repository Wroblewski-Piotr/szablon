import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from "@angular/router";
import {FormFieldModule} from "../../commons/components/form-components/form-field";
import {AppButtonModule} from "../../commons/components/form-components/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  DefaultTranspiler,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TRANSLOCO_TRANSPILER,
  TranslocoModule
} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "../../transloco-root.module";
import {environment} from "../../../environments/environment";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    FormFieldModule,
    AppButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'pl'],
        defaultLang: 'pl',
        fallbackLang: 'pl',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }
    }
  ]
})
export class LoginModule {
}
