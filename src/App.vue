<template>
  <router-view />
</template>
<script lang="ts">
import { MainLocalization } from '@/localization/MainLocalization'
import { AppSettingsModel } from '@/featureWidgets/AppSettings/Model'
import { CellValueModel } from '@/models/CellValueModel'
import { CellValueSettingsModel } from '@/featureWidgets/CellValueSettings/Model'
import { Provider } from '@/modules/Provider'
import { AppSessionModel } from './models/AppSessionModel'
import { ExcelModule } from './modules/ExcelModule'

export default {
  name: 'App',
  setup() {
    const appSettings = Provider.get<AppSettingsModel>(AppSettingsModel)
    const mainLocalization = Provider.get<MainLocalization>(MainLocalization)
    appSettings.loadFromStorage()
    mainLocalization.locale = appSettings.locale

    const cellValueSettingsModel = Provider.get<CellValueSettingsModel>(
      CellValueSettingsModel
    )
    cellValueSettingsModel.loadFromStorage()
  },
  async mounted() {
    const cellValueModel = Provider.get<CellValueModel>(CellValueModel)
    const appSessionModel = Provider.get<AppSessionModel>(AppSessionModel)
    const { isInExcel } = appSessionModel.stateRef
    if (isInExcel.value) {
      const excelModel = new ExcelModule()
      await excelModel.registerOnSelectCellChangeEvent(async () => {
        await cellValueModel.updateFromExcel()
      })
      await cellValueModel.updateFromExcel()
    }
  },
  async beforeUnmount() {
    const cellValueModel = Provider.get<CellValueModel>(CellValueModel)
    const appSessionModel = Provider.get<AppSessionModel>(AppSessionModel)
    const { isInExcel } = appSessionModel.stateRef
    if (isInExcel.value) {
      const excelModel = new ExcelModule()
      await excelModel.unregisterOnSelectCellChangeEvent(
        cellValueModel.updateFromExcel
      )
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
