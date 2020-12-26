import { inject, provide, ToRefs } from 'vue'

export class StaticProvider {
  static readonly _providerKey = Symbol()
  static createProvider() {
    provide(this._providerKey, new this())
  }
  static injectAppSettings<S>() {
    const store: Maybe<S> = inject(this._providerKey)
    if (!store) throw new Error('No MainLocalization provided!!!')
    return { store }
  }
}
export interface StaticProviderStorage<S> {
  stateRef: ToRefs<S>
}

/**
 * Decorator to save state in localStorage
 * @param param0
 */
export const saveToStorage = <S, T>({
  state,
  storageName,
}: {
  storageName: string
  state: S
}) => (
  target: any,
  propertyKey: string,
  descriptor?: Maybe<TypedPropertyDescriptor<T>>
) => {
  if (descriptor) {
    let set = descriptor.set
    descriptor.set = function(...arg) {
      if (set == undefined) throw Error(`set ${propertyKey} is not defined!`)
      set.call(target, ...arg)
    }
  }
  localStorage.setItem(storageName, JSON.stringify(state))
}
