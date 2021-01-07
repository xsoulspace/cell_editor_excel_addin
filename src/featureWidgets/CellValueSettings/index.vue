<template lang="pug">
div
  div.form__field
    .form__field-p Cell Settings
  div.form__field
    .form__field-p Wrap text?
    //- TODO: add checkbox
    div.form__field-p(
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
