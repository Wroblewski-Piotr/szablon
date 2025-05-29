import { Injectable } from '@angular/core';
import { NavigationItemConfig } from "./navigation.item.config.type";
import { AuthService } from "../../auth/auth.service";
import { PRIVILAGE_NAVIGATION_ITEM_MAP } from "./navigation.const";

@Injectable()
export class NavigationService {

  constructor(private authService: AuthService) {
  }

  public getNavigationConfig(): NavigationItemConfig[] {
    return [{
      name: 'main.navigation.main-panel',
      path: 'main-panel',
      orderNumber: 0,
    },
      ...(this.authService.currentSession?.privilages.map(privilage =>
        PRIVILAGE_NAVIGATION_ITEM_MAP[privilage]
      ) ?? []).flat().sort((a, b) => a.orderNumber - b.orderNumber)
    ]
  }
}
