import { inject, provide } from 'vue'

export class StaticProvider {
  static readonly _providerKey = Symbol()
  static createProvider() {
    provide(this._providerKey, new this())
  }
  static injectAppSettings<C>() {
    const store: Maybe<C> = inject(this._providerKey)
    if (!store) throw new Error('No MainLocalization provided!!!')
    return { store }
  }
}
export interface StaticProviderI {
  _storageName: Required<string>
}
