import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { NAVIGATION_CONFIG } from './navigation.config';
import {TRANSLOCO_SCOPE} from "@ngneat/transloco";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/main',
        alias: 'main'
      }
    }
  ]
})
export class MainComponent implements OnInit {
  readonly NAVIGATION_CONFIG = NAVIGATION_CONFIG;

  constructor() { }

  ngOnInit(): void {
  }

}
