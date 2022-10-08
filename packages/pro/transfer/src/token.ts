/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferTreeLoadChildren } from './composables/useTransferData'
import type { TreeExpandedKeysContext } from './composables/useTreeExpandedKeys'
import type { ProTransferProps, TransferContentInstance } from './types'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface ProTransferContext {
  props: ProTransferProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  getKey: ComputedRef<GetKeyFn>
  sourceContentRef: Ref<TransferContentInstance | undefined>
  targetContentRef: Ref<TransferContentInstance | undefined>
}
export interface TreeTransferContext {
  cascaderStrategy: ComputedRef<CascaderStrategy>
  childrenKey: ComputedRef<string>
  loadSourceChildren: TransferTreeLoadChildren
  loadTargetChildren: TransferTreeLoadChildren
  expandedKeysContext: TreeExpandedKeysContext
}

export const proTransferContext: InjectionKey<ProTransferContext> = Symbol('proTransferContext')
export const treeTransferContext: InjectionKey<TreeTransferContext> = Symbol('treeTransferContext')
