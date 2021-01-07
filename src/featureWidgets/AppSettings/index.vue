<template lang="pug">
div.form
  div.form__field
    .form__field-p App Settings
  div.form__field 
    .form__field-p Theme
    //- TODO: add selector
    div.form__field-p(
      @click='changeTheme'
    ) {{theme}}
  div.form__field 
    .form__field-p Language
    //- TODO: add selector
    div.form__field-p(
      @click='changeLocale'
    ) {{locale}}
  div.form__field 
    .form__field-p Save As Content Type:
    //- TODO: add selector
    div.form__field-p(
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
