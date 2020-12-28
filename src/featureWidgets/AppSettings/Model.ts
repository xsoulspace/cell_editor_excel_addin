import { AppTheme } from '@/constants/AppTheme'
import { Locales } from '@/constants/Locales'
import { SaveAsContentType } from '@/constants/SaveAsContentType'
import { TextEditor } from '@/constants/TextEditor'
import {
  ProviderStorage,
  saveToStorage,
  StaticProviderStorage,
} from '@/entities/ProviderStorage'
import { StaticClass } from '@/entities/StaticClass'
import { reactive, toRefs } from 'vue'

export type State = {
  locale: Locales
  theme: AppTheme
  textEditor: TextEditor
  saveAsContentType: SaveAsContentType
}
@StaticClass<StaticProviderStorage<State>>()
export class AppSettingsModel implements ProviderStorage<State> {
  static storageName = 'AppSettings'
  static state: State = reactive({
    locale: Locales.eng,
    theme: AppTheme.dark,
    textEditor: TextEditor.plainText,
    saveAsContentType: SaveAsContentType.plainText,
  })

  get stateRef() {
    return toRefs(AppSettingsModel.state)
  }

  @saveToStorage<State, AppTheme>()
  set theme(value: AppTheme) {
    const { theme } = this.stateRef
    theme.value = value
  }

  @saveToStorage<State, Locales>()
  set locale(value: Locales) {
    const { locale } = this.stateRef
    locale.value = value
  }

  @saveToStorage<State, TextEditor>()
  set textEditor(value: TextEditor) {
    const { textEditor } = this.stateRef
    textEditor.value = value
  }

  @saveToStorage<State, SaveAsContentType>()
  set saveAsContentType(value: SaveAsContentType) {
    const { saveAsContentType } = this.stateRef
    saveAsContentType.value = value
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
    this.saveAsContentType =
      settingsState.saveAsContentType ?? SaveAsContentType.plainText
  }
}
