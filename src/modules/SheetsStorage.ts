import { Ref, ref } from 'vue'

export class SheetsStorage {
  private _sheets: Ref<Sheet[]> = ref<Sheet[]>([])
  get sheets(): Sheet[] {
    return this._sheets.value
  }
  set sheets(arg: Sheet[]) {
    this._sheets.value = arg
  }

  createSheet(sheetObjArg: { sheet: Sheet }) {
    for (let index = 0; index < this.sheets.length; index++) {
      const element = this.sheets[index]

      if (element.id != sheetObjArg.sheet.id) {
        const tempArr = this.sheets
        tempArr.push(sheetObjArg.sheet)
        this.sheets = tempArr
      }
    }
    // this._sheets = sheet.sheet
  }
}
