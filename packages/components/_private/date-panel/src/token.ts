/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActiveDateContext } from './composables/useActiveDate'
import type { ActiveTypeContext } from './composables/useActiveType'
import type { MaxIndexContext } from './composables/useMaxIndex'
import type { DatePanelProps } from './types'
import type { DateConfig } from '@idux/components/config'
import type { DatePickerLocale } from '@idux/components/i18n'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface DatePanelContext extends ActiveTypeContext, ActiveDateContext, MaxIndexContext {
  props: DatePanelProps
  slots: Slots
  locale: ComputedRef<DatePickerLocale>
  mergedPrefixCls: ComputedRef<string>
  dateConfig: DateConfig
}

export const datePanelToken: InjectionKey<DatePanelContext> = Symbol('datePanelToken')
