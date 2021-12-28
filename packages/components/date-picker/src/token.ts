/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { InputStateContext } from './composables/useInputState'
import type { OverlayStateContext } from './composables/useOverlayState'
import type { PanelStateContext } from './composables/usePanelState'
import type { DatePickerProps } from './types'
import type { FocusMonitor } from '@idux/cdk/a11y'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { DateConfig, DatePickerConfig } from '@idux/components/config'
import type { DatePickerLocale } from '@idux/components/i18n'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface DataPickerContext extends InputStateContext, OverlayStateContext, PanelStateContext {
  props: DatePickerProps
  slots: Slots
  locale: ComputedRef<DatePickerLocale>
  config: DatePickerConfig
  mergedPrefixCls: ComputedRef<string>
  dateConfig: DateConfig
  focusMonitor: FocusMonitor
  inputRef: Ref<HTMLInputElement | undefined>
  format: ComputedRef<string>
  accessor: ValueAccessor
  handlePanelCellClick: (date: Date) => void
}

export const datePickerToken: InjectionKey<DataPickerContext> = Symbol('datePickerToken')
