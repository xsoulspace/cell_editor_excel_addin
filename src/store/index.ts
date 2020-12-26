import { getExcelContext } from '@/modules/ExcelContext'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ComponentCustomProperties } from 'vue'

export interface StoreRootState {
  root: boolean
  version: string
}
declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StoreRootState>
  }
}
export enum storeHub {
  settings = 'settings',
  cellValue = 'cellValue',
}

// import { settingHub } from './StoreHub/SettingHub'
export const storeKey: InjectionKey<Store<StoreRootState>> = Symbol()

export const store = createStore<StoreRootState>({
  strict: process.env.NODE_ENV !== 'production',
  // modules: { settingHub },
})
