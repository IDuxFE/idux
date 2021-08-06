import { isNil } from 'lodash-es'
import { isNumeric } from './typeof'

export function convertArray<T>(value: T | undefined | null | Array<T | undefined | null>): T[]
export function convertArray<T>(value: T | readonly T[]): readonly T[]
export function convertArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}

export function convertNumber(value: unknown): number
export function convertNumber<T>(value: unknown, fallback: T): number | T
export function convertNumber(value: unknown, fallback = 0): number {
  return isNumeric(value) ? Number(value) : fallback
}

export function convertBoolean(value: unknown): boolean {
  return `${value}` !== 'false' && !!value
}

export function convertCssPixel(value: unknown): string {
  if (isNil(value)) {
    return ''
  }
  return typeof value === 'string' ? value : `${value}px`
}
