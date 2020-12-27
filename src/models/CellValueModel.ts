import { ExcelData } from '@/entities/ExcelData'
import {
  ProviderStorage,
  StaticProviderStorage,
} from '@/entities/ProviderStorage'
import { StaticClass } from '@/entities/StaticClass'
import { CellValueSettings } from '@/featureWidgets/CellValueSettings/Model'
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

  async init({ appSessionModel }: { appSessionModel: AppSessionModel }) {
    const { isInExcel } = appSessionModel.stateRef
    if (isInExcel.value) {
      const value = await this.excelModule.getSelectedCellValue({
        withWrap: false,
      })
      if (value.cellValue)
        this.excelCellValue = this.getStringFromExcelArr(value.cellValue)
    }
  }

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

  async updateValue(arg: {
    cellValue: string
    appSessionModel: AppSessionModel
    cellValueSettings: CellValueSettings
  }) {
    const { appSessionModel, cellValue, cellValueSettings } = arg
    const { isInExcel } = appSessionModel.stateRef
    if (isInExcel.value) {
      await this.excelModule.setValueToSelectedCell({
        cellValue,
        wrapText: cellValueSettings.wrapText,
      })
    }
    this.excelCellValue = cellValue
  }

  set excelCellValue(value: string) {
    const { excelCellValue } = this.stateRef
    excelCellValue.value = value
    console.log(CellValueModel.state)
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
