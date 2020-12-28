/* class decorator */
export const StaticClass = <T>() => {
  return <U extends T>(constructor: U) => {
    constructor
  }
}
