import { getExcelContext } from './ExcelContext'

export namespace ExcelModule {
  export type getSelectedCellValueArg = {
    withWrap: boolean
  }
  export type getSelectedCellValueResponse = {
    cellValue: ExcelData
    wrapText: Maybe<boolean>
  }
  export type setValueToSelectedCellArg = {
    cellValue: string | number | boolean
    wrapText: Maybe<boolean>
  }
  export type saveSelectedCellPropertiesArg = {
    wrapText: Maybe<boolean>
  }
}

export class ExcelModule {
  async getSelectedCellValue(arg: ExcelModule.getSelectedCellValueArg) {
    const { withWrap } = arg
    const context = await getExcelContext()
    const activeCell = context.workbook.getSelectedRange()

    const propertyNames = ['values']

    if (withWrap) propertyNames.push('format', 'wrapText')

    activeCell.load(propertyNames)
    await context.sync()
    const cellValue = activeCell.values

    const wrapText = withWrap ? activeCell.format.wrapText ?? false : false
    const response: ExcelModule.getSelectedCellValueResponse = {
      cellValue,
      wrapText,
    }
    return response
  }

  async setValueToSelectedCell(arg: ExcelModule.setValueToSelectedCellArg) {
    const { cellValue, wrapText } = arg
    const context = await getExcelContext()
    context.application.suspendScreenUpdatingUntilNextSync()
    const activeCell = context.workbook.getSelectedRange()

    activeCell.values = [[cellValue]]
    if (wrapText != null) activeCell.format.wrapText = wrapText

    await context.sync()
  }

  async saveSelectedCellProperties(
    arg: ExcelModule.saveSelectedCellPropertiesArg
  ) {
    const { wrapText } = arg

    const context = await getExcelContext()
    context.application.suspendScreenUpdatingUntilNextSync()
    const activeCell = context.workbook.getSelectedRange()
    if (wrapText != null) activeCell.format.wrapText = wrapText

    await context.sync()
  }
  async registerOnSelectCellChangeEvent(callback: Function) {
    const context = await getExcelContext()
    context.workbook.onSelectionChanged.add(async () => await callback())
    await context.sync()
  }
  async unregisterOnSelectCellChangeEvent(callback: Function) {
    const context = await getExcelContext()
    context.workbook.onSelectionChanged.remove(async () => await callback())
    await context.sync()
  }
}
