/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputEnableStatus } from './composables/useInputEnableStatus'
import type { PickerControl } from './composables/usePickerControl'
import type { TimePickerProps, TimeRangePickerProps } from './types'
import type { DateConfig, TimePickerConfig } from '@idux/components/config'
import type { FormContext } from '@idux/components/form'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface TimePickerContext<T extends TimePickerProps | TimeRangePickerProps> {
  config: Readonly<TimePickerConfig>
  dateConfig: DateConfig
  props: T
  format: ComputedRef<string>
  formContext: FormContext | null
  slots: Slots
  isDisabled: ComputedRef<boolean>
  overlayOpened: ComputedRef<boolean>
  inputEnableStatus: ComputedRef<InputEnableStatus>
  setOverlayOpened: (open: boolean) => void
  handleClear: (evt: Event) => void
  mergedPrefixCls: ComputedRef<string>
}

export const timePickerContext: InjectionKey<TimePickerContext<TimePickerProps>> = Symbol('timePickerContext')
export const timeRangePickerContext: InjectionKey<TimePickerContext<TimeRangePickerProps>> =
  Symbol('timeRangePickerContext')
export const timePickerControl: InjectionKey<PickerControl> = Symbol('timePickerControl')
export const timeRangePickerControl: InjectionKey<[PickerControl, PickerControl]> = Symbol('timeRangePickerControl')
