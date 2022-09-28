/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const selectorProps = {
  allowInput: { type: Boolean, required: true },
  autocomplete: { type: String, required: true },
  autofocus: { type: Boolean, required: true },
  borderless: { type: Boolean, default: undefined },
  className: { type: String, required: true },
  clearable: { type: Boolean, required: true },
  clearIcon: { type: String, default: undefined },
  config: {
    type: Object as PropType<{ borderless: boolean; clearIcon: string; size: FormSize; suffix: string }>,
    required: true,
  },
  dataSource: { type: Array, required: true },
  defaultLabelSlotName: { type: String, default: undefined },
  disabled: { type: Boolean, required: true },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, required: true },
  multiple: { type: Boolean, required: true },
  opened: { type: Boolean, required: true },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, required: true },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, required: true },
  size: { type: String as PropType<FormSize>, default: undefined },
  status: String as PropType<ValidateStatus>,
  suffix: { type: String, default: undefined },
  value: { type: Array, required: true },

  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onCompositionStart: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onCompositionEnd: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onInputValueChange: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemRemove: [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  onOpenedChange: [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onResize: [Function, Array] as PropType<MaybeArray<(rect: DOMRect) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
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
