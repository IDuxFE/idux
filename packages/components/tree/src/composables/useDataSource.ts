/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExpandableContext } from './useExpandable'
import type { TreeNode, TreeNodeDisabled, TreeProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { CascaderStrategy } from '@idux/components/cascader'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isNil } from 'lodash-es'

export interface MergedNode {
  children?: MergedNode[]
  label: string
  isFirst: boolean
  isLeaf: boolean
  isLast: boolean
  key: VKey
  expanded: boolean
  hidden?: boolean
  level: number
  parentKey?: VKey
  rawNode: TreeNode
  checkDisabled?: boolean
  dragDisabled?: boolean
  dropDisabled?: boolean
  selectDisabled?: boolean
}

export function useMergeNodes(
  props: TreeProps,
  mergedChildrenKey: ComputedRef<string>,
  mergedGetKey: ComputedRef<GetKeyFn>,
  mergedLabelKey: ComputedRef<string>,
): {
  mergedNodes: ComputedRef<MergedNode[]>
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
} {
  const mergedNodes = computed(() =>
    convertMergeNodes(props, props.dataSource, mergedChildrenKey.value, mergedGetKey.value, mergedLabelKey.value),
  )

  const mergedNodeMap = computed(() => {
    const map = new Map<VKey, MergedNode>()
    convertMergedNodeMap(mergedNodes.value, map)
    return map
  })

  return { mergedNodes, mergedNodeMap }
}

export function useFlattedNodes(
  mergedNodes: ComputedRef<MergedNode[]>,
  { expandedKeys }: ExpandableContext,
  props: TreeProps,
  searchedKeys: ComputedRef<VKey[]>,
): ComputedRef<MergedNode[]> {
  return computed(() => {
    const { searchValue } = props
    const expandedKeysMap = new Map(expandedKeys.value.map((item, index) => [item, index]))
    const searchedKeysMap = new Map(searchedKeys.value.map((item, index) => [item, index]))

    if (searchValue && !searchedKeysMap.size) {
      return []
    }

    if (expandedKeysMap.size || searchedKeysMap.size) {
      const nodes = flatNode(mergedNodes.value, expandedKeysMap, searchedKeysMap)
      return nodes
    }

    return mergedNodes.value.map(item => ({ ...item, expanded: false, level: 0 }))
  })
}

export function convertMergeNodes(
  props: TreeProps,
  nodes: TreeNode[],
  childrenKey: string,
  getKey: GetKeyFn,
  labelKey: string,
  parentKey?: VKey,
  parentLevel?: number,
  parentDisabled?: TreeNodeDisabled,
): MergedNode[] {
  const { cascaderStrategy, disabled, loadChildren } = props
  const level = isNil(parentLevel) ? -1 : parentLevel

  return nodes.map((node, index) =>
    convertMergeNode(
      node,
      childrenKey,
      getKey,
      labelKey,
      disabled,
      !!loadChildren,
      index === 0,
      index === nodes.length - 1,
      level,
      cascaderStrategy,
      parentDisabled ? [parentDisabled] : [],
      parentKey,
    ),
  )
}

function convertMergeNode(
  rawNode: TreeNode,
  childrenKey: string,
  getKey: GetKeyFn,
  labelKey: string,
  disabled: ((node: TreeNode) => boolean | TreeNodeDisabled) | undefined,
  hasLoad: boolean,
  isFirst: boolean,
  isLast: boolean,
  level: number,
  cascaderStrategy: CascaderStrategy,
  parentsDisabled: TreeNodeDisabled[],
  parentKey?: VKey,
): MergedNode {
  const key = getKey(rawNode)
  const nodeDisabled = convertDisabled(rawNode, disabled)
  const subNodes = (rawNode as Record<string, unknown>)[childrenKey] as TreeNode[] | undefined
  const label = rawNode[labelKey] as string

  level++

  const children = subNodes?.map((subNode, index) =>
    convertMergeNode(
      subNode,
      childrenKey,
      getKey,
      labelKey,
      disabled,
      hasLoad,
      index === 0,
      index === subNodes.length - 1,
      level,
      cascaderStrategy,
      [nodeDisabled, ...parentsDisabled],
      key,
    ),
  )

  const mergedDisabled = mergeDisabled(
    nodeDisabled,
    parentsDisabled,
    children?.map(child => ({
      check: child.checkDisabled,
      drag: child.dragDisabled,
      drop: child.dropDisabled,
      select: child.selectDisabled,
    })) ?? [],
    cascaderStrategy !== 'off',
  )

  return {
    label,
    key,
    children,
    isFirst,
    isLeaf: rawNode.isLeaf ?? !(subNodes?.length || hasLoad),
    isLast,
    parentKey,
    expanded: false,
    level,
    rawNode,
    checkDisabled: mergedDisabled.check,
    dragDisabled: mergedDisabled.drag,
    dropDisabled: mergedDisabled.drop,
    selectDisabled: mergedDisabled.select,
  }
}

