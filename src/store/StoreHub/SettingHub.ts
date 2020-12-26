import { AppTheme } from '@/constants/AppTheme'
import { Language } from '@/constants/Language'
import { Module, MutationTree, ActionTree, Mutation, Action } from 'vuex'
import { StoreRootState } from '../index'

export module SettingsHub {
  // Types
  export type State = {
    theme: AppTheme
    language: Language
  }
  export enum ActionEnum {
    changeTheme = 'changeTheme',
    changeLanguage = 'changeLanguage',
  }
  export enum MutationEnum {
    changeTheme = 'changeTheme',
    changeLanguage = 'changeLanguage',
  }

  export interface changeLanguageArg {
    newLang: Language
  }

  export type Mutations = MutationTree<State> &
    Record<MutationEnum, Mutation<State>>

  export type Actions = ActionTree<State, StoreRootState> &
    Record<ActionEnum, Action<State, StoreRootState>>
}
// FIXME:
const state = (): State => ({
  theme: AppTheme.dark,
  language: Language.eng,
})

const mutations: Mutations = {
  changeLanguage(state) {},
  changeTheme(state) {},
}
const actions: Actions = {
  async changeLanguage({}, payload: changeLanguageArg) {},
  async changeTheme({}, payload: changeLanguageArg) {},
}

export const settingHub: Module<SettingsHub.State, StoreRootState> = {
  namespaced: true,
  state: SettingsHub.state,
  mutations: SettingsHub.mutations,
  actions: SettingsHub.actions,
}
