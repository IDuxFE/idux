/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TabsContext {
  selectedKey: Ref<string | number | undefined>
  mergedPrefixCls: ComputedRef<string>
  handleTabClick: (key: string | number, evt: Event) => void
}

export const tabsToken: InjectionKey<TabsContext> = Symbol('tabsToken')
