/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputEnableStatus } from './composables/useInputEnableStatus'
import type { PickerControl } from './composables/usePickerControl'
import type { TimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import type { TimePickerProps, TimeRangePickerProps } from './types'
import type { DateConfig, TimePickerConfig } from '@idux/components/config'
import type { FormContext } from '@idux/components/form'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Slots, VNodeTypes } from 'vue'

interface BasePickerContext<T extends TimePickerProps | TimeRangePickerProps> {
  props: T
  slots: Slots
  dateConfig: DateConfig
  locale: Locale
  config: TimePickerConfig
  mergedPrefixCls: ComputedRef<string>
  format: ComputedRef<string>
  formContext: FormContext | null
  overlayOpened: ComputedRef<boolean>
  inputEnableStatus: ComputedRef<InputEnableStatus>
  commonBindings: TimePickerCommonBindings<T>
  setOverlayOpened: (open: boolean) => void
}

export type TimePickerContext = BasePickerContext<TimePickerProps>
export interface TimeRangePickerContext extends BasePickerContext<TimeRangePickerProps> {
  bufferValue: ComputedRef<[Date | undefined, Date | undefined]>
  renderSeparator: () => VNodeTypes
}

export const timePickerContext: InjectionKey<TimePickerContext> = Symbol('timePickerContext')
export const timeRangePickerContext: InjectionKey<TimeRangePickerContext> = Symbol('timeRangePickerContext')
export const timePickerControl: InjectionKey<PickerControl> = Symbol('timePickerControl')
export const timeRangePickerControl: InjectionKey<[PickerControl, PickerControl]> = Symbol('timeRangePickerControl')
