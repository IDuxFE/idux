/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DescLabelAlign } from './types'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ComputedRef, InjectionKey } from 'vue'

export interface DescContext {
  mergedPrefixCls: ComputedRef<string>
  mergedCol: ComputedRef<number | string | Record<BreakpointKey, number | string>>
  mergedColonless: ComputedRef<boolean>
  mergedLabelAlign: ComputedRef<DescLabelAlign>
  mergedLabelWidth: ComputedRef<string | number>
}

export const descToken: InjectionKey<DescContext> = Symbol('descToken')
