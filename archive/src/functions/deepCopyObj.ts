export const deepCopyObj = <T extends object>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T
