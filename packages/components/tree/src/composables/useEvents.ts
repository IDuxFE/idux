/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { ExpandableContext } from './useExpandable'
import type { SelectableContext } from './useSelectable'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export interface EventsContext {
  focused: Ref<boolean>
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
  handleKeydown: (evt: KeyboardEvent) => void
  handleKeyup: (evt: KeyboardEvent) => void
}

export function useEvents(
  props: TreeProps,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
  flattedNodes: ComputedRef<MergedNode[]>,
  { expandedKeys, handleExpand }: ExpandableContext,
  { activeKey, handleSelect }: SelectableContext,
): EventsContext {
  const focused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    focused.value = true
    callEmit(props.onFocus, evt)
  }

  const handleBlur = (evt: FocusEvent) => {
    focused.value = true
    callEmit(props.onBlur, evt)
  }

  const handleKeydown = (evt: KeyboardEvent) => {
    switch (evt.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        evt.preventDefault()
    }
    callEmit(props.onKeydown, evt)
  }

  const handleKeyup = (evt: KeyboardEvent) => {
    const eventCode = evt.code
    const _activeKey = activeKey.value
    const _flattedNodes = flattedNodes.value
    const nodeSize = _flattedNodes.length
    if (_activeKey === undefined) {
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(eventCode)) {
        changeActiveKey(activeKey, _flattedNodes, 0, nodeSize)
      }
    } else {
      const _flattedNodes = flattedNodes.value
      const currIndex = _flattedNodes.findIndex(node => node.key === _activeKey)
      if (currIndex === -1) {
        return
      }
      switch (eventCode) {
        case 'Enter':
        case 'NumpadEnter':
          handleSelect(_activeKey)
          break
        case 'ArrowDown':
          changeActiveKey(activeKey, _flattedNodes, currIndex + 1, nodeSize)
          break
        case 'ArrowUp':
          changeActiveKey(activeKey, _flattedNodes, currIndex - 1, 0, true)
          break
        case 'ArrowLeft':
          {
            const { rawNode, key, parentKey } = _flattedNodes[currIndex]
            if (rawNode.isLeaf || !expandedKeys.value.includes(key)) {
              const parentNode = parentKey ? mergedNodeMap.value.get(parentKey) : undefined
              if (parentNode) {
                activeKey.value = parentNode.key
              }
            } else {
              handleExpand(key, rawNode)
            }
          }
          break
        case 'ArrowRight':
          {
            const { rawNode, key } = _flattedNodes[currIndex]
            if (!expandedKeys.value.includes(key)) {
              handleExpand(key, rawNode)
            } else {
              for (let index = currIndex + 1; index < nodeSize; index++) {
                const currNode = _flattedNodes[index]
                activeKey.value = currNode.key
                break
              }
            }
          }
          break
      }
    }

    callEmit(props.onKeyup, evt)
  }

  return {
    focused,
    handleFocus,
    handleBlur,
    handleKeydown,
    handleKeyup,
  }
}

function changeActiveKey(
  activeKey: Ref<VKey | undefined>,
  flattedNodes: MergedNode[],
  start: number,
  end: number,
  isUp = false,
) {
  let index = start
  while (isUp ? index >= end : index < end) {
    const currNode = flattedNodes[index]
    if (!currNode.selectDisabled) {
      activeKey.value = currNode.key
      return
    } else {
      isUp ? index-- : index++
    }
  }
}
