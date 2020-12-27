<template lang="pug">
div.header 
  .tabs
    .tabs__tab(
    ) 
      div.button.--has-accent
        span WYSIWYG     
    
    div.tabs__tab(
    )
      div.button.--has-accent
        span.icon
          i.fas.fa-sliders-h Ввод

    div.tabs__tab( 
      @click='updateIsDialogActive(true)'
    )
      div.button.--has-accent(
      )
        span.icon.is-small
          i.fas.fa-sliders-h

    div.tabs__tab
      div.button.--has-accent
        span.icon 
          i.fas.fa-sliders-h info
</template>

<script lang="ts">
import { inject } from 'vue'
import { FeatureWidgetProvider } from '@/constants/FeatureWidgetProvider'
import { updateIsDialogActive } from '@/screens/Home.d'
import { Provider } from '@/modules/Provider'
import { AppSettingsModel } from '../AppSettings/Model'

export default {
  name: 'AppBar',

  setup() {
    const updateIsDialogActive = inject<updateIsDialogActive>(
      FeatureWidgetProvider.updateIsDialogActive
    )
    Provider.get<AppSettingsModel>(AppSettingsModel)
    return { updateIsDialogActive }
  },
}
</script>
