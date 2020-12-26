import { AppTheme } from '@/constants/AppTheme'
import { Languages } from '@/constants/Languages'
import { Action, ActionTree, Module, Mutation, MutationTree } from 'vuex'
import { StoreRootState } from '../index'
export module SettingsHub {
  // Types
  export type State = {
    theme: AppTheme
    language: Languages
    storageName: string
  }
  export enum ActionEnum {
    changeTheme = 'changeTheme',
    changeLanguage = 'changeLanguage',
    loadAllFromLocalStorage = 'loadAllFromLocalStorage',
    saveAllToLocalStorage = 'saveAllToLocalStorage',
  }
  export enum MutationEnum {
    changeTheme = 'changeTheme',
    changeLanguage = 'changeLanguage',
  }

  export interface ChangeLanguageArg {
    newLang: Languages
  }
  export interface ChangeThemeArg {
    newTheme: AppTheme
  }
  export type Mutations = MutationTree<State> &
    Required<Record<MutationEnum, Mutation<State>>>

  export type Actions = ActionTree<State, StoreRootState> &
    Required<Record<ActionEnum, Action<State, StoreRootState>>>
}

export module SettingsHub {
  export const state = (): State => ({
    theme: AppTheme.dark,
    language: Languages.eng,
    storageName: 'Settings',
  })

  export const mutations: Mutations = {
    changeLanguage(state, { newLang }: ChangeLanguageArg) {
      state.language = newLang
    },
    changeTheme(state, { newTheme }: ChangeThemeArg) {
      state.theme = newTheme
    },
  }
  export const actions: Actions = {
    async loadAllFromLocalStorage({ state, commit }) {
      const settingsStr = localStorage.getItem(state.storageName)
      if (settingsStr == null) return
      const settingsState = JSON.parse(settingsStr) as State
      const langArg: ChangeLanguageArg = {
        newLang: settingsState.language,
      }
      commit(MutationEnum.changeLanguage, langArg)
      const themeArg: ChangeThemeArg = {
        newTheme: settingsState.theme,
      }
      commit(MutationEnum.changeTheme, themeArg)
    },
    async saveAllToLocalStorage({ state }) {
      localStorage.setItem(state.storageName, JSON.stringify(state))
    },
    async changeLanguage({ commit, dispatch }, payload: ChangeLanguageArg) {
      commit(MutationEnum.changeLanguage, payload)
      dispatch(ActionEnum.saveAllToLocalStorage)
    },
    async changeTheme({ commit, dispatch }, payload: ChangeLanguageArg) {
      commit(MutationEnum.changeTheme, payload)
      dispatch(ActionEnum.saveAllToLocalStorage)
    },
  }
}

export const settingHub: Module<SettingsHub.State, StoreRootState> = {
  namespaced: true,
  state: SettingsHub.state,
  mutations: SettingsHub.mutations,
  actions: SettingsHub.actions,
}
