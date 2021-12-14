/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeNodeDisabled, TreeProps } from '../types'
import type { ExpandableContext } from './useExpandable'
import type { GetNodeKey } from './useGetNodeKey'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isBoolean } from 'lodash-es'

export interface MergedNode {
  children?: MergedNode[]
  label: string
  isFirst: boolean
  isLeaf: boolean
  isLast: boolean
  key: VKey
  parentKey?: VKey
  rawNode: TreeNode
  checkDisabled?: boolean
  dragDisabled?: boolean
  dropDisabled?: boolean
  selectDisabled?: boolean
}

export interface FlattedNode extends MergedNode {
  expanded: boolean
  level: number
}

export function useMergeNodes(
  props: TreeProps,
  getNodeKey: ComputedRef<GetNodeKey>,
): {
  mergedNodes: ComputedRef<MergedNode[]>
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
} {
  const mergedNodes = computed(() => covertMergeNodes(props, getNodeKey, props.dataSource))

  const mergedNodeMap = computed(() => {
    const map = new Map<VKey, MergedNode>()
    covertMergedNodeMap(mergedNodes.value, map)
    return map
  })

  return { mergedNodes, mergedNodeMap }
}

export function useFlattedNodes(
  mergedNodes: ComputedRef<MergedNode[]>,
  { expandedKeys }: ExpandableContext,
): ComputedRef<FlattedNode[]> {
  return computed(() => {
    const _expandedKeys = expandedKeys.value

    if (_expandedKeys.length > 0) {
      const nodes: FlattedNode[] = []
      mergedNodes.value.forEach(item => nodes.push(...flatNode(item, 0, _expandedKeys)))
      return nodes
    }
    return mergedNodes.value.map(item => ({ ...item, expanded: false, level: 0 }))
  })
}

export function covertMergeNodes(
  props: TreeProps,
  getNodeKey: ComputedRef<GetNodeKey>,
  nodes: TreeNode[],
): MergedNode[] {
  const getKey = getNodeKey.value

  const { childrenKey, labelKey, disabled, loadChildren } = props

  return nodes.map((node, index) =>
    covertMergeNode(
      node,
      getKey,
      disabled,
      childrenKey,
      labelKey,
      !!loadChildren,
      index === 0,
      index === nodes.length - 1,
    ),
  )
}

function covertMergeNode(
  rawNode: TreeNode,
  getKey: GetNodeKey,
  disabled: ((node: TreeNode) => boolean | TreeNodeDisabled) | undefined,
  childrenKey: string,
  labelKey: string,
  hasLoad: boolean,
  isFirst: boolean,
  isLast: boolean,
  parentKey?: VKey,
): MergedNode {
  const key = getKey(rawNode)
  const { check, drag, drop, select } = covertDisabled(rawNode, disabled)
  const subNodes = (rawNode as Record<string, unknown>)[childrenKey] as TreeNode[] | undefined
  const label = rawNode[labelKey] as string
  const children = subNodes?.map((subNode, index) =>
    covertMergeNode(
      subNode,
      getKey,
      disabled,
      childrenKey,
      labelKey,
      hasLoad,
      index === 0,
      index === subNodes.length - 1,
      key,
    ),
  )
  return {
    children,
    label,
    key,
    isFirst,
    isLeaf: rawNode.isLeaf ?? !(children?.length || hasLoad),
    isLast,
    parentKey,
    rawNode,
    checkDisabled: check,
    dragDisabled: drag,
    dropDisabled: drop,
    selectDisabled: select,
  }
}

function covertDisabled(node: TreeNode, disabled?: (node: TreeNode) => boolean | TreeNodeDisabled) {
  const nodeDisabled = node.disabled
  if (isBoolean(nodeDisabled)) {
    return { check: nodeDisabled, drag: nodeDisabled, drop: nodeDisabled, select: nodeDisabled }
  } else {
    let { check, drag, drop, select } = nodeDisabled ?? {}
    if (disabled) {
      const treeDisabled = disabled(node)
      if (isBoolean(treeDisabled)) {
        check ??= treeDisabled
        drag ??= treeDisabled
        drop ??= treeDisabled
        select ??= treeDisabled
      } else {
        check ??= treeDisabled.check
        drag ??= treeDisabled.drag
        drop ??= treeDisabled.drop
        select ??= treeDisabled.select
      }
    }
    return { check, drag, drop, select }
  }
}

export function covertMergedNodeMap(mergedNodes: MergedNode[], map: Map<VKey, MergedNode>): void {
  mergedNodes.forEach(item => {
    const { key, children } = item
    map.set(key, item)
    if (children) {
      covertMergedNodeMap(children, map)
    }
  })
}

// TODO: performance optimization
// when virtual scrolling is enabled, this do not need to traverse all nodes
function flatNode(node: MergedNode, level: number, expandedRowKeys: VKey[]) {
  const { children, key, ...reset } = node
  const expanded = expandedRowKeys.includes(key)
  const result: FlattedNode[] = [{ ...reset, children, key, level, expanded }]

  if (expanded && children) {
    children.forEach(subNode => result.push(...flatNode(subNode, level + 1, expandedRowKeys)))
  }

  return result
}
