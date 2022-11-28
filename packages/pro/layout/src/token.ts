/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type InjectionKey, type Slots } from 'vue'

import { type VKey } from '@idux/cdk/utils'
import { type LayoutCollapseChangeType } from '@idux/components/layout'
import { type MenuData } from '@idux/components/menu'

import { type ProLayoutProps } from './types'

export interface ProLayoutContext {
  props: ProLayoutProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  activeKey: ComputedRef<VKey>
  setActiveKey: (value: VKey) => void
  activePaths: ComputedRef<MenuData[]>
  headerMenus: ComputedRef<MenuData[]>
  activeHeaderKey: ComputedRef<VKey | undefined>
  siderMenus: ComputedRef<MenuData[]>
  collapsed: ComputedRef<boolean>
  setCollapsed: (collapsed: boolean, changeType: LayoutCollapseChangeType) => void
}

export const proLayoutToken: InjectionKey<ProLayoutContext> = Symbol('proLayout')
