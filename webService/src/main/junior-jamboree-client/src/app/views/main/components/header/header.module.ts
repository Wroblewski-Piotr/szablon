import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NavigationModule} from "../../../../commons/components/navigation/navigation.module";
import {RouterModule} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";
import {AppButtonModule} from "../../../../commons/components/form-components/button";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AppButtonModule,
    TranslocoModule,
  ]
})
export class HeaderModule {
}
