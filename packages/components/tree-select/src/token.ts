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
import type { FormAccessor } from '@idux/cdk/forms'
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { TreeInstance } from '@idux/components/tree'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface TreeSelectContext {
  props: TreeSelectProps
  slots: Slots
  config: TreeSelectConfig
  locale: Locale
  mergedPrefixCls: ComputedRef<string>
  accessor: FormAccessor
  mergedChildrenKey: ComputedRef<string>
  mergedGetKey: ComputedRef<GetNodeKey>
  mergedLabelKey: ComputedRef<string>
  expandedKeys: ComputedRef<VKey[]>
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
  inputValue: ComputedRef<string>
  setInputValue: (value: string) => void
  treeRef: Ref<TreeInstance | undefined>
  setExpandedKeys: (keys: VKey[]) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  handleNodeClick: () => void
  selectedValue: ComputedRef<VKey[]>
  changeSelected: (value: VKey[], nodes: TreeSelectNode[]) => void
}

export const treeSelectToken: InjectionKey<TreeSelectContext> = Symbol('treeSelectToken')
