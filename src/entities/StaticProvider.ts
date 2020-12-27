import { ToRefs } from 'vue'

export interface StaticProviderStorage<S> {
  stateRef: ToRefs<S>
  fromJson({ stateStr }: { stateStr: string }): void
  loadFromStorage(): void
}

interface SaveToStorageArg<S> {
  storageName: string
  state: S
}
/**
 * Decorator to save state in localStorage
 * @param param0
 */
export const saveToStorage = <S, T>(arg: SaveToStorageArg<S>) => {
  const { state, storageName } = arg
  return (
    target: StaticProviderStorage<S>,
    propertyKey: string,
    descriptor?: Maybe<TypedPropertyDescriptor<T>>
  ) => {
    if (descriptor) {
      const set = descriptor.set
      descriptor.set = function(...arg) {
        if (set == undefined) throw Error(`set ${propertyKey} is not defined!`)

        set.call(target, ...arg)
        localStorage.setItem(storageName, JSON.stringify(state))
      }
      return descriptor
    }
  }
}
