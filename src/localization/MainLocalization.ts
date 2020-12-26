import { Locales } from '@/constants/Locales'
import { StaticProvider } from '@/entities/StaticProvider'
import { deepCopyObj } from '@/functions/deepCopyObj'
import { Ref, ref } from 'vue'
import { engLocaleFile } from './_engLocaleFile'
import { rusLocaleFile } from './_rusLocaleFile'
class State {
  static locale: Ref<Locales> = ref(Locales.eng)
}
export class MainLocalization extends StaticProvider {
  localeFiles = {
    eng: engLocaleFile,
    rus: rusLocaleFile,
  }
  public get locale(): Locales {
    return State.locale.value
  }
  public set locale(value: Locales) {
    State.locale.value = value
  }
  private static _getNestedLocaleString({
    localeFile,
    keysArr,
    locale,
  }: {
    localeFile: LocaleFile
    keysArr: string[]
    locale: Locales
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
  t(key: string) {
    const keysArr = key.includes('.') ? key.split('.') : [key]
    const localeFile = this.localeFiles[this.locale]
    const strValue: string = MainLocalization._getNestedLocaleString({
      localeFile,
      locale: this.locale,
      keysArr,
    })
    return strValue
  }
}
