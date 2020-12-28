import { ToRefs } from 'vue'

export interface ProviderStorage<S> {
  stateRef: ToRefs<S>
  fromJson({ stateStr }: { stateStr: string }): void
  loadFromStorage(): void
  constructor: Function
}

export interface StaticProviderStorage<S> {
  storageName: string
  state: S
}
/**
 * Decorator to save state in localStorage
 * @param param0
 */
export const saveToStorage = <S, T>() => {
  return (
    target: ProviderStorage<S>,
    propertyKey: string,
    descriptor?: Maybe<TypedPropertyDescriptor<T>>
  ) => {
    if (descriptor) {
      const set = descriptor.set
      descriptor.set = function(...arg) {
        if (set == undefined) throw Error(`set ${propertyKey} is not defined!`)
        const staticProps = (target.constructor as unknown) as StaticProviderStorage<
          S
        >

        set.call(target, ...arg)
        localStorage.setItem(
          staticProps.storageName,
          JSON.stringify(staticProps.state)
        )
      }
      return descriptor
    }
  }
}
