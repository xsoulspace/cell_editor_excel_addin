<template lang="pug">
div
  div Cell Settings
  div Wrap text?
    //- TODO: add checkbox
    div(
      @click='updateWrapText'
    ) is {{wrapText}}
  
</template>
<script lang="ts">
import { Provider } from '@/modules/Provider'
import { CellValueSettings } from './Model'
export default {
  name: 'CellValueSettings',
  setup() {
    const appSettings = Provider.get<CellValueSettings>(CellValueSettings)
    const { wrapText } = appSettings.stateRef
    const updateWrapText = () => {
      appSettings.wrapText = !wrapText.value
    }
    return {
      wrapText,
      updateWrapText,
    }
  },
}
</script>
