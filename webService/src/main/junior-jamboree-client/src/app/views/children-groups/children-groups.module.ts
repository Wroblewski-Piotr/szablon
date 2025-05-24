import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenGroupsComponent } from './children-groups.component';
import {ChildrenGroupsRoutingModule} from "./children-groups-routing.module";

@NgModule({
  declarations: [
    ChildrenGroupsComponent
  ],
    imports: [
        CommonModule,
        ChildrenGroupsRoutingModule,
    ]
})
export class ChildrenGroupsModule { }
