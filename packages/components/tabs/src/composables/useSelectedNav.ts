/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type ShallowRef, nextTick, onMounted, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { VKey, useState } from '@idux/cdk/utils'

import { TabsProps } from '../types'

export interface SelectedNavContext {
  selectedNavSize: ComputedRef<number>
  selectedNavOffset: ComputedRef<number>
}

export function useSelectedNav(
  props: TabsProps,
  selectedNavRef: ShallowRef<HTMLElement | undefined>,
  isHorizontal: ComputedRef<boolean>,
  closedKeys: ComputedRef<VKey[]>,
): SelectedNavContext {
  const [selectedNavSize, setSelectedNavSize] = useState(0)
  const [selectedNavOffset, setSelectedNavOffset] = useState(0)

  useResizeObserver(selectedNavRef, entry => {
    nextTick(() => {
      const target = entry.target as HTMLElement
      setSelectedNavSize(target[isHorizontal.value ? 'offsetWidth' : 'offsetHeight'])
    })
  })

  const updateSelectedNavOffset = () => {
    nextTick(() => {
      const target = selectedNavRef.value
      if (target) {
        setSelectedNavOffset(target[isHorizontal.value ? 'offsetLeft' : 'offsetTop'])
      }
    })
  }

  onMounted(() => {
    watch([() => props.dataSource, closedKeys, selectedNavRef], updateSelectedNavOffset, { immediate: true })
  })

  return {
    selectedNavSize,
    selectedNavOffset,
  }
}
