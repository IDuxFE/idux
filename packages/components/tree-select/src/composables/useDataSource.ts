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
  rawData: TreeSelectNode
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
    const nodes = convertMergeNodes(props, getNodeKey, props.dataSource, config)
    convertMergedNodeMap(nodes, map)
    return map
  })

  return { mergedNodeMap }
}

export function convertMergeNodes(
  props: TreeSelectProps,
  getNodeKey: ComputedRef<GetNodeKey>,
  nodes: TreeSelectNode[],
  config: TreeSelectConfig,
  parentKey?: VKey,
): MergedNode[] {
  const getKey = getNodeKey.value

  const { childrenKey = config.childrenKey, labelKey = config.labelKey, treeDisabled, loadChildren } = props

  return nodes.map(option =>
    convertMergeNode(option, getKey, treeDisabled, childrenKey, labelKey, !!loadChildren, parentKey),
  )
}

function convertMergeNode(
  rawData: TreeSelectNode,
  getKey: GetNodeKey,
  disabled: ((node: TreeSelectNode) => boolean | TreeSelectNodeDisabled) | undefined,
  childrenKey: string,
  labelKey: string,
  hasLoad: boolean,
  parentKey?: VKey,
): MergedNode {
  const key = getKey(rawData)
  const { check, drag, drop, select } = convertDisabled(rawData, disabled)
  const subNodes = (rawData as Record<string, unknown>)[childrenKey] as TreeSelectNode[] | undefined
  const label = rawData[labelKey] as string
  const children = subNodes?.map(subNode =>
    convertMergeNode(subNode, getKey, disabled, childrenKey, labelKey, hasLoad, key),
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
