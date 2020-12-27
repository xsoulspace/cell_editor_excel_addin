<template lang="pug">
App
</template>
<script lang="ts">
import { Locales } from '@/constants/Locales'
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsStore } from '@/featureWidgets/AppSettings/Store'
import { CellValueStore } from './featureWidgets/CellValueStore'
import { CellValueSettings } from './featureWidgets/CellValueSettings/Store'
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
      AppSettingsStore,
      CellValueStore,
      CellValueSettings,
    ])
  },
}
</script>
