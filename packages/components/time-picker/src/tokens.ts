/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerControlContext } from './composables/useControl'
import type { InputEnableStatus } from './composables/useInputEnableStatus'
import type { OverlayStateContext } from './composables/useOverlayState'
import type { PickerStateContext } from './composables/usePickerState'
import type { PickerRangeControlContext } from './composables/useRangeControl'
import type { TimePickerProps, TimeRangePickerProps } from './types'
import type { CommonConfig, DateConfig, TimePickerConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref, Slots, VNodeTypes } from 'vue'

interface BasePickerContext<T extends TimePickerProps | TimeRangePickerProps>
  extends PickerStateContext<T>,
    OverlayStateContext {
  props: T
  slots: Slots
  dateConfig: DateConfig
  common: CommonConfig
  locale: Locale
  config: TimePickerConfig
  inputRef: Ref<HTMLInputElement | undefined>
  mergedPrefixCls: ComputedRef<string>
  formatRef: ComputedRef<string>
  inputEnableStatus: ComputedRef<InputEnableStatus>
  handleKeyDown: (evt: KeyboardEvent) => void
}

export interface TimePickerContext extends BasePickerContext<TimePickerProps> {
  controlContext: PickerControlContext
}
export interface TimeRangePickerContext extends BasePickerContext<TimeRangePickerProps> {
  rangeControlContext: PickerRangeControlContext
  renderSeparator: () => VNodeTypes
}

export const timePickerContext: InjectionKey<TimePickerContext> = Symbol('timePickerContext')
export const timeRangePickerContext: InjectionKey<TimeRangePickerContext> = Symbol('timeRangePickerContext')
