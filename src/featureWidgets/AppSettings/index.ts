import { AppTheme } from '@/constants/AppTheme'
import { Locales } from '@/constants/Locales'
import { StaticProvider, StaticProviderI } from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'
module AppSettings {
  export interface State {
    locale: Locales
    theme: AppTheme
  }
}
class State {
  static readonly state = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
  })
}

export class AppSettings extends StaticProvider implements StaticProviderI {
  _storageName = 'AppSettings'

  stateRef = toRefs(State.state)

  get theme(): AppTheme {
    return this.stateRef.theme.value
  }
  set theme(value: AppTheme) {
    this.stateRef.theme.value = value
    this.saveToStorage()
  }
  get locale(): Locales {
    return this.stateRef.locale.value
  }
  set locale(language: Locales) {
    this.stateRef.locale.value = language
    this.saveToStorage()
  }
  loadFromStorage() {
    const settingsStr = localStorage.getItem(this._storageName)
    if (settingsStr == null) return
    const settingsState = JSON.parse(settingsStr) as AppSettings.State
    this.theme = settingsState.theme
    this.locale = settingsState.locale
  }
  saveToStorage() {
    localStorage.setItem(this._storageName, JSON.stringify(State.state))
  }
}
