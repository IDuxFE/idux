/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type InjectionKey } from 'vue'

import { LayoutCollapseChangeType } from './types'

export interface LayoutSiderContext {
  mergedPrefixCls: ComputedRef<string>
  collapsed: ComputedRef<boolean>
  setCollapsed: (collapsed: boolean, changeType: LayoutCollapseChangeType) => void
}

export const layoutSiderToken: InjectionKey<LayoutSiderContext> = Symbol('layoutSider')
