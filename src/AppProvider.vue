<template lang="pug">
App
</template>
<script lang="ts">
import { Locales } from '@/constants/Locales'
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsModel } from '@/featureWidgets/AppSettings/Model'
import { CellValueModel } from '@/models/CellValueModel'
import { CellValueSettings } from '@/featureWidgets/CellValueSettings/Model'
import { Provider } from '@/modules/Provider'
import App from './App.vue'
export default {
  name: 'AppProvider',
  components: {
    App,
  },
  setup() {
    Provider.providers([
      MainLocalization,
      AppSettingsModel,
      CellValueModel,
      CellValueSettings,
    ])
  },
}
</script>
