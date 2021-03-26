/* eslint-disable @typescript-eslint/no-explicit-any */

import { toRawType } from '@vue/shared'

const _toString = Object.prototype.toString

/** The method checks whether the given value is a Numeric value or not and returns the corresponding boolean value. */
export function isNumeric(val: unknown): boolean {
  return !isNaN(parseFloat(val as string)) && isFinite(val as number)
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNil(val: unknown): val is null | undefined {
  return isUndefined(val) || isNull(val)
}

export function isNonNil<T>(val: T): val is NonNullable<T> {
  return !isNil(val)
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

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

export function isPlainObject(val: unknown): val is Record<any, any> {
  return _toString.call(val) === '[object Object]'
}

export function isObject<T = Record<any, any>>(val: unknown): val is T {
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

// eslint-disable-next-line @typescript-eslint/ban-types
export function hasOwnProperty(val: object, key: string | symbol): key is keyof typeof val {
  return Object.prototype.hasOwnProperty.call(val, key)
}

export const isHTMLElement = (val: unknown): val is HTMLElement => toRawType(val).startsWith('HTML')
