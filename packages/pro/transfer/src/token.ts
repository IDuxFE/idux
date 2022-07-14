/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferTreeLoadChildren } from './composables/useTransferData'
import type { TreeExpandedKeysContext } from './composables/useTreeExpandedKeys'
import type { ProTransferProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ɵCheckableListInstance } from '@idux/components/_private/checkable-list'
import type { TableInstance } from '@idux/components/table'
import type { TreeInstance } from '@idux/components/tree'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface ProTransferContext {
  props: ProTransferProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  childrenKey: ComputedRef<string>
  loadSourceChildren?: TransferTreeLoadChildren
  loadTargetChildren?: TransferTreeLoadChildren
  expandedKeysContext?: TreeExpandedKeysContext
  parentKeyMap?: Map<VKey, VKey | undefined>
  sourceContentRef: Ref<ɵCheckableListInstance | TableInstance | TreeInstance | undefined>
  targetContentRef: Ref<ɵCheckableListInstance | TableInstance | TreeInstance | undefined>
}

export const proTransferContext: InjectionKey<ProTransferContext> = Symbol('proTransferContext')
