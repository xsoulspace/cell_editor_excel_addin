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
      @click='locale = locale == Locales.rus ? Locales.eng : Locales.rus'
    ) {{locale}}
</template>
<script lang="ts">
import { AppSettingsStore } from './Store'
import { Locales } from '@/constants/Locales'
import { AppTheme } from '@/constants/AppTheme'
export default {
  name: 'AppSettings',
  setup() {
    const appSettings = AppSettingsStore.injectAppSettings<AppSettingsStore>()
    const { theme, locale } = appSettings.store.stateRef
    const changeTheme = () => {
      appSettings.store.theme =
        theme.value == AppTheme.dark ? AppTheme.light : AppTheme.dark
    }
    const changeLocale = () => {
      appSettings.store.locale =
        locale.value == Locales.rus ? Locales.eng : Locales.rus
    }
    return {
      theme,
      changeTheme,
      locale,
      Locales,
      AppTheme,
      appSettings,
    }
  },
}
</script>
