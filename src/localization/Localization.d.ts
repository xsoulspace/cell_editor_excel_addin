declare interface LocaleMessageInterface {
  [prop: string]: LocaleMessageInterface | string
}
declare enum TourHeaders {
  'header-help' = 'header-help',
  'header-sync' = 'header-sync',
  'header-info' = 'header-info',
  'header-search' = 'header-search',
  'header-settings' = 'header-settings',
  'item-whole' = 'item-whole',
  'item-color' = 'item-color',
  'item-name' = 'item-name',
  'item-numeration' = 'item-numeration',
}

declare type TourLangInterface = {
  [prop in TourHeaders]: {
    title: string
    content: string
    placement?: Maybe<string>
  }
}

declare interface SettingsLangInterface extends LocaleMessageInterface {
  header: string
  chooseLanguage: string
  darkTheme: string
  sheetsNumerationEnabled: string
  showNumeration: string
  settingsOnStart: string
  openIntroTutorial: string
  tryToRecoverNumeration: string
  chooseColor: string
}

declare type LocaleFiles = { [lang in Languages]: LocaleFile }

declare interface LocaleFile extends LocaleMessageInterface {
  introTour: TourLangInterface
  settings: SettingsLangInterface
  item: {
    nameCannotBeEmpty: string
  }
  brokenNumeration: {
    header: string
    whatWeFound: string
    tryToRecover: string
  }
  buttons: {
    yes: string
    no: string
    skipTutorial: string
    previousStep: string
    nextStep: string
    finishTour: string
  }
  alerts: {
    successfulSync: string
    successfulSheetsLoad: string
    successfulSheetsRecover: string
    introTutorialCompleted: string
    activated: string
    deactivated: string
    numerationRecover: string
    onOpenTutorial: string
    numeration: string
    numerationVisibility: string
  }
}
