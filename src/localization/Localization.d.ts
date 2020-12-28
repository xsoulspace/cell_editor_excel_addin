declare interface LocaleMessageInterface {
  [prop: string]: LocaleMessageInterface | string
}
declare enum TourHeaders {
  'header-help' = 'header-help',
  'header-info' = 'header-info',
  'header-settings' = 'header-settings',
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
  chooseLanguages: string
  darkTheme: string
  sheetsNumerationEnabled: string
  showNumeration: string
  settingsOnStart: string
  openIntroTutorial: string
  tryToRecoverNumeration: string
  chooseColor: string
}

declare type LocaleFiles = { [lang in Locales]: LocaleFile }

type LocaleFile = LocaleMessageInterface
