/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeSelectNode, TreeSelectNodeDisabled, TreeSelectProps } from '../types'
import type { GetNodeKey } from './useGetNodeKey'
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isBoolean } from 'lodash-es'

export interface MergedNode {
  children?: MergedNode[]
  label: string
  isLeaf: boolean
  key: VKey
  parentKey?: VKey
  rawNode: TreeSelectNode
  checkDisabled?: boolean
  dragDisabled?: boolean
  dropDisabled?: boolean
  selectDisabled?: boolean
}

export function useMergeNodes(
  props: TreeSelectProps,
  getNodeKey: ComputedRef<GetNodeKey>,
  config: TreeSelectConfig,
): {
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
} {
  const mergedNodeMap = computed(() => {
    const map = new Map<VKey, MergedNode>()
    const nodes = covertMergeNodes(props, getNodeKey, props.dataSource, config)
    covertMergedNodeMap(nodes, map)
    return map
  })

  return { mergedNodeMap }
}

export function covertMergeNodes(
  props: TreeSelectProps,
  getNodeKey: ComputedRef<GetNodeKey>,
  nodes: TreeSelectNode[],
  config: TreeSelectConfig,
  parentKey?: VKey,
): MergedNode[] {
  const getKey = getNodeKey.value

  const { childrenKey = config.childrenKey, labelKey = config.labelKey, treeDisabled, loadChildren } = props

  return nodes.map(option =>
    covertMergeNode(option, getKey, treeDisabled, childrenKey, labelKey, !!loadChildren, parentKey),
  )
}

function covertMergeNode(
  rawNode: TreeSelectNode,
  getKey: GetNodeKey,
  disabled: ((node: TreeSelectNode) => boolean | TreeSelectNodeDisabled) | undefined,
  childrenKey: string,
  labelKey: string,
  hasLoad: boolean,
  parentKey?: VKey,
): MergedNode {
  const key = getKey(rawNode)
  const { check, drag, drop, select } = covertDisabled(rawNode, disabled)
  const subNodes = (rawNode as Record<string, unknown>)[childrenKey] as TreeSelectNode[] | undefined
  const label = rawNode[labelKey] as string
  const children = subNodes?.map(subNode =>
    covertMergeNode(subNode, getKey, disabled, childrenKey, labelKey, hasLoad, key),
  )
  return {
    children,
    label,
    key,
    isLeaf: rawNode.isLeaf ?? !(children?.length || hasLoad),
    parentKey,
    rawNode,
    checkDisabled: check,
    dragDisabled: drag,
    dropDisabled: drop,
    selectDisabled: select,
  }
}

function covertDisabled(
  option: TreeSelectNode,
  disabled?: (option: TreeSelectNode) => boolean | TreeSelectNodeDisabled,
) {
  const optionDisabled = option.disabled
  if (isBoolean(optionDisabled)) {
    return { check: optionDisabled, drag: optionDisabled, drop: optionDisabled, select: optionDisabled }
  } else {
    // In treeSelect , check and select are combined into one option
    let { drag, drop, select } = optionDisabled ?? {}
    let check
    if (disabled) {
      const treeDisabled = disabled(option)
      if (isBoolean(treeDisabled)) {
        check ??= treeDisabled
        drag ??= treeDisabled
        drop ??= treeDisabled
        select ??= treeDisabled
      } else {
        drag ??= treeDisabled.drag
        drop ??= treeDisabled.drop
        select ??= treeDisabled.select
        check ??= treeDisabled.select
      }
    }
    return { check, drag, drop, select }
  }
}

export function covertMergedNodeMap(MergedNodes: MergedNode[], map: Map<VKey, MergedNode>): void {
  MergedNodes.forEach(item => {
    const { key, children } = item
    map.set(key, item)
    if (children) {
      covertMergedNodeMap(children, map)
    }
  })
}
