/* eslint-disable @typescript-eslint/no-explicit-any */
import { toRawType } from '@vue/shared'
import { isFunction, isObject } from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/ban-types
export function hasOwnProperty(val: object, key: string | symbol): key is keyof typeof val {
  return Object.prototype.hasOwnProperty.call(val, key)
}

/** The method checks whether the given value is a Numeric value or not and returns the corresponding boolean value. */
export function isNumeric(val: unknown): boolean {
  return !isNaN(parseFloat(val as string)) && isFinite(val as number)
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction((val as any).then) && isFunction((val as any).catch)
}

export const isHTMLElement = (val: unknown): val is HTMLElement => toRawType(val).startsWith('HTML')
