import {
  ProviderStorage,
  StaticProviderStorage,
} from '@/entities/ProviderStorage'
import { StaticClass } from '@/entities/StaticClass'
import { CellValueSettingsModel } from '@/featureWidgets/CellValueSettings/Model'
import { ExcelModule } from '@/modules/ExcelModule'
import { reactive, toRefs } from 'vue'
import { AppSessionModel } from './AppSessionModel'

export type State = {
  excelCellValue: string
}
@StaticClass<StaticProviderStorage<State>>()
export class CellValueModel implements ProviderStorage<State> {
  static state: State = reactive({ excelCellValue: '' })
  static storageName = 'CellValueModel'

  excelModule = new ExcelModule()

  getStringFromExcelArr<T extends ExcelData>(value: T) {
    const row = value[0] ?? []
    const cellValue = row[0]
    if (cellValue) {
      if (cellValue == null) return ''
      if (typeof cellValue != 'string') {
        return cellValue.toString()
      } else {
        return cellValue
      }
    }
    return ''
  }
  async updateFromExcel() {
    const value = await this.excelModule.getSelectedCellValue({
      withWrap: false,
    })
    if (value.cellValue)
      this.excelCellValue = this.getStringFromExcelArr(value.cellValue)
  }
  async updateValue(arg: {
    cellValue: string
    appSessionModel: AppSessionModel
    cellValueSettingsModel: CellValueSettingsModel
  }) {
    const { appSessionModel, cellValue, cellValueSettingsModel } = arg
    const { wrapText } = cellValueSettingsModel.stateRef
    const { isInExcel } = appSessionModel.stateRef
    if (isInExcel.value) {
      await this.excelModule.setValueToSelectedCell({
        cellValue,
        wrapText: wrapText.value,
      })
    }
    this.excelCellValue = cellValue
  }

  set excelCellValue(value: string) {
    const { excelCellValue } = this.stateRef
    excelCellValue.value = value
  }
  get stateRef() {
    return toRefs(CellValueModel.state)
  }
  fromJson() {
    throw Error('AppSessionModel.fromJson not implemented!')
  }
  loadFromStorage() {
    throw Error('AppSessionModel.fromJson not implemented!')
  }
}
