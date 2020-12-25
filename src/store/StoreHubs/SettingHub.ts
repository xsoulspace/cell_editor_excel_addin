import { AppTheme } from '@/constants/AppTheme'
import { Language } from '@/constants/Language'
// declare namespace SettingsHub {}
export const SettingsHubState = () => {
  const st = {
    theme: AppTheme.dark,
    language: Language.eng,
  }
  return st
}
export const SettingsHubGetters = {}
export const SettingsHubMutations = {}
export const SettingsHubActionss = {}
