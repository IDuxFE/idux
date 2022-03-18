/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, watch } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'

import { type MenuProps } from '../types'

export interface ExpandedContext {
  expandedKeys: ComputedRef<VKey[]>
  handleExpand: (key: VKey, expanded: boolean) => void
}

export function useExpanded(props: MenuProps): ExpandedContext {
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])

  const handleExpand = (key: VKey, expanded: boolean) => {
    const index = expandedKeys.value.indexOf(key)
    if (expanded) {
      index === -1 && setExpandedKeys([...expandedKeys.value, key])
    } else {
      if (index > -1) {
        const tempKeys = [...expandedKeys.value]
        tempKeys.splice(index, 1)
        setExpandedKeys(tempKeys)
      }
    }
  }

  let cachedExpandedKeys: VKey[] = []
  watch(
    () => props.collapsed,
    collapsed => {
      if (collapsed) {
        cachedExpandedKeys = [...expandedKeys.value]
        setExpandedKeys([])
      } else {
        setExpandedKeys(cachedExpandedKeys)
        cachedExpandedKeys = []
      }
    },
  )

  return { expandedKeys, handleExpand }
}
