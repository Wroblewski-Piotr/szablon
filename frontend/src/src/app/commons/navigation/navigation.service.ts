import { Injectable } from '@angular/core';
import { NavigationItemConfig } from "./navigation.item.config.type";
import { AuthService } from "../../auth/auth.service";
import { PRIVILAGE_NAVIGATION_ITEM_MAP } from "./navigation.const";
import { MAIN_PANEL_ROUTE_NAMES } from "../../views/main/views/main-panel/main-panel.routes-names";

@Injectable()
export class NavigationService {

  constructor(private authService: AuthService) {
  }

  public getNavigationConfig(): NavigationItemConfig[] {
    return [{
      name: 'main.navigation.main-panel',
      path: MAIN_PANEL_ROUTE_NAMES.BASE,
      orderNumber: 0,
    },
      ...(this.authService.currentSession?.authorities.map(authoritie =>
        PRIVILAGE_NAVIGATION_ITEM_MAP[authoritie]
      ) ?? []).flat().sort((a, b) => a.orderNumber - b.orderNumber)
    ]
  }
}
