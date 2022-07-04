/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IfAny } from '@vue/shared'
import type { Prop } from 'vue'

export type MaybeArray<T> = T | T[]

type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: any }
    ? T[K] extends { default: undefined }
      ? never
      : K
    : never
}[keyof T]

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>

type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T

export type ExtractPublicPropTypes<O> = {
  [K in keyof Pick<O, PublicRequiredKeys<O>>]: InferPropType<O[K]>
} & {
  [K in keyof Pick<O, PublicOptionalKeys<O>>]?: InferPropType<O[K]>
}

export type ExtractInnerPropTypes<O> = {
  [K in keyof Pick<O, InnerRequiredKeys<O>>]: InferPropType<O[K]>
} & {
  [K in keyof Pick<O, InnerOptionalKeys<O>>]?: InferPropType<O[K]>
}

export function callEmit<T extends (...args: any[]) => any>(
  funcs: T[] | T | undefined,
  ...args: Parameters<T>
): ReturnType<T> | void {
  if (!funcs) {
    return
  }
  if (Array.isArray(funcs)) {
    funcs.forEach(fn => fn(...args))
  } else {
    return funcs(...args)
  }
}

export type VKey = string | number | symbol
