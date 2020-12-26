<template lang="pug">
div
  //- Bar
  AppBar
 
  //- Body
  DialogPopup(
    :isActive='isDialogActive'
  )
  p {{theme}}
  div(
    @click='changeTheme'
  ) change theme
  div.is-fullsize

    //- quill-editor(
    //- )
    textarea(
      class="textearea"
      name="text"
      rows="1"
      placeholder="Some cell text.."
    )
  //- Settings Modal
  
  //- (
  //-   :isActive='true'
  //- )

        
</template>

<script lang="ts">
import { featureWidgets } from '@/router/featureWidgetsRouter'
import { ref, provide } from 'vue'
import { uiWidgets } from '@/router/uiWidgetsRouter'
import { updateIsDialogActive } from './Home.d'
import { FeatureWidgetProvider } from '@/constants/FeatureWidgetProvider'
import { AppSettings } from '@/featureWidgets/AppSettings/index'
import { AppTheme } from '@/constants/AppTheme'

const { AppBar, QuillEditor } = featureWidgets.widgets
const { DialogPopup } = uiWidgets.widgets

export default {
  components: {
    AppBar,
    QuillEditor,
    DialogPopup,
  },
  setup() {
    const isDialogActive = ref(false)
    const updateIsDialogActive: updateIsDialogActive = (isActive: boolean) => {
      isDialogActive.value = isActive
    }
    provide(FeatureWidgetProvider.updateIsDialogActive, updateIsDialogActive)
    const { appSettings } = AppSettings.injectAppSettings()
    appSettings.loadFromStorage()
    const theme = appSettings.stateRef.theme

    const changeTheme = () => {
      switch (theme.value) {
        case AppTheme.dark:
          appSettings.theme = AppTheme.light
          break

        default:
          appSettings.theme = AppTheme.dark
          break
      }
    }
    return { isDialogActive, theme, changeTheme, appSettings }
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
