import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from "@angular/router";
import { TranslocoModule } from "@ngneat/transloco";



@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslocoModule
  ]
})
export class NavigationModule { }
