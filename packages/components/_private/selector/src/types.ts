/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { FormSize } from '@idux/components/form'

export const selectorProps = {
  allowInput: {
    type: Boolean,
    required: true,
  },
  autofocus: {
    type: Boolean,
    required: true,
  },
  borderless: {
    type: Boolean,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    required: true,
  },
  clearIcon: {
    type: String,
    default: undefined,
  },
  config: {
    type: Object as PropType<{ borderless: boolean; clearIcon: string; size: FormSize; suffix: string }>,
    required: true,
  },
  defaultLabelSlotName: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  maxLabel: {
    type: [Number, String] as PropType<number | 'responsive'>,
    required: true,
  },
  multiple: {
    type: Boolean,
    required: true,
  },
  opened: {
    type: Boolean,
    required: true,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    required: true,
  },
  searchable: {
    type: [Boolean, String] as PropType<boolean | 'overlay'>,
    required: true,
  },
  selectedValue: {
    type: Array,
    required: true,
  },
  selectedData: {
    type: Array,
    required: true,
  },
  size: {
    type: String as PropType<FormSize>,
    default: undefined,
  },
  suffix: {
    type: String,
    default: undefined,
  },

  onBlur: {
    type: Function as PropType<(evt: FocusEvent) => void>,
    required: true,
  },
  onClear: {
    type: Function as PropType<(evt: MouseEvent) => void>,
    required: true,
  },
  onInputValueChange: {
    type: Function as PropType<(value: string) => void>,
    required: true,
  },
  onItemRemove: {
    type: Function as PropType<(value: unknown) => void>,
    required: true,
  },
  onOpenedChange: {
    type: Function as PropType<(opened: boolean) => void>,
    required: true,
  },
  onWidthChange: {
    type: Function as PropType<(width: string) => void>,
    required: true,
  },

  onCompositionStart: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onCompositionEnd: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
} as const

export type SelectorProps = ExtractInnerPropTypes<typeof selectorProps>
export type SelectorPublicProps = ExtractPublicPropTypes<typeof selectorProps>
export interface SelectorBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
  clearInput: () => void
}
export type SelectorComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectorPublicProps> & SelectorPublicProps,
  SelectorBindings
>
export type SelectorInstance = InstanceType<DefineComponent<SelectorProps, SelectorBindings>>
