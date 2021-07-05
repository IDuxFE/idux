/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode, Prop } from 'vue'
import type { VueTypeDef, VueTypeValidableDef } from 'vue-types'
import type { InferType, Prop as VueTypeProp, VueProp } from 'vue-types/dist/types'

import { isVNode } from 'vue'
import {
  func,
  array,
  object,
  custom,
  oneOf,
  oneOfType,
  arrayOf,
  instanceOf,
  objectOf,
  shape,
  toValidableType,
  toType,
} from 'vue-types'

type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: any } ? K : never
}[keyof T]

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>

type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : T extends ObjectConstructor | { type: ObjectConstructor }
  ? Record<string, any>
  : T extends BooleanConstructor | { type: BooleanConstructor }
  ? boolean
  : T extends Prop<infer V, infer D>
  ? unknown extends V
    ? D
    : V
  : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & { [K in PublicOptionalKeys<O>]?: InferPropType<O[K]> }
  : { [K in string]: any }

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxInnerPropTypes<O> = O extends object
  ? { [K in InnerRequiredKeys<O>]: InferPropType<O[K]> } & { [K in InnerOptionalKeys<O>]?: InferPropType<O[K]> }
  : { [K in string]: any }

export class IxPropTypes {
  static get any(): VueTypeValidableDef<any> {
    return toValidableType('any', { default: undefined })
  }

  static get bool(): VueTypeValidableDef<boolean> {
    return toValidableType('boolean', {
      type: Boolean,
      default: undefined,
    })
  }

  static get string(): VueTypeValidableDef<string> {
    return toValidableType('string', {
      type: String,
      default: undefined,
    })
  }
  static get number(): VueTypeValidableDef<number> {
    return toValidableType('number', {
      type: Number,
      default: undefined,
    })
  }
  static get integer(): VueTypeValidableDef<number> {
    return toValidableType('integer', {
      type: Number,
      validator(value) {
        return Number.isInteger(value)
      },
      default: undefined,
    })
  }
  static get symbol(): VueTypeDef<symbol> {
    return toType<symbol>('symbol', {
      validator(value) {
        return typeof value === 'symbol'
      },
      default: undefined,
    })
  }

  static custom = custom
  static instanceOf = instanceOf
  static arrayOf = arrayOf
  static objectOf = objectOf
  static shape = shape

  static object<T>(): VueTypeValidableDef<T> {
    return object<T>()
  }

  static func<T extends (...args: any[]) => any>(): VueTypeValidableDef<T> {
    return func<T>()
  }

  static array<T>(): VueTypeValidableDef<T[]> {
    return array<T>()
  }

  static oneOfType<T>(arr: Array<VueProp<T> | VueTypeProp<T>>): VueTypeDef<T>
  static oneOfType<U extends VueProp<any> | VueTypeProp<any>, V = InferType<U>>(arr: U[]): VueTypeDef<V>
  static oneOfType<U extends VueProp<any> | VueTypeProp<any>, V = InferType<U>>(arr: U[]): VueTypeDef<V> {
    const type = oneOfType<U, V>(arr)
    type.default = undefined
    return type
  }

  static oneOf<T>(arr: T[]): VueTypeDef<T>
  static oneOf<T extends readonly any[]>(arr: T): VueTypeDef<T[number]>
  static oneOf(arr: any[]): VueTypeDef<unknown> {
    return oneOf(arr)
  }

  static get vNode(): VueTypeValidableDef<VNode> {
    return toValidableType('vNode', {
      type: Object,
      validator: (value: unknown) => isVNode(value),
    }) as VueTypeValidableDef<VNode>
  }

  // define a custom validator that accepts configuration parameters
  static maxLength(max: number): VueTypeValidableDef<string> {
    return toValidableType('maxLength', {
      type: String,
      validator: (value: string) => value.length <= max,
    })
  }

  static minLength(min: number): VueTypeValidableDef<string> {
    return toValidableType('minLength', {
      type: String,
      validator: (value: string) => value.length >= min,
    })
  }

  static max(max: number): VueTypeValidableDef<number> {
    return toValidableType('max', {
      type: Number,
      validator: (value: number) => value <= max,
    })
  }

  static min(min: number): VueTypeValidableDef<number> {
    return toValidableType('min', {
      type: Number,
      validator: (value: number) => value >= min,
    })
  }

  static range(min: number, max: number): VueTypeValidableDef<number> {
    return toValidableType('range', {
      type: Number,
      validator: (value: number) => value >= min && value <= max,
    })
  }

  static emit<T extends (...args: any[]) => any>(): VueTypeDef<T | T[]> {
    return oneOfType([func<T>(), array<T>()])
  }
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
