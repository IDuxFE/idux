export function isNumber(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && !isNaN(Number(value))
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

export function isNonNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null
}
