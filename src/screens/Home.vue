<template lang="pug">
div
  //- Bar
  AppBar
  //- Body
  DialogPopup(
    :isActive='isDialogActive'
  )
    template(v-slot:body)
      AppSettings
      CellValueSettings

  div.is-fullsize
    QuillEditor(
      v-if='textEditor == TextEditor.WYSIWYG'
      :modelValue="excelCellValue"
      @update:modelValue='updateExcelValue'
    )
    TextareaEditor(
      v-if='textEditor == TextEditor.plainText'
      :modelValue="excelCellValue"
      @update:modelValue='updateExcelValue'
    )
        
</template>

<script lang="ts">
import { featureWidgets } from '@/router/featureWidgetsRouter'
import { ref, provide, computed, watch } from 'vue'
import { uiWidgets } from '@/router/uiWidgetsRouter'
import { FeatureWidgetProvider } from '@/constants/FeatureWidgetProvider'
import { Provider } from '@/modules/Provider'
import { AppSettingsModel } from '@/featureWidgets/AppSettings/Model'
import { TextEditor } from '@/constants/TextEditor'
import { CellValueSettingsModel } from '@/featureWidgets/CellValueSettings/Model'
import { CellValueModel } from '@/models/CellValueModel'
import { AppSessionModel } from '@/models/AppSessionModel'

const {
  AppBar,
  AppSettings,
  QuillEditor,
  CellValueSettings,
  TextareaEditor,
} = featureWidgets.widgets
const { DialogPopup } = uiWidgets.widgets

export default {
  components: {
    AppBar,
    QuillEditor,
    AppSettings,
    DialogPopup,
    CellValueSettings,
    TextareaEditor,
  },
  setup() {
    const isDialogActive = ref(false)
    const updateIsDialogActiveFn: updateIsDialogActive = (
      isActive: boolean
    ) => {
      isDialogActive.value = isActive
    }
    provide(FeatureWidgetProvider.updateIsDialogActive, updateIsDialogActiveFn)
    const appSettings = Provider.get<AppSettingsModel>(AppSettingsModel)
    const cellValueSettingsModel = Provider.get<CellValueSettingsModel>(
      CellValueSettingsModel
    )
    const cellValueModel = Provider.get<CellValueModel>(CellValueModel)
    const appSessionModel = Provider.get<AppSessionModel>(AppSessionModel)
    const excelCellValue = computed(
      () => cellValueModel.stateRef.excelCellValue.value
    )
    const updateExcelValue = async (cellValue: string) => {
      await cellValueModel.updateExcelValue({
        cellValue,
        appSessionModel,
        cellValueSettingsModel,
      })
    }
    const { textEditor, saveAsContentType } = appSettings.stateRef
    watch(textEditor, async () => {
      await cellValueModel.updateFromExcel()
    })
    watch(saveAsContentType, async () => {
      await cellValueModel.updateFromExcel()
    })
    return {
      isDialogActive,
      textEditor,
      TextEditor,
      excelCellValue,
      updateExcelValue,
    }
  },
}
</script>
<style lang="scss" scoped>
.nav {
  margin-top: 2px;
  margin-right: auto;
  height: 5vh;
}
.nav > .settings {
  position: absolute;
  left: 10px;
}

.is-fullsize {
  margin: 10px;
  padding-top: 10px;
  box-sizing: border-box;
}
.is-fullsize > textarea {
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  margin: 0px;
  position: relative;
  height: 86vh;
  width: 97%;
  border: 1px solid #ccc;
  line-height: 1.42;
  overflow-y: auto;
  padding: 12px 15px;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.modal-card-foot .button.has-text-wrapped {
  padding-left: 3px;
  height: 100%;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.has-fluid-width {
  width: 100%;
}
.has-margin {
  margin-bottom: 2px;
}
.modal-card-foot {
  padding: 5px;
}
</style>
