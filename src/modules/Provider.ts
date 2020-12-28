import { inject, provide } from 'vue'
// https://dev.to/krumpet/generic-type-guard-in-typescript-258l

export class Provider {
  static allProvidersSymbols = new Map<Constructor<any>, symbol>()

  static providers(Models: Maybe<Constructor<any>>[]) {
    for (const Model of Models) {
      if (Model == null) throw Error(`${Model} cannot be null!`)
      const newProviderSymbol = Symbol()
      provide(newProviderSymbol, new Model())
      this.allProvidersSymbols.set(Model, newProviderSymbol)
    }
  }
  static get<C, P extends Constructor<C> = Constructor<C>>(className: P) {
    const symbol = this.allProvidersSymbols.get(className)
    if (symbol == null) throw Error(`${className} doen't have a provider!`)
    const model: Maybe<C> = inject(symbol)

    const isModelProvided = model instanceof className

    if (!model || !isModelProvided)
      throw new Error(`${className} doen't have a provider!`)
    return model
  }
}
