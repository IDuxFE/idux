/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SplitPanelProps } from './types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface SplitPanelContext {
  prefixCls: ComputedRef<string>
  props: SplitPanelProps
  containerSize: Ref<number>
  areaSizeArray: Ref<(number | undefined)[]>
  areaMinSizeArray: Ref<number[]>
}

export const splitPanelToken: InjectionKey<SplitPanelContext> = Symbol('splitPanelToken')
