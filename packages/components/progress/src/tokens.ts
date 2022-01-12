/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ConvertProgressSuccess, ProgressProps, ProgressStatus } from './types'
import type { ProgressConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

interface ProgressContext {
  config: Readonly<ProgressConfig>
  mergedPrefixCls: ComputedRef<string>
  props: ProgressProps
  slots: Slots
  status: ComputedRef<ProgressStatus>
  percent: ComputedRef<number>
  formattedSuccess: ComputedRef<ConvertProgressSuccess>
}

export const progressContext: InjectionKey<ProgressContext> = Symbol('progressContext')
