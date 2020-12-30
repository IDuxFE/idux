/** The method checks whether the given value is a Numeric value or not and returns the corresponding boolean value. */
export function isNumeric(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number)
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

export function isNonNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null
}
