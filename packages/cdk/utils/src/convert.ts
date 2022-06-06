/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComponentPublicInstance, type Ref, unref } from 'vue'

import { isNil } from 'lodash-es'

import { isHTMLElement, isNumeric } from './typeof'

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

export type MaybeRef<T> = T | Ref<T>
export type MaybeElement = ComponentPublicInstance | HTMLElement | null | undefined
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>

export function convertElement<T extends MaybeElement>(
  elementOrInstance: MaybeElementRef<T>,
): T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined {
  const element = unref(elementOrInstance)
  return isHTMLElement(element) ? element : element?.$el
}
