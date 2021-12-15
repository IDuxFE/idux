/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { TooltipInstance } from '@idux/components/tooltip'
import type { CSSProperties, DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵOverlayPlacementDef } from '@idux/components/_private/overlay'

// slider
export const sliderProps = {
  value: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.arrayOf(IxPropTypes.number)]).def(0),
  disabled: IxPropTypes.bool.def(false),
  dots: IxPropTypes.bool.def(false),
  keyboard: IxPropTypes.bool.def(true),
  marks:
    IxPropTypes.object<
      Record<number, string | VNode | { style?: CSSProperties; label?: string | VNode } | (() => string | VNode)>
    >(),
  max: IxPropTypes.number.def(100),
  min: IxPropTypes.number.def(0),
  range: IxPropTypes.bool.def(false),
  reverse: IxPropTypes.bool.def(false),
  step: IxPropTypes.oneOfType<number | null>([IxPropTypes.number]).def(1),
  tooltipFormatter: IxPropTypes.func<(value: number) => VNode | string | number>(),
  tooltipPlacement: ɵOverlayPlacementDef,
  tooltipVisible: IxPropTypes.bool,
  vertical: IxPropTypes.bool.def(false),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: number | number[]) => void>(),
  onChange: IxPropTypes.emit<(value: number | number[]) => void>(),
  onInput: IxPropTypes.emit<(value: number | number[]) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export interface SliderBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type SliderProps = IxInnerPropTypes<typeof sliderProps>
export type SliderPublicProps = IxPublicPropTypes<typeof sliderProps>
export type SliderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderPublicProps> & SliderPublicProps,
  SliderBindings
>
export type SliderInstance = InstanceType<DefineComponent<SliderProps, SliderBindings>>

// slider thumb
export const sliderThumbProps = {
  value: IxPropTypes.number,

  // events
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export interface SliderThumbBindings {
  tooltipRef: TooltipInstance
  thumbRef: HTMLElement
  isHovering: boolean
  showTooltip: () => void
  hideTooltip: () => void
}

export type SliderThumbProps = IxInnerPropTypes<typeof sliderThumbProps>
export type SliderThumbPublicProps = IxPublicPropTypes<typeof sliderThumbProps>
export type SliderThumbComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderThumbPublicProps> & SliderThumbPublicProps,
  SliderThumbBindings
>
export type SliderThumbInstance = InstanceType<DefineComponent<SliderThumbProps, SliderThumbBindings>>

// slider marks
export const sliderMarksProps = {
  onClickMark: IxPropTypes.emit<(evt: MouseEvent | TouchEvent, markValue: number) => void>(),
}

export type SliderMarksProps = IxInnerPropTypes<typeof sliderMarksProps>
export type SliderMarksPublicProps = IxPublicPropTypes<typeof sliderMarksProps>
export type SliderMarksComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SliderMarksPublicProps> & SliderMarksPublicProps
>
export type SliderMarksInstance = InstanceType<DefineComponent<SliderMarksProps>>
