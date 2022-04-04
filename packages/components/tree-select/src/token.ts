/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MergedNode } from './composables/useDataSource'
import type { GetNodeKey } from './composables/useGetNodeKey'
import type { TreeSelectNode, TreeSelectProps } from './types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectConfig } from '@idux/components/config'
import type { TreeInstance } from '@idux/components/tree'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface TreeSelectContext {
  props: TreeSelectProps
  slots: Slots
  config: TreeSelectConfig
  mergedPrefixCls: ComputedRef<string>
  accessor: ValueAccessor
  getNodeKey: ComputedRef<GetNodeKey>
  expandedKeys: ComputedRef<any[]>
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
  inputValue: ComputedRef<string>
  setInputValue: (value: string) => void
  treeRef: Ref<TreeInstance | undefined>
  setExpandedKeys: (value: any[]) => void
  setExpandAll: (isAll: boolean) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  handleNodeClick: () => void
  selectedValue: ComputedRef<any[]>
  changeSelected: (value: any[], nodes: TreeSelectNode[]) => void
}

export const treeSelectToken: InjectionKey<TreeSelectContext> = Symbol('treeSelectToken')
