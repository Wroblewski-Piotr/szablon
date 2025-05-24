import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {Group} from "./types/group.type";
import {GroupsHttpService} from "./services/groups-http.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-classes',
  templateUrl: './children-groups.component.html',
  styleUrls: ['./children-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/groups',
        alias: 'institution'
      }
    },
    GroupsHttpService
  ]
})
export class ChildrenGroupsComponent implements OnInit {

  groups$: Observable<Group[]> = this.groupsHttpService.getGroups();

  constructor(private groupsHttpService: GroupsHttpService) { }

  ngOnInit(): void {
  }

}
