import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";

export const MAIN_CHILDREN_ROUTES = [
  {
    path: 'groups',
    loadChildren: () => import('../children-groups/children-groups.module').then(m => m.ChildrenGroupsModule),
  },
];

export const MAIN_ROUTES = [
  {
    path: '',
    component: MainComponent,
    children: MAIN_CHILDREN_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
