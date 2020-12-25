<template>
  <router-view />
</template>
<script lang="ts">
import { Languages } from './constants/Languages'
import { MainLocalization } from './localization/MainLocalization'
export default {
  setup() {
    MainLocalization.createProvider({ locale: Languages.rus })
  },
  mounted() {
    if (document.getElementById('office')) return // was already loaded
    var scriptTag = document.createElement('script')
    scriptTag.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js'
    scriptTag.id = 'office'
    document.getElementsByTagName('head')[0].appendChild(scriptTag)
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
