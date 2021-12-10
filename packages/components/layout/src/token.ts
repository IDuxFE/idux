/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, InjectionKey } from 'vue'

export interface LayoutSiderContext {
  collapsed: ComputedRef<boolean>
  setCollapsed: (collapsed: boolean) => void
}

export const layoutSiderToken: InjectionKey<LayoutSiderContext> = Symbol('layoutSider')
