import { AppTheme } from '@/constants/AppTheme'
import { Languages } from '@/constants/Languages'
import { StaticProvider } from '@/entities/StaticProvider'
import { inject, provide, reactive, toRefs } from 'vue'
module AppSettings {
  export interface State {
    language: Languages
    theme: AppTheme
    storageName: string
  }
}
export class AppSettings extends StaticProvider {
  static readonly state = reactive({
    language: Languages.eng,
    theme: AppTheme.dark,
    storageName: 'AppSettings',
  })
  static stateRef = toRefs(AppSettings.state)

  static get theme(): AppTheme {
    return AppSettings.state.theme
  }
  static set theme(value: AppTheme) {
    AppSettings.stateRef.theme.value = value
    AppSettings.saveToStorage()
  }
  static get language(): Languages {
    return AppSettings.state.language
  }
  static set language(language: Languages) {
    AppSettings.stateRef.language.value = language
    AppSettings.saveToStorage()
  }
  static loadFromStorage() {
    const settingsStr = localStorage.getItem(AppSettings.state.storageName)
    if (settingsStr == null) return
    const settingsState = JSON.parse(settingsStr) as AppSettings.State
    AppSettings.theme = settingsState.theme
    AppSettings.language = settingsState.language
  }
  static saveToStorage() {
    localStorage.setItem(
      AppSettings.state.storageName,
      JSON.stringify(AppSettings.state)
    )
  }
  static createProvider() {
    provide(this._providerKey, this)
  }
  static injectAppSettings() {
    const appSettings: Maybe<typeof AppSettings> = inject(this._providerKey)
    if (!appSettings) throw new Error('No MainLocalization provided!!!')
    return { appSettings }
  }
}