function convertDisabled(node: TreeNode, disabled?: (node: TreeNode) => boolean | TreeNodeDisabled) {
  const nodeDisabled = node.disabled || {}
  if (nodeDisabled === true) {
    return { check: true, drag: true, drop: true, select: true }
  }
  let { check, drag, drop, select } = nodeDisabled
  if (disabled) {
    const treeDisabled = disabled(node) || {}
    if (treeDisabled === true) {
      return { check: true, drag: true, drop: true, select: true }
    }
    check = check || treeDisabled.check
    drag = drag || treeDisabled.drag
    drop = drop || treeDisabled.drop
    select = select || treeDisabled.select
  }
  return { check, drag, drop, select }
}
function mergeDisabled(
  nodeDisabled: TreeNodeDisabled,
  parentsDisabled: TreeNodeDisabled[],
  childrenDisabled: TreeNodeDisabled[],
  cascade: boolean,
): TreeNodeDisabled {
  const _mergeDisabled = (name: keyof TreeNodeDisabled) => {
    return (
      nodeDisabled[name] ||
      (cascade &&
        (parentsDisabled.some(disabled => !!disabled[name]) ||
          (!!childrenDisabled.length && childrenDisabled.every(disabled => !!disabled[name]))))
    )
  }

  return {
    check: _mergeDisabled('check'),
    drag: _mergeDisabled('drag'),
    drop: _mergeDisabled('drop'),
    select: _mergeDisabled('drag'),
  }
}

export function convertMergedNodeMap(mergedNodes: MergedNode[], map: Map<VKey, MergedNode>): void {
  mergedNodes.forEach(item => {
    const { key, children } = item
    map.set(key, item)
    if (children) {
      convertMergedNodeMap(children, map)
    }
  })
}

function hiddenIrrelevantNodes(mergedNodes: MergedNode[] = [], searchedKeysMap: Map<VKey, number>) {
  const result: MergedNode[] = []
  const mergedNodesLength = mergedNodes.length
  mergedNodes.forEach((node, index) => {
    // isFirst 和 isLast控制连接线，每次需要先复原，最后通过result里面的数据再重新设置
    node.isFirst = index === 0
    node.isLast = index === mergedNodesLength - 1
    if (searchedKeysMap.has(node.key) || searchedKeysMap.size == 0) {
      node.hidden = false
      result.push(node)
    } else {
      node.hidden = true
    }

    const obj = hiddenIrrelevantNodes(node.children, searchedKeysMap)
    if (obj.length > 0) {
      node.hidden = false
      result.push(node)
    }
  })

  if (result.length) {
    result[0].isFirst = true
    result[result.length - 1].isLast = true
  }

  return result
}

// TODO: performance optimization
// when virtual scrolling is enabled, this do not need to traverse all nodes
function flatNode(mergedNodes: MergedNode[], expandedKeysMap: Map<VKey, number>, searchedKeysMap: Map<VKey, number>) {
  const flattedNodes: MergedNode[] = []
  const stack: MergedNode[] = []

  hiddenIrrelevantNodes(mergedNodes, searchedKeysMap)

  mergedNodes.forEach(node => {
    stack.push(node)

    while (stack.length) {
      const _node = stack.pop()
      if (_node) {
        const { children, key, hidden } = _node

        const expanded = expandedKeysMap.has(key)
        _node.expanded = expanded

        !hidden && flattedNodes.push(_node)

        if (children && expanded) {
          for (let i = children.length; i > 0; i--) {
            !children[i - 1].hidden && stack.push(children[i - 1])
          }
        }
      }
    }
  })
  return flattedNodes
}
