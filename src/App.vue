<template>
  <router-view />
</template>
<script lang="ts">
import { Locales } from '@/constants/Locales'
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsStore } from '@/featureWidgets/AppSettings/Store'

export default {
  setup() {
    MainLocalization.createProvider()
    AppSettingsStore.createProvider()
    const appSettings = new AppSettingsStore()
    appSettings.loadFromStorage()
    new MainLocalization().locale = appSettings.locale
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
