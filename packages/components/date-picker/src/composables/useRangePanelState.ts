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
import { adjustRangeValue, sortRangeValue } from '@idux/components/utils'

import { convertPickerTypeToConfigType } from '../utils'

export interface RangePanelStateContext {
  panelValue: ComputedRef<(Date | undefined)[] | undefined>
  isSelecting: ComputedRef<boolean>
  handleChange: (value: Date[] | undefined) => void
  handleDatePanelCellClick: (value: Date) => void
  handleDatePanelCellMouseenter: (value: Date) => void
}

export function useRangePanelState(props: DateRangePanelProps, dateConfig: DateConfig): RangePanelStateContext {
  const [selectingDates, setSelectingDates] = useState<(Date | undefined)[] | undefined>(props.value)
  const [isSelecting, setIsSelecting] = useState<boolean>(false)

  watch(
    () => props.visible,
    visible => {
      setIsSelecting(false)

      if (!visible) {
        callEmit(props.onSelect, props.value)
      }
    },
  )

  const panelValue = computed(() => {
    if (isSelecting.value) {
      return sortRangeValue(dateConfig, [...convertArray(selectingDates.value)], 'date')
    }

    return convertArray(props.value)
  })

  const handleChange = (value: Date[] | undefined) => {
    callEmit(props.onChange, value)
    callEmit(props.onSelect, value)
  }

  const handleDatePanelCellClick = (value: Date) => {
    if (!isSelecting.value) {
      setIsSelecting(true)
      setSelectingDates([value, undefined])
      callEmit(props.onSelect, [value, undefined])
    } else {
      const propsValue = convertArray(props.value)
      const sortedValue = sortRangeValue(dateConfig, [selectingDates.value![0], value], 'date') as Date[]
      handleChange(
        adjustRangeValue(dateConfig, sortedValue, propsValue, convertPickerTypeToConfigType(props.type)) as Date[],
      )
      setIsSelecting(false)
    }
  }

  const handleDatePanelCellMouseenter = (value: Date) => {
    if (!isSelecting.value) {
      return
    }

    setSelectingDates([selectingDates.value?.[0], value])
  }

  return {
    panelValue,
    isSelecting,
    handleChange,
    handleDatePanelCellClick,
    handleDatePanelCellMouseenter,
  }
}
