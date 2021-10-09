/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, InjectionKey, Slots, WritableComputedRef } from 'vue'

import { CollapseProps } from './types'

export interface CollapseContext {
  props: CollapseProps
  slots: Slots
  expandedKeys: WritableComputedRef<(string | number)[]>
  expandIcon: ComputedRef<string>
  handleExpand: (key: string | number) => void
}

export const collapseToken: InjectionKey<CollapseContext> = Symbol('collapseToken')
