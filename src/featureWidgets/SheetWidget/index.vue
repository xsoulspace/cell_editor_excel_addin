<template lang="pug">
div hello dynamic router!
  div {{ t('introTour.header-search.title')}}
  div(
    @click.prevent='switchLang'
  ) Switch Lang
</template>
<script lang="ts">
import { MainLocalization } from '@/localization/MainLocalization'
export default {
  setup() {
    const { t, mainLocalization } = MainLocalization.getMainLocalization()
    return { t, switchLang: mainLocalization.switchLang }
  },
}
</script>
