/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabsData, TabsProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey } from 'vue'

export interface TabsContext {
  props: TabsProps
  mergedPrefixCls: ComputedRef<string>
  mergedDataSource: ComputedRef<TabsData[]>
  isHorizontal: ComputedRef<boolean>
  closedKeys: ComputedRef<VKey[]>
  navAttrMap: Map<VKey, { offset: number; size: number }>
  handleTabClick: (key: VKey, evt: Event) => Promise<void>
  handleTabClose: (key: VKey) => Promise<void>
  setSelectedKey: (value: VKey) => void
}

export const tabsToken: InjectionKey<TabsContext> = Symbol('tabsToken')
