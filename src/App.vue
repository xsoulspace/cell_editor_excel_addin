<template>
  <router-view />
</template>
<script lang="ts">
import { Locales } from '@/constants/Locales'
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsStore } from '@/featureWidgets/AppSettings/Store'
import { CellValueStore } from './featureWidgets/CellValueStore'
import { CellValueSettings } from './featureWidgets/CellValueSettings/Store'
import { Provider } from './modules/Provider'

export default {
  name: 'App',
  setup() {
    const appSettings = Provider.get<AppSettingsStore>(AppSettingsStore)
    const mainLocalization = Provider.get<MainLocalization>(MainLocalization)
    appSettings.loadFromStorage()
    mainLocalization.locale = appSettings.locale
    const cellValueSettings = Provider.get<CellValueSettings>(CellValueSettings)
    cellValueSettings.loadFromStorage()
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
