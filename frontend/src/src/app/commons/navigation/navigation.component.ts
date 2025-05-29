import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {NavigationItemConfig} from "./navigation.item.config.type";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@jsverse/transloco";
import { NavigationService } from "./navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TranslocoModule
  ],
  providers: [NavigationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

  items: NavigationItemConfig[];

  constructor(private navigationService: NavigationService) {
    this.items = this.navigationService.getNavigationConfig()
  }

  ngOnInit() {}
}
