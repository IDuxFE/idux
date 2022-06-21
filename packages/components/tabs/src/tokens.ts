/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TabsContext {
  selectedKey: Ref<VKey | undefined>
  selectedElRef: Ref<HTMLElement | null>
  mergedPrefixCls: ComputedRef<string>
  handleTabClick: (key: VKey, evt: Event) => Promise<void>
}

export const tabsToken: InjectionKey<TabsContext> = Symbol('tabsToken')
