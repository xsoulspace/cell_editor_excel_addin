import { getExcelContext } from '@/modules/ExcelContext'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import './index.d'
import { State } from '@vue/runtime-core'

export const storeKey: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {},
})
