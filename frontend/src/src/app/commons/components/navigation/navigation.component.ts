import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {NavigationItemConfig} from "./navigation.item.config.type";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@jsverse/transloco";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

  @Input()
  items!: NavigationItemConfig[];

  constructor() { }

  ngOnInit() {}
}
