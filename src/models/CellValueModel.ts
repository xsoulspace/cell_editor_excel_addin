import { ExcelData } from '@/entities/ExcelData'
import { CellValueSettings } from '@/featureWidgets/CellValueSettings/Model'
import { ExcelModule } from '@/modules/ExcelModule'
import { ref } from 'vue'
export class CellValueModel {
  static value = ref('')
  cellValueSettings: CellValueSettings = {} as CellValueSettings
  async init({ cellValueSettings }: { cellValueSettings: CellValueSettings }) {
    this.cellValueSettings = cellValueSettings
    const value = await this.excelModule.getSelectedCellValue({
      withWrap: false,
    })
    if (value.cellValue)
      CellValueModel.value.value = this.getStringFromExcelArr(value.cellValue)
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
  excelModule = new ExcelModule()
  async updateValue(value: string) {
    await this.excelModule.setValueToSelectedCell({
      cellValue: value,
      wrapText: this.cellValueSettings.wrapText,
    })
    CellValueModel.value.value = value
  }
}
