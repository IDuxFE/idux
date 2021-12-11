/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLayoutMenuData, ProLayoutProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface ProLayoutContext {
  props: ProLayoutProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  activeKey: ComputedRef<VKey>
  setActiveKey: (value: VKey) => void
  activePaths: ComputedRef<ProLayoutMenuData[]>
  headerMenus: ComputedRef<ProLayoutMenuData[]>
  activeHeaderKey: ComputedRef<VKey | undefined>
  siderMenus: ComputedRef<ProLayoutMenuData[]>
  collapsed: ComputedRef<boolean>
  setCollapsed: (collapsed: boolean) => void
}

export const proLayoutToken: InjectionKey<ProLayoutContext> = Symbol('proLayout')
