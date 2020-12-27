import {
  ProviderStorage,
  saveToStorage,
  StaticProviderStorage,
} from '@/entities/ProviderStorage'
import { StaticClass } from '@/entities/StaticClass'
import { reactive, toRefs } from 'vue'

type State = {
  wrapText: boolean
}
@StaticClass<StaticProviderStorage<State>>()
export class CellValueSettings implements ProviderStorage<State> {
  static storageName = 'CellValueSettings'
  static state: State = reactive({ wrapText: false })
  get stateRef() {
    return toRefs(CellValueSettings.state)
  }
  @saveToStorage<State, boolean>()
  set wrapText(value: boolean) {
    const { wrapText } = this.stateRef
    wrapText.value = value
  }

  loadFromStorage() {
    const stateStr = localStorage.getItem(CellValueSettings.storageName)
    if (stateStr == null) return
    this.fromJson({ stateStr })
  }
  fromJson({ stateStr }: { stateStr: string }) {
    if (stateStr.length <= 1) return
    const state = JSON.parse(stateStr) as Partial<State>
    this.wrapText = state.wrapText ?? false
  }
}
