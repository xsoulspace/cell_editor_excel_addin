<template lang="pug">
div
  //- Bar
  AppBar
 
  //- Body

  div.is-fullsize
    p(v-show="isLogExists") {{ computedlog }}
    quill-editor(
      v-if="isEditorEnabled" v-model="cellText"
    )
    textarea(
      class="textearea"
      v-if="!isEditorEnabled"
      name="text"
      rows="1"
      v-model="cellText"
      placeholder="Some cell text.."
    )

  //- Settings Modal
    
  div.modal(
    :class="{ 'is-active': isSettingsActive }"
  )
    div.modal-background(@click="isSettingsActive = false")
    div.modal-card(
      @click.stop
    )
      header.modal-card-head
        p.modal-card-title Настройки
        button(
          @click="isSettingsActive = false"
          class="delete"
          aria-label="close"
        )
      section.modal-card-body
        div.field
          label.checkbox Перенос строки
            input(
              v-model="wrapText" type="checkbox"
            ) 
        div.field
          label.checkbox Использовать WYSIWYG(html) редактор по умолчанию
            input(
              v-model="defaultEditor" type="checkbox"
            ) 
      footer.modal-card-foot
        button.button.is-success.has-fluid-width.has-margin(
          @click="modalApplyHandler"
        ) Применить
        button.button.has-fluid-width.has-margin(
          @click="isSettingsActive = false"
        ) Отменить
        
</template>

<script lang="ts">
import { featureWidgets } from '@/router/featureWidgetsRouter'
import { ref } from 'vue'
// import { useStore } from 'vuex'
const { AppBar, QuillEditor } = featureWidgets.widgets
export default {
  components: {
    AppBar,
    QuillEditor,
  },
  setup() {
    // const store = useStore(storeKey)
    const isLogExists = ref(false)
    const isEditorEnabled = ref(false)
    const isSettingsActive = ref(false)
    const defaultEditor = ref(true)
    const wrapText = ref(true)
    const computedlog = ref('')
    const cellText = ref('')

    const saveExcelCellFormat = () => {
      // Excel.run(async context => {
      //   const activeCell = context.workbook.getSelectedRange()
      //   activeCell.format.wrapText = wrapText.value
      //   return context.sync()
      // })
    }

    const modalApplyHandler = () => {
      saveExcelCellFormat()
      isSettingsActive.value = false
    }
    const loadExcelValues = () => {
      // return Excel.run(context => {
      //   store.dispatch('setECellValue', event)
      //   store.dispatch('setECellWrapText', event)
      //   return context.sync()
      // })
    }
    const saveExcelValues = () => {
      // Excel.run(async context => {
      //   const activeCell = context.workbook.getSelectedRange()
      //   activeCell.values = [[value]]
      //   activeCell.format.wrapText = wrapText.value
      //   return context.sync()
      // })
    }
    const log = (value: string) => {
      computedlog.value = value
    }
    return {
      log,
      saveExcelCellFormat,
      loadExcelValues,
      saveExcelValues,
      isEditorEnabled,
      isSettingsActive,
      defaultEditor,
      wrapText,
      computedlog,
      cellText,
      modalApplyHandler,
      isLogExists,
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
