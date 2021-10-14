/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CheckableContext } from './composables/useCheckable'
import type { DragDropContext } from './composables/useDragDrop'
import type { ExpandableContext } from './composables/useExpandable'
import type { GetNodeKey } from './composables/useGetNodeKey'
import type { SelectableContext } from './composables/useSelectable'
import type { TreeProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { TreeConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface TreeContext extends CheckableContext, DragDropContext, ExpandableContext, SelectableContext {
  props: TreeProps
  slots: Slots
  config: TreeConfig
  prefixCls: ComputedRef<string>
  getNodeKey: ComputedRef<GetNodeKey>
  searchedKeys: ComputedRef<VKey[]>
}

export const treeToken: InjectionKey<TreeContext> = Symbol('treeToken')
