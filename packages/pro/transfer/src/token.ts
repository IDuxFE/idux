/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferTreeLoadChildren } from './composables/useTransferData'
import type { TreeDataStrategyContext } from './composables/useTreeDataStrategyContext'
import type { TreeExpandedKeysContext } from './composables/useTreeExpandedKeys'
import type { ProTransferProps, TransferContentInstance, TreeTransferData } from './types'
import type { GetKeyFn, TreeCascadeStrategy } from '@idux/components/utils'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface ProTransferContext {
  props: ProTransferProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  getKey: ComputedRef<GetKeyFn>
  sourceContentRef: Ref<TransferContentInstance | undefined>
  targetContentRef: Ref<TransferContentInstance | undefined>
}
export interface TreeTransferContext<V extends TreeTransferData<V, C> = TreeTransferData, C extends string = string> {
  cascaderStrategy: ComputedRef<TreeCascadeStrategy>
  childrenKey: ComputedRef<C>
  loadSourceChildren: TransferTreeLoadChildren
  loadTargetChildren: TransferTreeLoadChildren
  dataStrategyContext: TreeDataStrategyContext<V, C>
  expandedKeysContext: TreeExpandedKeysContext
}

export const proTransferContext: InjectionKey<ProTransferContext> = Symbol('proTransferContext')
export const treeTransferContext: InjectionKey<TreeTransferContext> = Symbol('treeTransferContext')
