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
  div Save As Content Type:
    //- TODO: add selector
    div(
      @click='changeSaveAsContentType'
    ) {{saveAsContentType}}
</template>
<script lang="ts">
import { AppSettingsModel } from './Model'
import { Locales } from '@/constants/Locales'
import { AppTheme } from '@/constants/AppTheme'
import { Provider } from '@/modules/Provider'
import { SaveAsContentType } from '@/constants/SaveAsContentType'
export default {
  name: 'AppSettings',
  setup() {
    const appSettings = Provider.get<AppSettingsModel>(AppSettingsModel)
    const { theme, locale, saveAsContentType } = appSettings.stateRef
    const changeTheme = () => {
      appSettings.theme =
        theme.value == AppTheme.dark ? AppTheme.light : AppTheme.dark
    }
    const changeLocale = () => {
      appSettings.locale =
        locale.value == Locales.rus ? Locales.eng : Locales.rus
    }
    const changeSaveAsContentType = () => {
      appSettings.saveAsContentType =
        saveAsContentType.value == SaveAsContentType.html
          ? SaveAsContentType.plainText
          : SaveAsContentType.html
    }
    return {
      theme,
      changeTheme,

      locale,
      changeLocale,

      saveAsContentType,
      changeSaveAsContentType,
    }
  },
}
</script>
