import { AppTheme } from '@/constants/AppTheme'
import { DefaultEditor } from '@/constants/DefaultEditor'
import { Locales } from '@/constants/Locales'
import { saveToStorage, StaticProviderStorage } from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

module AppSettingsStore {
  export type State = {
    locale: Locales
    theme: AppTheme
    defaultEditor: DefaultEditor
  }
}
export class AppSettingsStore
  implements StaticProviderStorage<AppSettingsStore.State> {
  static storageName = 'AppSettings'
  static state: AppSettingsStore.State = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
    defaultEditor: DefaultEditor.plainText,
  })

  get stateRef() {
    return toRefs(AppSettingsStore.state)
  }

  @saveToStorage<AppSettingsStore.State, AppTheme>({
    storageName: AppSettingsStore.storageName,
    state: AppSettingsStore.state,
  })
  set theme(value: AppTheme) {
    const { theme } = this.stateRef
    theme.value = value
  }

  @saveToStorage<AppSettingsStore.State, Locales>({
    storageName: AppSettingsStore.storageName,
    state: AppSettingsStore.state,
  })
  set locale(value: Locales) {
    const { locale } = this.stateRef
    locale.value = value
  }

  @saveToStorage<AppSettingsStore.State, DefaultEditor>({
    storageName: AppSettingsStore.storageName,
    state: AppSettingsStore.state,
  })
  set defaultEditor(value: DefaultEditor) {
    const { defaultEditor } = this.stateRef
    defaultEditor.value = value
  }

  loadFromStorage() {
    const stateStr = localStorage.getItem(AppSettingsStore.storageName)
    if (stateStr == null) return
    this.fromJson({ stateStr })
  }
  fromJson({ stateStr }: { stateStr: string }) {
    if (stateStr.length <= 1) return
    const settingsState = JSON.parse(stateStr) as Partial<
      AppSettingsStore.State
    >
    this.theme = settingsState.theme ?? AppTheme.light
    this.locale = settingsState.locale ?? Locales.eng
    this.defaultEditor = settingsState.defaultEditor ?? DefaultEditor.plainText
  }
}
