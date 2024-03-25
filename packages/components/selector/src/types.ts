/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { GetKeyFn } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

export interface SelectorData<K = VKey> {
  disabled?: boolean
  key?: K
  label?: string | number
  value?: any
  rawData?: any
  customLabel?: string | ((data: SelectorData<K>) => VNodeChild)

  [key: string]: any
}

export const selectorProps = {
  input: String,
  allowInput: { type: [Boolean, String] as PropType<boolean | 'searchable'>, default: undefined },
  autocomplete: { type: String, default: undefined },
  autofocus: { type: Boolean, default: undefined },
  borderless: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: undefined },
  clearIcon: { type: String, default: 'close-circle' },
  dataSource: Array as PropType<SelectorData[]>,
  disabled: { type: Boolean, default: undefined },
  focused: { type: Boolean, default: undefined },
  getKey: { type: [String, Function] as PropType<string | GetKeyFn>, default: 'key' },
  labelKey: { type: String, default: undefined },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: undefined },
  multiple: { type: Boolean, default: undefined },
  monitorFocus: { type: Boolean, default: true },
  opened: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: undefined },
  size: { type: String as PropType<FormSize>, default: 'md' },
  status: String as PropType<ValidateStatus>,
  suffix: { type: String, default: undefined },
  suffixRotate: { type: [Boolean, Number, String] as PropType<boolean | string | number>, default: undefined },

  'onUpdate:input': [Function, Array] as PropType<MaybeArray<(input: string | undefined) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onCompositionStart: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onCompositionEnd: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onInputValueChange: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onItemRemove: [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
} as const

export type SelectorProps = ExtractInnerPropTypes<typeof selectorProps>
export type SelectorPublicProps = ExtractPublicPropTypes<typeof selectorProps>
export interface SelectorBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
  clearInput: () => void
  getBoundingClientRect: () => DOMRect | undefined
}
export type SelectorComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectorPublicProps> & SelectorPublicProps,
  SelectorBindings
>
export type SelectorInstance = InstanceType<DefineComponent<SelectorProps, SelectorBindings>>
