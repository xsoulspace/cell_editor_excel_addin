import { SheetsStorage } from './SheetsStorage'

describe('SheetStorage file test', () => {
  const sheetsStorage = new SheetsStorage()

  it('get sheets', () => {
    const result: Sheet[] = sheetsStorage.sheets
    expect(result).toEqual([])
  })

  const sheet: Sheet = { id: 0, name: '', position: 0, visibility: undefined }

  it('add new sheet', async () => {
    await sheetsStorage.createSheet({ sheet })
    const result: Sheet[] = sheetsStorage.sheets
    expect(result).toEqual([sheet])
  })

  // it('remove new sheet', async () => {
  //   await sheetsStorage.createSheet({ sheet })
  //   await sheetsStorage.removeSheet({ sheet })
  //   const result: Sheet[] = sheetsStorage.sheets
  //   expect(result).toEqual([])
  // })
})
