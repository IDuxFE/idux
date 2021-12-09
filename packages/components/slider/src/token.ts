/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderProps } from './types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export const sliderStartDirection = {
  ltr: 'left',
  rtl: 'right',
  btt: 'bottom',
  ttb: 'top',
} as const

export type ValueOf<T> = T[keyof T]

export interface SliderContext {
  values: Ref<number[]>
  direction: ComputedRef<ValueOf<typeof sliderStartDirection>>
  disabled: ComputedRef<SliderProps['disabled']>
  dragging: Ref<boolean>
  dots: Ref<SliderProps['dots']>
  marks: Ref<SliderProps['marks']>
  max: Ref<SliderProps['max']>
  min: Ref<SliderProps['min']>
  prefixCls: ComputedRef<string>
  range: Ref<SliderProps['range']>
  reverse: Ref<SliderProps['reverse']>
  step: Ref<SliderProps['step']>
  tooltipFormatter: Ref<SliderProps['tooltipFormatter']>
  tooltipPlacement: Ref<SliderProps['tooltipPlacement']>
  tooltipVisible: Ref<SliderProps['tooltipVisible']>
  vertical: Ref<SliderProps['vertical']>
}

export const sliderToken: InjectionKey<SliderContext> = Symbol('sliderToken')
