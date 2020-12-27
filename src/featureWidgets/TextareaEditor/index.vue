<template lang="pug">
textarea.textearea(
  name="text"
  rows="1"
  placeholder="Some cell text.."
  v-model='excelCellValue'
)
</template>
<script lang="ts">
import { Provider } from '@/modules/Provider'
import { CellValueModel } from '@/models/CellValueModel'
import { computed } from 'vue'
import { CellValueSettings } from '../CellValueSettings/Model'
import { AppSessionModel } from '@/models/AppSessionModel'
export default {
  name: 'TextareaEditor',
  setup() {
    const cellValueModel = Provider.get<CellValueModel>(CellValueModel)
    const cellValueSettings = Provider.get<CellValueSettings>(CellValueSettings)
    const appSessionModel = Provider.get<AppSessionModel>(AppSessionModel)
    const excelCellValue = computed({
      set: cellValue =>
        cellValueModel.updateValue({
          cellValue,
          appSessionModel,
          cellValueSettings,
        }),
      get: () => cellValueModel.stateRef.excelCellValue.value,
    })
    return { excelCellValue }
  },
}
</script>
