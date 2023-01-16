/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const rateProps = {
  value: [Number, String] as PropType<number | string>,
  allowHalf: {
    type: Boolean,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: undefined,
  },
  count: [Number, String] as PropType<number | string>,
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: String,
  tooltips: {
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
  size: String as PropType<FormSize>,
  color: {
    type: String,
    default: undefined,
  },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: number) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: number) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onKeyDown: [Function, Array] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
} as const

export type RateProps = ExtractInnerPropTypes<typeof rateProps>
export type RatePublicProps = ExtractPublicPropTypes<typeof rateProps>
export interface RateBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type RateComponent = DefineComponent<Omit<HTMLAttributes, keyof RatePublicProps> & RatePublicProps, RateBindings>
export type RateInstance = InstanceType<DefineComponent<RateProps, RateBindings>>

// private
export const rateItemProps = {
  count: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  focused: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  prefixCls: {
    type: String,
    required: true,
  },
  tooltip: String,
  value: {
    type: Number,
    required: true,
  },
  color: String,

  // events
  onClick: {
    type: Function as PropType<(evt: MouseEvent, element: HTMLElement, index: number) => void>,
    required: true,
  },
  onMouseMove: {
    type: Function as PropType<(evt: MouseEvent, element: HTMLElement, index: number) => void>,
    required: true,
  },
} as const
