/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProgressProps, ProgressSize, ProgressStatus, ProgressStrokeLinecap } from './types'
import type { ProgressConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey } from 'vue'

interface ProgressContext {
  config: Readonly<ProgressConfig>
  mergedPrefixCls: ComputedRef<string>
  mergedSize: ComputedRef<ProgressSize>
  mergedStrokeLinecap: ComputedRef<ProgressStrokeLinecap>
  props: ProgressProps
  status: ComputedRef<ProgressStatus>
  successPercent: ComputedRef<number>
  percent: ComputedRef<number>
}

export const progressContext: InjectionKey<ProgressContext> = Symbol('progressContext')
