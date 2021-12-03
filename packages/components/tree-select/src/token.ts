/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AccessorContext } from './composables/useAccessor'
import type { MergedNode } from './composables/useDataSource'
import type { GetNodeKey } from './composables/useGetNodeKey'
import type { InputStateContext } from './composables/useInputState'
import type { SelectedStateContext } from './composables/useSelectedState'
import type { TreeSelectProps } from './types'
import type { FocusMonitor } from '@idux/cdk/a11y'
import type { VirtualScrollInstance } from '@idux/cdk/scroll'
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectConfig } from '@idux/components/config'
import type { TreeInstance } from '@idux/components/tree'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface TreeSelectContext extends AccessorContext, InputStateContext, SelectedStateContext {
  props: TreeSelectProps
  slots: Slots
  config: TreeSelectConfig
  getNodeKey: ComputedRef<GetNodeKey>
  expandedKeys: ComputedRef<any[]>
  mergedPrefixCls: ComputedRef<string>
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
  focusMonitor: FocusMonitor
  inputRef: Ref<HTMLInputElement | undefined>
  virtualScrollRef?: Ref<VirtualScrollInstance | undefined>
  triggerRef: Ref<HTMLDivElement | undefined>
  treeRef: Ref<TreeInstance | undefined>
  overlayOpened: ComputedRef<boolean>
  searchValue: Ref<string>
  setExpandedKeys: (value: any[]) => void
  setExpandAll: (isAll: boolean) => void
  setOverlayOpened: (open: boolean) => void
  handleNodeClick: () => void
}

export const treeSelectToken: InjectionKey<TreeSelectContext> = Symbol('treeSelectToken')
