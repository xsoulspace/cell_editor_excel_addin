<template lang="pug">
div.header 
  .tabs
    .tabs__tab(
      @click='changeTextEditor(TextEditor.WYSIWYG)'
    ) 
      div.button.--has-accent
        span WYSIWYG 
    
    div.tabs__tab(
      @click='changeTextEditor(TextEditor.plainText)'
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
import { TextEditor } from '@/constants/TextEditor'

export default {
  name: 'AppBar',

  setup() {
    const updateIsDialogActive = inject<updateIsDialogActive>(
      FeatureWidgetProvider.updateIsDialogActive
    )
    const appSettings = Provider.get<AppSettingsModel>(AppSettingsModel)
    const { textEditor } = appSettings.stateRef
    const changeTextEditor = (value: TextEditor) => {
      appSettings.textEditor = value
    }
    return { updateIsDialogActive, changeTextEditor, TextEditor }
  },
}
</script>
