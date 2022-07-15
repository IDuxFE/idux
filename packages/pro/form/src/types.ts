/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormItemProps, FormProps } from '@idux/components/form'
import type { RowProps } from '@idux/components/grid'
import type { Options as AjvOptions } from 'ajv'
import type { Component, DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

export const proFormProps = {
  ajvOptions: Object as PropType<AjvOptions>,
  autoId: { type: [Boolean, String] as PropType<boolean | string>, default: undefined },
  autoLabelFor: { type: Boolean, default: undefined },
  fields: Object as PropType<ProFormFieldsSchema>,
  ignoreKeywords: Array as PropType<string[]>,
  schema: Object as PropType<ProFormJsonSchema>,
  schemaFormatter: Function as PropType<ProFormSchemaFormatter>,

  //events
  onSubmit: [Function, Array] as PropType<MaybeArray<(formData: any) => void>>,
} as const

export type ProFormProps = ExtractInnerPropTypes<typeof proFormProps>
export type ProFormPublicProps = ExtractPublicPropTypes<typeof proFormProps>
export type ProFormComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProFormPublicProps> & ProFormPublicProps & FormProps
>
export type ProFormInstance = InstanceType<DefineComponent<ProFormProps>>

type ArrayElement<A> = A extends (infer T)[] ? T : never

export type ProFormSchemaFormatter = (
  fields: ProFormFieldsSchema | undefined,
  schema: ProFormJsonSchema | undefined,
) => { fields: ProFormFieldsSchema; schema: ProFormJsonSchema }

// custom render(slots)
export interface ProFormItemCustoms {
  customControl?: string | ((props: { control: AbstractControl; [key: string]: any }) => VNodeChild)
  customControlTooltip?: string | (() => VNodeChild)
  customDescription?: string | (() => VNodeChild)
  customLabel?: string | (() => VNodeChild)
  customLabelTooltip?: string | (() => VNodeChild)
  customMessage?: string | (() => VNodeChild)
}

export interface ProFormFieldsSchema<T = any> extends ProFormItemCustoms {
  formProps?: FormProps
  formItemProps?: FormItemProps & RowProps
  component?: string | Component
  componentProps?: any

  default?: T

  disabled?: boolean
  name?: string
  example?: string
  trigger?: 'change' | 'blur' | 'submit'
  validators?: ValidatorFn | ValidatorFn[]
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[]

  order?: string[]
  type?: 'object' | 'array'

  // show?: boolean | ((control: AbstractControl) => boolean)
  // if?: boolean | ((control: AbstractControl) => boolean)

  properties?: { readonly [K in keyof T]: ProFormFieldsSchema<T[K]> }
  items?: ProFormFieldsSchema<ArrayElement<T>>
}

export type ProFormJsonSchema<T = any> =
  | ObjectKeywords<T>
  | ArrayKeywords<T>
  | StringKeywords<T>
  | NumberKeywords<T>
  | BooleanKeywords<T>

export interface CommonKeywords<T> {
  title?: string
  description?: string
  const?: any
  enum?: Readonly<(T | null)[]>
  default?: T | null
}

export interface ObjectKeywords<T> extends CommonKeywords<T> {
  type?: 'object'
  properties: { readonly [K in keyof T]: ProFormJsonSchema<T[K]> }
  required?: (keyof T)[]
}

export interface ArrayKeywords<T> extends CommonKeywords<T> {
  type: 'array'
  items?: ProFormJsonSchema<ArrayElement<T>>
  minItems?: number
  maxItems?: number
}

export interface StringKeywords<T> extends CommonKeywords<T> {
  type: 'string'
  minLength?: number
  maxLength?: number
  pattern?: string
  format?: string
}

export interface NumberKeywords<T> extends CommonKeywords<T> {
  type: 'number' | 'integer'
  minimum?: number
  maximum?: number
  format?: string
}

export interface BooleanKeywords<T> extends CommonKeywords<T> {
  type: 'boolean'
}
