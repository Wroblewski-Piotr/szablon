import { PrivilageEnum } from "../enums/privilage.enum";
import { NavigationItemConfig } from "./navigation.item.config.type";

export const PRIVILAGE_NAVIGATION_ITEM_MAP: Record<PrivilageEnum, NavigationItemConfig[]> = {
  [PrivilageEnum.MANAGE_ORGANIZATION_EVENTS]:
    [
      {
        name: 'main.navigation.organized-events',
        path: 'organized-events',
        orderNumber: 10
      },
      {
        name: 'main.navigation.new-event',
        path: 'new-event',
        orderNumber: 20
      }
    ],
  [PrivilageEnum.MANAGE_APPLICATIONS_FOR_ORGANIZATION_EVENTS]: [
    {
      name: 'main.navigation.applications-for-participation',
      path: 'applications-from-participation',
      orderNumber: 30
    }
  ],
  [PrivilageEnum.SEARCH_EVENTS]: [
    {
      name: 'main.navigation.find-events',
      path: 'find-events',
      orderNumber: 40
    }
  ],
  [PrivilageEnum.POSSIBILITY_TO_PARTICIPATE_IN_EVENTS]: [
    {
      name: 'main.navigation.my-events',
      path: 'my-events',
      orderNumber: 50
    }
  ]
}
