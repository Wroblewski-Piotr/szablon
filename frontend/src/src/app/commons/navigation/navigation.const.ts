import { AuthoritiesEnum } from "../enums/authoritiesEnum";
import { NavigationItemConfig } from "./navigation.item.config.type";
import { NEW_EVENT_ROUTE_NAMES } from "../../views/main/views/new-event/new-event.routes-names";

export const PRIVILAGE_NAVIGATION_ITEM_MAP: Record<AuthoritiesEnum, NavigationItemConfig[]> = {
  [AuthoritiesEnum.MANAGE_ORGANIZATION_EVENTS]:
    [
      {
        name: 'main.navigation.organized-events',
        path: 'organized-events',
        orderNumber: 10
      },
      {
        name: 'main.navigation.new-event',
        path: NEW_EVENT_ROUTE_NAMES.BASE,
        orderNumber: 20
      }
    ],
  [AuthoritiesEnum.MANAGE_APPLICATIONS_FOR_ORGANIZATION_EVENTS]: [
    {
      name: 'main.navigation.applications-for-participation',
      path: 'applications-from-participation',
      orderNumber: 30
    }
  ],
  [AuthoritiesEnum.SEARCH_EVENTS]: [
    {
      name: 'main.navigation.find-events',
      path: 'find-events',
      orderNumber: 40
    }
  ],
  [AuthoritiesEnum.POSSIBILITY_TO_PARTICIPATE_IN_EVENTS]: [
    {
      name: 'main.navigation.my-events',
      path: 'my-events',
      orderNumber: 50
    }
  ]
}
