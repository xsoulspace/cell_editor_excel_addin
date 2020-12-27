import { AppTheme } from '@/constants/AppTheme'
import { Locales } from '@/constants/Locales'
import { TextEditor } from '@/constants/TextEditor'
import { saveToStorage, StaticProviderStorage } from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

export type State = {
  locale: Locales
  theme: AppTheme
  textEditor: TextEditor
}

export class AppSettingsModel implements StaticProviderStorage<State> {
  static storageName = 'AppSettings'
  static state: State = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
    textEditor: TextEditor.plainText,
  })

  get stateRef() {
    return toRefs(AppSettingsModel.state)
  }

  @saveToStorage<State, AppTheme>({
    storageName: AppSettingsModel.storageName,
    state: AppSettingsModel.state,
  })
  set theme(value: AppTheme) {
    const { theme } = this.stateRef
    theme.value = value
  }

  @saveToStorage<State, Locales>({
    storageName: AppSettingsModel.storageName,
    state: AppSettingsModel.state,
  })
  set locale(value: Locales) {
    const { locale } = this.stateRef
    locale.value = value
  }

  @saveToStorage<State, TextEditor>({
    storageName: AppSettingsModel.storageName,
    state: AppSettingsModel.state,
  })
  set textEditor(value: TextEditor) {
    const { textEditor } = this.stateRef
    textEditor.value = value
  }

  loadFromStorage() {
    const stateStr = localStorage.getItem(AppSettingsModel.storageName)
    if (stateStr == null) return
    this.fromJson({ stateStr })
  }
  fromJson({ stateStr }: { stateStr: string }) {
    if (stateStr.length <= 1) return
    const settingsState = JSON.parse(stateStr) as Partial<State>
    this.theme = settingsState.theme ?? AppTheme.light
    this.locale = settingsState.locale ?? Locales.eng
    this.textEditor = settingsState.textEditor ?? TextEditor.plainText
  }
}
