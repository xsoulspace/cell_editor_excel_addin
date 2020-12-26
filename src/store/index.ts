import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { settingHub } from './StoreHub/SettingHub'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StoreRootState>
  }
}

export interface StoreRootState {
  root: boolean
  version: string
}

export enum storeHub {
  settings = 'settings',
  cellValue = 'cellValue',
}

export const storeKey: InjectionKey<Store<StoreRootState>> = Symbol()

export const store = createStore<StoreRootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: { settingHub },
})
