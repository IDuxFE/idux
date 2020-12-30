import { isNil, isNumeric } from './typeof'

export function toArray<T>(value: T | T[]): T[]
export function toArray<T>(value: T | readonly T[]): readonly T[]
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function toNumber(value: unknown): number
export function toNumber<T>(value: unknown, fallback: T): number | T
export function toNumber(value: unknown, fallback = 0): number {
  return isNumeric(value) ? Number(value) : fallback
}

export function toBoolean(value: unknown): boolean {
  return `${value}` !== 'false' && !!value
}

export function toCssPixel(value: unknown): string {
  if (isNil(value)) {
    return ''
  }
  return typeof value === 'string' ? value : `${value}px`
}
