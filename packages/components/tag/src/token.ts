/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TagGroupProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey } from 'vue'

export interface TagContext {
  props: TagGroupProps
  mergedActiveKeys: ComputedRef<VKey[]>
  mergedClosedKeys: ComputedRef<VKey[]>
  handleTagClick: (key: VKey, evt: MouseEvent) => void
  handleTagClose: (key: VKey) => Promise<void>
}

export const tagToken: InjectionKey<TagContext> = Symbol('tag')
