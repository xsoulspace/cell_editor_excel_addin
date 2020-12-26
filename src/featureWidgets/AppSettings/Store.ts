import { AppTheme } from '@/constants/AppTheme'
import { Locales } from '@/constants/Locales'
import { StaticProvider, StaticProviderI } from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

module AppSettingsStore {
  export interface State {
    locale: Locales
    theme: AppTheme
  }
}
export class AppSettingsStore extends StaticProvider
  implements StaticProviderI {
  static state = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
  })
  stateRef = toRefs(AppSettingsStore.state)

  _storageName = 'AppSettings'

  get theme(): AppTheme {
    return AppSettingsStore.state.theme
  }
  set theme(value: AppTheme) {
    const { theme } = this.stateRef
    theme.value = value
    this.saveToStorage()
  }
  get locale(): Locales {
    return AppSettingsStore.state.locale
  }
  set locale(language: Locales) {
    const { locale } = this.stateRef
    locale.value = language
    this.saveToStorage()
  }
  loadFromStorage() {
    const settingsStr = localStorage.getItem(this._storageName)
    if (settingsStr == null) return
    const settingsState = JSON.parse(settingsStr) as AppSettingsStore.State
    this.theme = settingsState.theme
    this.locale = settingsState.locale
  }
  saveToStorage() {
    localStorage.setItem(
      this._storageName,
      JSON.stringify(AppSettingsStore.state)
    )
  }
}
