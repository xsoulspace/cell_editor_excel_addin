<template>
  <router-view />
</template>
<script lang="ts">
import { Languages } from '@/constants/Languages'
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettings } from '@/featureWidgets/AppSettings/index'

export default {
  setup() {
    MainLocalization.createProvider({ locale: Languages.rus })
    AppSettings.createProvider()
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
