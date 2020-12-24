export const isDefined = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null
}

export const isNumeric = (val: string | number): val is number => {
  return typeof val === 'number' || /^(-|\+)?\d+(\.\d+)?$/.test(val)
}
