import { Component, OnInit } from '@angular/core';

import {TRANSLOCO_SCOPE} from "@ngneat/transloco";
import {AuthService} from "../../../../auth/auth.service";
import {NAVIGATION_CONFIG} from "../../navigation.config";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/main/components/header',
        alias: 'header'
      }
    }
  ]
})
export class HeaderComponent implements OnInit {
  name!: string;
  surname!: string;
  email!: string;
  role!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userSession = this.authService.getSessionFromStorage()!;
    this.name = userSession.name;
    this.surname = userSession.surname;
    this.email = userSession.email;
    this.role = userSession.role;
  }

  logout() {
    this.authService.logout();
  }
}
