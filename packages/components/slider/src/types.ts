/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl } from '@idux/cdk/forms'
import type { PopperPlacement } from '@idux/cdk/popper'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { TooltipInstance } from '@idux/components/tooltip'
import type { CSSProperties, DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

// slider
export const sliderProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: [Number, Array] as PropType<number | number[]>, default: undefined },

  disabled: { type: Boolean, default: false },
  dots: { type: Boolean, default: false },
  keyboard: { type: Boolean, default: true },
  marks: {
    type: Object as PropType<
      Record<number, string | VNode | { style?: CSSProperties; label?: string | VNode } | (() => string | VNode)>
    >,
    default: undefined,
  },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 0 },
  range: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  tooltipFormatter: { type: Function as PropType<(value: number) => VNode | string | number>, default: undefined },
  tooltipPlacement: { type: String as PropType<PopperPlacement>, default: undefined },
  tooltipVisible: { type: Boolean, default: undefined },
  vertical: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: number | number[]) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(newValue: number | number[], oldVal: number | number[]) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

export interface SliderBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type SliderProps = ExtractInnerPropTypes<typeof sliderProps>
export type SliderPublicProps = ExtractPublicPropTypes<typeof sliderProps>
export type SliderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderPublicProps> & SliderPublicProps,
  SliderBindings
>
export type SliderInstance = InstanceType<DefineComponent<SliderProps, SliderBindings>>

// slider thumb
export const sliderThumbProps = {
  value: { type: Number, default: undefined },

  // events
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
}

export interface SliderThumbBindings {
  tooltipRef: TooltipInstance
  thumbRef: HTMLElement
  isHovering: boolean
  showTooltip: () => void
  hideTooltip: () => void
}

export type SliderThumbProps = ExtractInnerPropTypes<typeof sliderThumbProps>
export type SliderThumbPublicProps = ExtractPublicPropTypes<typeof sliderThumbProps>
export type SliderThumbComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderThumbPublicProps> & SliderThumbPublicProps,
  SliderThumbBindings
>
export type SliderThumbInstance = InstanceType<DefineComponent<SliderThumbProps, SliderThumbBindings>>

// slider marks
export const sliderMarksProps = {
  onClickMark: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent | TouchEvent, markValue: number) => void>>,
}

export type SliderMarksProps = ExtractInnerPropTypes<typeof sliderMarksProps>
export type SliderMarksPublicProps = ExtractPublicPropTypes<typeof sliderMarksProps>
export type SliderMarksComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderMarksPublicProps> & SliderMarksPublicProps
>
export type SliderMarksInstance = InstanceType<DefineComponent<SliderMarksProps>>
