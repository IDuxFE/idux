/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export interface MaxIndexContext {
  maxRowIndex: ComputedRef<number>
  maxCellIndex: ComputedRef<number>
}

export function useMaxIndex(activeType: ComputedRef<DatePanelType>): MaxIndexContext {
  const maxRowIndex = computed(() => {
    const currType = activeType.value
    switch (currType) {
      case 'date':
      case 'week':
        return 6
      case 'month':
        return 4
      case 'quarter':
        return 1
      case 'year':
        return 4
      default:
        return 0
    }
  })

  const maxCellIndex = computed(() => {
    const currType = activeType.value
    switch (currType) {
      case 'date':
      case 'week':
        return 7
      case 'month':
        return 3
      case 'quarter':
        return 4
      case 'year':
        return 3
      default:
        return 0
    }
  })

  return {
    maxRowIndex,
    maxCellIndex,
  }
}
