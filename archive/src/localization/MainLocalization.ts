import { Languages } from '@/constants/Languages'
import { deepCopyObj } from '@/functions/deepCopyObj'
import { inject, provide, Ref, ref } from 'vue'
import { engLocaleFile } from './_engLocaleFile'
import { rusLocaleFile } from './_rusLocaleFile'

export class MainLocalization {
  static localeFiles = {
    eng: engLocaleFile,
    rus: rusLocaleFile,
  }
  private static _providerKey = Symbol()
  private static _locale: Ref<Languages> = ref(Languages.eng)
  public static get locale(): Languages {
    return MainLocalization._locale.value
  }
  public static set locale(value: Languages) {
    MainLocalization._locale.value = value
  }
  private static _getNestedLocaleString({
    localeFile,
    keysArr,
    locale,
  }: {
    localeFile: LocaleFile
    keysArr: string[]
    locale: Languages
  }) {
    try {
      let tempObj: LocaleMessageInterface | LocaleFile = deepCopyObj(localeFile)
      for (let i = 0; i < keysArr.length; i++) {
        const levelKey = keysArr[i]
        if (!(levelKey in tempObj))
          throw Error(
            `no key ${levelKey} found in tempObj for ${locale} locale!`
          )
        const valueOrObject: Maybe<LocaleMessageInterface | string> =
          tempObj[levelKey]
        switch (typeof valueOrObject) {
          case 'string':
            return valueOrObject
          case 'object':
            if (valueOrObject != null) {
              tempObj = valueOrObject
              break
            }
          default:
            throw Error(
              `no value found for key ${levelKey} found in localeFile for ${locale} locale!`
            )
        }
      }
      return ''
    } catch (error) {
      console.error(error)
      return ''
    }
  }
  static t(key: string) {
    const keysArr = key.includes('.') ? key.split('.') : [key]
    const localeFile = MainLocalization.localeFiles[MainLocalization.locale]
    const strValue: string = MainLocalization._getNestedLocaleString({
      localeFile,
      locale: MainLocalization.locale,
      keysArr,
    })
    return strValue
  }
  static createProvider({ locale }: { locale: Maybe<Languages> }): void {
    if (locale) this.locale = locale
    provide(this._providerKey, this)
  }
  static getMainLocalization() {
    const mainLocalization: Maybe<typeof MainLocalization> = inject(
      this._providerKey
    )
    if (!mainLocalization) throw new Error('No MainLocalization provided!!!')
    return { mainLocalization, t: mainLocalization.t }
  }
  static switchLang() {
    MainLocalization.locale =
      MainLocalization.locale == Languages.eng ? Languages.rus : Languages.eng
  }
}
