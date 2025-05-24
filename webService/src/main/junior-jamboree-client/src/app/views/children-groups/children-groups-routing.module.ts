import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChildrenGroupsComponent} from "./children-groups.component";

export const INSTITUTION_MAIN_ROUTES = [
  {
    path: '',
    component: ChildrenGroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(INSTITUTION_MAIN_ROUTES)],
  exports: [RouterModule]
})
export class ChildrenGroupsRoutingModule {}
