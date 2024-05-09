/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabsData, TabsProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { CommonConfig, TabsConfig } from '@idux/components/config'
import type { TabsLocale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TabsContext {
  common: CommonConfig
  config: TabsConfig
  props: TabsProps
  locale: TabsLocale
  mergedPrefixCls: ComputedRef<string>
  mergedDataSource: ComputedRef<TabsData[]>
  allTabsPanelVisible: ComputedRef<boolean>
  isHorizontal: ComputedRef<boolean>
  closedKeys: ComputedRef<VKey[]>
  selectedKey: ComputedRef<VKey | undefined>
  navAttrs: Ref<Record<VKey, { offset: number; size: number } | undefined>>
  handleTabClick: (key: VKey, evt: Event) => Promise<void>
  handleTabClose: (key: VKey) => Promise<void>
  setSelectedKey: (value: VKey) => void
  setAllTabsPanelVisible: (opened: boolean) => void
}

export const tabsToken: InjectionKey<TabsContext> = Symbol('tabsToken')
