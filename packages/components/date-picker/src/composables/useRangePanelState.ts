/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateRangePanelProps } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, watch } from 'vue'

import { callEmit, convertArray, useState } from '@idux/cdk/utils'

import { sortRangeValue } from '../utils'

export interface RangePanelStateContext {
  panelValue: ComputedRef<(Date | undefined)[] | undefined>
  isSelecting: ComputedRef<boolean>
  handleChange: (value: (Date | undefined)[]) => void
  handleDatePanelCellClick: (value: Date) => void
  handleDatePanelCellMouseenter: (value: Date) => void
}

export function useRangePanelState(props: DateRangePanelProps, dateConfig: DateConfig): RangePanelStateContext {
  const [selectingDate, setSelectingDate] = useState<(Date | undefined)[] | undefined>(props.value)
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  watch(
    () => props.visible,
    () => {
      setIsSelecting(false)
    },
  )

  const panelValue = computed(() => {
    if (isSelecting.value) {
      return sortRangeValue(dateConfig, [...convertArray(selectingDate.value)], 'date')
    }

    return convertArray(props.value)
  })

  const handleChange = (value: (Date | undefined)[]) => {
    callEmit(props.onChange, sortRangeValue(dateConfig, value, 'date') as Date[])
  }

  const handleDatePanelCellClick = (value: Date) => {
    if (!isSelecting.value) {
      setIsSelecting(true)
      setSelectingDate([value, undefined])
    } else {
      setIsSelecting(false)
      handleChange([selectingDate.value?.[0], value])
    }
  }

  const handleDatePanelCellMouseenter = (value: Date) => {
    if (!isSelecting.value) {
      return
    }

    setSelectingDate([selectingDate.value?.[0], value])
  }

  return {
    panelValue,
    isSelecting,
    handleChange,
    handleDatePanelCellClick,
    handleDatePanelCellMouseenter,
  }
}
