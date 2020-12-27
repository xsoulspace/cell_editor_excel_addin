<template lang="pug">
div
  div App Settings
  div Theme
    //- TODO: add selector
    div(
      @click='changeTheme'
    ) {{theme}}
  div Language
    //- TODO: add selector
    div(
      @click='changeLocale'
    ) {{locale}}
</template>
<script lang="ts">
import { AppSettingsModel } from './Model'
import { Locales } from '@/constants/Locales'
import { AppTheme } from '@/constants/AppTheme'
import { Provider } from '@/modules/Provider'
export default {
  name: 'AppSettings',
  setup() {
    const appSettings = Provider.get<AppSettingsModel>(AppSettingsModel)
    const { theme, locale } = appSettings.stateRef
    const changeTheme = () => {
      appSettings.theme =
        theme.value == AppTheme.dark ? AppTheme.light : AppTheme.dark
    }
    const changeLocale = () => {
      appSettings.locale =
        locale.value == Locales.rus ? Locales.eng : Locales.rus
    }
    return {
      theme,
      changeTheme,
      changeLocale,
      locale,
    }
  },
}
</script>
