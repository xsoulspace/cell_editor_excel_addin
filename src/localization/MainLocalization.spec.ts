import { Languages } from '@/constants/Languages'
import { MainLocalization } from './MainLocalization'
import { engLocaleFile } from './_engLocaleFile'

describe('MainLocalization file', () => {
  const key = 'introTour.header-search.title'
  it('_getNestedLocaleString testing return string', () => {
    const keysArr = key.split('.')
    const localeFile = engLocaleFile
    const result = MainLocalization['_getNestedLocaleString']({
      keysArr,
      localeFile,
      locale: Languages.eng,
    })
    expect(result).toEqual(engLocaleFile.introTour['header-search'].title)
  })
  it('$t test to return locale string', () => {
    const result = MainLocalization.t(key)
    expect(result).toEqual(engLocaleFile.introTour['header-search'].title)
  })
})
