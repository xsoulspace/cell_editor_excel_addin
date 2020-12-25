import { AppTheme } from '@/constants/AppTheme'
import { Languages } from '@/constants/Languages'
declare module SettingsHub {}
export const SettingsHubState = () => {
  const st = {
    theme: AppTheme.dark,
    language: Languages.eng,
  }
  return st
}
export const SettingsHubGetters = {}
export const SettingsHubMutations = {}
export const SettingsHubActionss = {}
