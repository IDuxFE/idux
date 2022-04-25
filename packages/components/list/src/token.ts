/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ListProps } from './types'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ListContext {
  props: ListProps
  mergedPrefixCls: ComputedRef<string>
}

export const listToken: InjectionKey<ListContext> = Symbol('list')
