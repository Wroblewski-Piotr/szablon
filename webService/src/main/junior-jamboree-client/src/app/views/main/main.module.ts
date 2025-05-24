import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from "./main-routing.module";
import {HeaderModule} from "./components/header/header.module";
import {NavigationModule} from "../../commons/components/navigation/navigation.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    NavigationModule
  ]
})
export class MainModule {
}
