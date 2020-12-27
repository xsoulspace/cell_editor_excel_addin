import { saveToStorage, StaticProviderStorage } from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

export type State = {
  wrapText: boolean
}
export class CellValueSettings implements StaticProviderStorage<State> {
  static storageName = 'CellValueSettings'
  static state: State = reactive({ wrapText: false })
  get stateRef() {
    return toRefs(CellValueSettings.state)
  }
  @saveToStorage<State, boolean>({
    state: CellValueSettings.state,
    storageName: CellValueSettings.storageName,
  })
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
