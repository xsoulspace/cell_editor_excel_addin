<template lang="pug">
div
  .form__field
    .checkbox__input
    div Cell Settings
  .form__field
    .checkbox__input
    div Wrap text?
    //- TODO: add checkbox
    div(
      @click='updateWrapText'
    ) is {{wrapText}}
  
</template>
<script lang="ts">
import { Provider } from '@/modules/Provider'
import { CellValueSettingsModel } from './Model'
export default {
  name: 'CellValueSettings',
  setup() {
    const cellValueSettingsModel = Provider.get<CellValueSettingsModel>(
      CellValueSettingsModel
    )
    const { wrapText } = cellValueSettingsModel.stateRef
    const updateWrapText = () => {
      cellValueSettingsModel.wrapText = !wrapText.value
    }
    return {
      wrapText,
      updateWrapText,
    }
  },
}
</script>
