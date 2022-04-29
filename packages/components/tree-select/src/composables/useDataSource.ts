/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isBoolean } from 'lodash-es'

import { type VKey } from '@idux/cdk/utils'

import { type TreeSelectNode, type TreeSelectNodeDisabled, type TreeSelectProps } from '../types'
import { type GetNodeKey } from './useGetNodeKey'

export interface MergedNode {
  children?: MergedNode[]
  label: string
  isLeaf: boolean
  key: VKey
  parentKey?: VKey
  rawData: TreeSelectNode
  checkDisabled?: boolean
  dragDisabled?: boolean
  dropDisabled?: boolean
  selectDisabled?: boolean
}

export function useMergeNodes(
  props: TreeSelectProps,
  mergedChildrenKey: ComputedRef<string>,
  mergedGetKey: ComputedRef<GetNodeKey>,
  mergedLabelKey: ComputedRef<string>,
): {
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>
} {
  const mergedNodeMap = computed(() => {
    const map = new Map<VKey, MergedNode>()
    const nodes = convertMergeNodes(
      props,
      props.dataSource,
      mergedChildrenKey.value,
      mergedGetKey.value,
      mergedLabelKey.value,
    )
    convertMergedNodeMap(nodes, map)
    return map
  })

  return { mergedNodeMap }
}

export function convertMergeNodes(
  props: TreeSelectProps,
  nodes: TreeSelectNode[],
  childrenKey: string,
  getKey: GetNodeKey,
  labelKey: string,
  parentKey?: VKey,
): MergedNode[] {
  const { treeDisabled, loadChildren } = props
  return nodes.map(option =>
    convertMergeNode(option, childrenKey, getKey, labelKey, treeDisabled, !!loadChildren, parentKey),
  )
}

function convertMergeNode(
  rawData: TreeSelectNode,
  childrenKey: string,
  getKey: GetNodeKey,
  labelKey: string,
  disabled: ((node: TreeSelectNode) => boolean | TreeSelectNodeDisabled) | undefined,
  hasLoad: boolean,
  parentKey?: VKey,
): MergedNode {
  const key = getKey(rawData)
  const { check, drag, drop, select } = convertDisabled(rawData, disabled)
  const subNodes = (rawData as Record<string, unknown>)[childrenKey] as TreeSelectNode[] | undefined
  const label = rawData[labelKey] as string
  const children = subNodes?.map(subNode =>
    convertMergeNode(subNode, childrenKey, getKey, labelKey, disabled, hasLoad, key),
  )
  return {
    children,
    label,
    key,
    isLeaf: rawData.isLeaf ?? !(children?.length || hasLoad),
    parentKey,
    rawData,
    checkDisabled: check,
    dragDisabled: drag,
    dropDisabled: drop,
    selectDisabled: select,
  }
}

function convertDisabled(
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

export function convertMergedNodeMap(MergedNodes: MergedNode[], map: Map<VKey, MergedNode>): void {
  MergedNodes.forEach(item => {
    const { key, children } = item
    map.set(key, item)
    if (children) {
      convertMergedNodeMap(children, map)
    }
  })
}
