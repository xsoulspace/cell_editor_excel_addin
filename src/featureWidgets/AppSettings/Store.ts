import { AppTheme } from '@/constants/AppTheme'
import { Locales } from '@/constants/Locales'
import {
  saveToStorage,
  StaticProvider,
  StaticProviderStorage,
} from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

module AppSettingsStore {
  export type State = {
    locale: Locales
    theme: AppTheme
  }
}
export class AppSettingsStore extends StaticProvider
  implements StaticProviderStorage<AppSettingsStore.State> {
  static storageName = 'AppSettings'
  static state: AppSettingsStore.State = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
  })
  stateRef = toRefs(AppSettingsStore.state)

  get theme(): AppTheme {
    return AppSettingsStore.state.theme
  }

  @saveToStorage<AppSettingsStore.State, AppTheme>({
    storageName: AppSettingsStore.storageName,
    state: AppSettingsStore.state,
  })
  set theme(value: AppTheme) {
    const { theme } = this.stateRef
    theme.value = value
  }

  get locale(): Locales {
    return AppSettingsStore.state.locale
  }

  @saveToStorage<AppSettingsStore.State, Locales>({
    storageName: AppSettingsStore.storageName,
    state: AppSettingsStore.state,
  })
  set locale(language: Locales) {
    const { locale } = this.stateRef
    locale.value = language
  }
  loadFromStorage() {
    const settingsStr = localStorage.getItem(AppSettingsStore.storageName)
    if (settingsStr == null) return
    const settingsState = JSON.parse(settingsStr) as AppSettingsStore.State
    this.theme = settingsState.theme
    this.locale = settingsState.locale
  }
}
