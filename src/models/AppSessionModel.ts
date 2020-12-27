import {
  ProviderStorage,
  StaticProviderStorage,
} from '@/entities/ProviderStorage'
import { StaticClass } from '@/entities/StaticClass'
import { getIsInExcelApp } from '@/main'
import { reactive, toRefs } from 'vue'
export type State = {
  isInExcel: boolean
}
@StaticClass<StaticProviderStorage<State>>()
export class AppSessionModel implements ProviderStorage<State> {
  static state: State = reactive({
    isInExcel: false,
  })
  static storageName = 'AppSessionModel'
  constructor() {
    this.isInExcel = getIsInExcelApp()
  }
  get stateRef() {
    return toRefs(AppSessionModel.state)
  }
  set isInExcel(value: boolean) {
    const { isInExcel } = this.stateRef
    isInExcel.value = value
  }
  fromJson() {
    throw Error('AppSessionModel.fromJson not implemented!')
  }
  loadFromStorage() {
    throw Error('AppSessionModel.loadFromStorage not implemented')
  }
}
