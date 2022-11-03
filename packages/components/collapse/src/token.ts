/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CollapseProps, CollapseSize } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface CollapseContext {
  props: CollapseProps
  slots: Slots
  mergedSize: ComputedRef<CollapseSize>
  expandedKeys: ComputedRef<VKey[]>
  expandIcon: ComputedRef<string>
  handleExpand: (key: VKey) => void
}

export const collapseToken: InjectionKey<CollapseContext> = Symbol('collapseToken')
