/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExpandableContext } from './useExpandable'
import type { TreeNode, TreeNodeDisabled, TreeProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef } from 'vue'

import { computed, ref } from 'vue'

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
  parentKeyMap: ComputedRef<Map<VKey, VKey | undefined>>
  depthMap: ComputedRef<Map<VKey, number>>
  setLoadedNodes: (key: VKey, nodes: TreeNode[]) => void
} {
  const loadedNodes = ref<Record<VKey, TreeNode[]>>({})

  const setLoadedNodes = (key: VKey, nodes: TreeNode[]) => {
    loadedNodes.value[key] = nodes
  }
  const getLoadedNodes = (key: VKey): TreeNode[] | undefined => {
    return loadedNodes.value[key]
  }

  const context = computed(() => {
    const dataKeyMap = new Map<VKey, MergedNode>()
    const parentKeyMap = new Map<VKey, VKey>()
    const depthMap = new Map<VKey, number>()

    const mergedNodes = convertMergeNodes(
      props.dataSource,
      getLoadedNodes,
      {
        props,
        childrenKey: mergedChildrenKey.value,
        getKey: mergedGetKey.value,
        labelKey: mergedLabelKey.value,
        parentKey: undefined,
        parentLevel: -1,
        parentsDisabled: [],
      },
      {
        dataKeyMap,
        parentKeyMap,
        depthMap,
      },
    )

    return {
      mergedNodes,
      dataKeyMap,
      parentKeyMap,
      depthMap,
    }
  })

  const mergedNodes = computed(() => context.value.mergedNodes)
  const mergedNodeMap = computed(() => context.value.dataKeyMap)
  const parentKeyMap = computed(() => context.value.parentKeyMap)
  const depthMap = computed(() => context.value.depthMap)

  return { mergedNodes, mergedNodeMap, parentKeyMap, depthMap, setLoadedNodes }
}

export function useFlattedNodes(
  mergedNodes: ComputedRef<MergedNode[]>,
  { expandedKeys }: ExpandableContext,
  props: TreeProps,
  searchedKeys: ComputedRef<VKey[]>,
): { flattedNodes: ComputedRef<MergedNode[]>; flattenedNodeMap: ComputedRef<Map<VKey, MergedNode>> } {
  const flattenedContext = computed(() => {
    const { searchValue } = props
    const expandedKeysMap = new Map(expandedKeys.value.map((item, index) => [item, index]))
    const searchedKeysMap = new Map(searchedKeys.value.map((item, index) => [item, index]))

    const flattenedNodeMap = new Map<VKey, MergedNode>()

    if (searchValue && !searchedKeysMap.size) {
      return {
        flattedNodes: [],
        flattenedNodeMap,
      }
    }

    if (expandedKeysMap.size || searchedKeysMap.size) {
      const nodes = flatNode(mergedNodes.value, expandedKeysMap, searchedKeysMap, flattenedNodeMap)
      return {
        flattedNodes: nodes,
        flattenedNodeMap,
      }
    }

    return {
      flattedNodes: mergedNodes.value.map(item => {
        const node = { ...item, expanded: false, level: 0 }
        flattenedNodeMap.set(node.key, node)

        return node
      }),
      flattenedNodeMap,
    }
  })

  const flattedNodes = computed(() => flattenedContext.value.flattedNodes)
  const flattenedNodeMap = computed(() => flattenedContext.value.flattenedNodeMap)

  return {
    flattedNodes,
    flattenedNodeMap,
  }
}

export function convertMergeNodes(
  nodes: TreeNode[],
  getLoadedNodes: (key: VKey) => TreeNode[] | undefined,
  options: {
    props: TreeProps
    childrenKey: string
    getKey: GetKeyFn
    labelKey: string
    parentKey: VKey | undefined
    parentLevel: number
    parentsDisabled: TreeNodeDisabled[]
  },
  maps: {
    dataKeyMap: Map<VKey, MergedNode>
    parentKeyMap: Map<VKey, VKey | undefined>
    depthMap: Map<VKey, number>
  },
): MergedNode[] {
  const { props, childrenKey, getKey, labelKey, parentKey, parentLevel, parentsDisabled } = options
  const { cascaderStrategy, disabled, loadChildren } = props
  const { dataKeyMap, parentKeyMap, depthMap } = maps
  const hasLoad = !!loadChildren

  return nodes.map((node, index) => {
    const key = getKey(node)
    const nodeDisabled = convertDisabled(node, disabled)
    const subNodes = ((node as Record<string, unknown>)[childrenKey] ?? getLoadedNodes(key)) as TreeNode[] | undefined
    const label = node[labelKey] as string
    const level = parentLevel + 1

    const children =
      subNodes &&
      convertMergeNodes(
        subNodes,
        getLoadedNodes,
        {
          props,
          childrenKey,
          getKey,
          labelKey,
          parentKey: key,
          parentLevel: level,
          parentsDisabled: [nodeDisabled, ...(parentsDisabled ?? [])],
        },
        maps,
      )

    const mergedDisabled = mergeDisabled(
      nodeDisabled,
      parentsDisabled ?? [],
      children?.map(child => ({
        check: child.checkDisabled,
        drag: child.dragDisabled,
        drop: child.dropDisabled,
        select: child.selectDisabled,
      })) ?? [],
      cascaderStrategy !== 'off',
    )

    const mergedNode = {
      label,
      key,
      children,
      isFirst: index === 0,
      isLeaf: node.isLeaf ?? !(subNodes?.length || hasLoad),
      isLast: index === nodes.length - 1,
      parentKey,
      expanded: false,
      level,
      rawNode: node,
      checkDisabled: mergedDisabled.check,
      dragDisabled: mergedDisabled.drag,
      dropDisabled: mergedDisabled.drop,
      selectDisabled: mergedDisabled.select,
    }

    dataKeyMap.set(key, mergedNode)
    parentKeyMap.set(key, parentKey)
    depthMap.set(key, level)

    return mergedNode
  })
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
    select: _mergeDisabled('select'),
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
function flatNode(
  mergedNodes: MergedNode[],
  expandedKeysMap: Map<VKey, number>,
  searchedKeysMap: Map<VKey, number>,
  nodeMap: Map<VKey, MergedNode>,
) {
  const flattedNodes: MergedNode[] = []
  const stack: MergedNode[] = []

  hiddenIrrelevantNodes(mergedNodes, searchedKeysMap)

  mergedNodes.forEach(node => {
    stack.push({ ...node })

    while (stack.length) {
      const _node = stack.pop()
      if (_node) {
        const { children, key, hidden } = _node

        const expanded = expandedKeysMap.has(key)
        _node.expanded = expanded

        !hidden && flattedNodes.push(_node)
        nodeMap.set(_node.key, _node)

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
