/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PickerControlContext } from './composables/useControl'
import type { FormatContext } from './composables/useFormat'
import type { InputEnableStatus } from './composables/useInputEnableStatus'
import type { OverlayStateContext } from './composables/useOverlayState'
import type { PickerStateContext } from './composables/usePickerState'
import type { PickerRangeControlContext } from './composables/useRangeControl'
import type { DatePickerProps, DateRangePickerProps } from './types'
import type { CommonConfig, DateConfig, DatePickerConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref, Slots, VNodeTypes } from 'vue'

export interface DatePickerContext extends OverlayStateContext, FormatContext, PickerStateContext<DatePickerProps> {
  props: DatePickerProps
  slots: Slots
  common: CommonConfig
  locale: Locale
  config: DatePickerConfig
  focused: ComputedRef<boolean>
  mergedPrefixCls: ComputedRef<string>
  dateConfig: DateConfig
  inputRef: Ref<HTMLInputElement | undefined>
  inputEnableStatus: ComputedRef<InputEnableStatus>
  controlContext: PickerControlContext
  handleKeyDown: (evt: KeyboardEvent) => void
}

export interface DateRangePickerContext
  extends OverlayStateContext,
    FormatContext,
    PickerStateContext<DateRangePickerProps> {
  props: DateRangePickerProps
  slots: Slots
  common: CommonConfig
  focused: ComputedRef<boolean>
  locale: Locale
  config: DatePickerConfig
  mergedPrefixCls: ComputedRef<string>
  dateConfig: DateConfig
  inputRef: Ref<HTMLInputElement | undefined>
  inputEnableStatus: ComputedRef<InputEnableStatus>
  rangeControlContext: PickerRangeControlContext
  renderSeparator: () => VNodeTypes
  handleKeyDown: (evt: KeyboardEvent) => void
}

export const datePickerToken: InjectionKey<DatePickerContext> = Symbol('datePickerToken')
export const dateRangePickerToken: InjectionKey<DateRangePickerContext> = Symbol('dateRangePickerToken')
