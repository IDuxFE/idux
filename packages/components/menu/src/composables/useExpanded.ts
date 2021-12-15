/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { watch } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

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

  watch(
    () => props.collapsed,
    collapsed => {
      if (collapsed) {
        setExpandedKeys([])
      }
    },
  )

  return { expandedKeys, handleExpand }
}
