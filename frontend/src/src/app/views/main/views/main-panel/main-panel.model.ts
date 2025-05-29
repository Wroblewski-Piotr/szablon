export enum MainPanelItemTypeEnum {
  ORGANIZED_EVENTS = 'ORGANIZED_EVENTS',
  APPLICATIONS_FOR_PARTICIPATION = 'APPLICATIONS_FOR_PARTICIPATION',

  FIND_EVENTS = 'FIND_EVENTS',
  MY_EVENTS = 'MY_EVENTS',
}

export type OrganizedEventsItemType = {
  mainPanelItemType: MainPanelItemTypeEnum.ORGANIZED_EVENTS,
  numberOfEvents: number
}

export type ApplicationsForParticipationItemType = {
  mainPanelItemType: MainPanelItemTypeEnum.APPLICATIONS_FOR_PARTICIPATION,
  allApplicationsNumber: number
}

export type FindEventsItemType = {
  mainPanelItemType: MainPanelItemTypeEnum.FIND_EVENTS,
  numberOfEventsInMyArea: number
}

export type MyEventsItemType = {
  mainPanelItemType: MainPanelItemTypeEnum.MY_EVENTS,
  numberOfMyEvents: number
}

export type MainPanelItemType = OrganizedEventsItemType | ApplicationsForParticipationItemType | FindEventsItemType | MyEventsItemType;
