<template>
  <App />
</template>
<script lang="ts">
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsModel } from '@/featureWidgets/AppSettings/Model'
import { CellValueModel } from '@/models/CellValueModel'
import { CellValueSettings } from '@/featureWidgets/CellValueSettings/Model'
import { Provider } from '@/modules/Provider'
import App from './App.vue'
import { AppSessionModel } from './models/AppSessionModel'
export default {
  name: 'AppProvider',
  components: {
    App,
  },
  setup() {
    Provider.providers([
      MainLocalization,
      AppSettingsModel,
      CellValueSettings,
      AppSessionModel,
      CellValueModel,
    ])
  },
}
</script>
