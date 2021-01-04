/* eslint-disable @typescript-eslint/no-explicit-any */
/** The method checks whether the given value is a Numeric value or not and returns the corresponding boolean value. */
const _toString = Object.prototype.toString

export function isNumeric(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number)
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

export function isNonNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

export function isPlainObject(val: unknown): val is Record<any, any> {
  return _toString.call(val) === '[object Object]'
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isFunction(val: unknown): val is typeof Function {
  return _toString.call(val) === '[object Function]'
}

export const isArray = Array.isArray

export function isMap(val: unknown): val is Array<unknown> {
  return _toString.call(val) === '[object Map]'
}

export function isSet(val: unknown): val is Set<unknown> {
  return _toString.call(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return val instanceof Date
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
