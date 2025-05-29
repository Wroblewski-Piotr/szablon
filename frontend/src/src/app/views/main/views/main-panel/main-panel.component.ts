import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TRANSLOCO_SCOPE, TranslocoDirective } from "@jsverse/transloco";
import { AuthService } from "../../../../auth/auth.service";
import { Card } from "primeng/card";
import { MainPanelItemType, MainPanelItemTypeEnum } from "./main-panel.model";
import { NgTemplateOutlet } from "@angular/common";
import { OrganizationTypeEnum } from "../../../../commons/enums/organization-type-enum";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslocoDirective,
    Card,
    NgTemplateOutlet
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/main/views/main-panel',
        alias: 'main-panel'
      }
    }
  ]
})
export class MainPanelComponent {
  MainPanelItemTypeEnum = MainPanelItemTypeEnum;
  mainPanelItems: MainPanelItemType[] = this.authService.currentSession?.organizationType === OrganizationTypeEnum.ORGANIZER ?
    [
      {
        mainPanelItemType: MainPanelItemTypeEnum.ORGANIZED_EVENTS,
        numberOfEvents: 5,
      },
      {
        mainPanelItemType: MainPanelItemTypeEnum.APPLICATIONS_FOR_PARTICIPATION,
        allApplicationsNumber: 12,
      },
    ] :
    [
      {
        mainPanelItemType: MainPanelItemTypeEnum.FIND_EVENTS,
        numberOfEventsInMyArea: 3,
      },
      {
        mainPanelItemType: MainPanelItemTypeEnum.MY_EVENTS,
        numberOfMyEvents: 7,
      }
    ]

  constructor(private authService: AuthService) {
  }
}
