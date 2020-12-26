import {
  StaticProvider,
  StaticProviderStorage,
} from '@/entities/StaticProvider'
import { reactive, toRefs } from 'vue'

module CellValueSettings {
  export type State = {
    wrapText: boolean
  }
}

export class CellValueSettings extends StaticProvider
  implements StaticProviderStorage<CellValueSettings.State> {
  static storageName = 'CellValueSettings'
  static state: CellValueSettings.State = reactive({ wrapText: false })
  stateRef = toRefs(CellValueSettings.state)
}
