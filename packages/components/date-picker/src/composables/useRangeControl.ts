/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerType } from '../types'
import type { DateConfig, DateConfigType, TimeConfigType } from '@idux/components/config'

import { type ComputedRef, type Ref, computed, watch } from 'vue'

import { convertArray, useState } from '@idux/cdk/utils'
import { adjustRangeValue, compareDateTime, convertToDate, sortRangeValue } from '@idux/components/utils'

import { type PickerControlContext, useControl } from './useControl'
import { type FormatContext } from './useFormat'
import { type InputEnableStatus } from './useInputEnableStatus'
import { convertPickerTypeToConfigType } from '../utils'

export interface PickerRangeControlContext {
  buffer: ComputedRef<(Date | undefined)[] | undefined>
  bufferUpdated: ComputedRef<boolean>

  visiblePanel: ComputedRef<'datePanel' | 'timePanel'>
  setVisiblePanel: (value: 'datePanel' | 'timePanel') => void

  fromControl: PickerControlContext
  toControl: PickerControlContext

  init: (force?: boolean) => void
  handlePanelChange: (value: Date[] | undefined) => void
}

export function useRangeControl(
  dateConfig: DateConfig,
  formatContext: FormatContext,
  inputEnableStatus: ComputedRef<InputEnableStatus>,
  valueRef: Ref<(string | number | Date)[] | undefined>,
  typeRef: Ref<DatePickerType>,
): PickerRangeControlContext {
  const { formatRef, hourEnabled, secondEnabled, minuteEnabled } = formatContext
  const convertedValue = computed(() =>
    convertArray(valueRef.value).map(v => convertToDate(dateConfig, v, formatRef.value)),
  )
  const [buffer, setBuffer] = useState<(Date | undefined)[] | undefined>(convertedValue.value)
  const [bufferUpdated, setBufferUpdated] = useState(false)
  const handleBufferUpdate = (values: (string | number | Date | undefined)[] | undefined) => {
    setBuffer(sortRangeValue(dateConfig, getRangeValue(dateConfig, values, formatRef.value), 'date'))
    setBufferUpdated(true)
  }

  const [visiblePanel, setVisiblePanel] = useState<'datePanel' | 'timePanel'>('datePanel')

  const handleVisiblePanelUpdate = (value: 'datePanel' | 'timePanel') => {
    visiblePanel.value !== value && setVisiblePanel(value)
    fromControl.visiblePanel.value !== value && fromControl.setVisiblePanel(value)
    toControl.visiblePanel.value !== value && toControl.setVisiblePanel(value)
  }

  const rangeValueRef = computed(() => convertArray(buffer.value))
  const fromDateRef = computed(() => rangeValueRef.value[0])
  const toDateRef = computed(() => rangeValueRef.value[1])

  watch([valueRef, formatRef], ([value]) => {
    handleBufferUpdate(value)
  })

  const getValidBufferValue = (value: Date | undefined, isFrom: boolean) => {
    if (isFrom) {
      return compareDateTime(dateConfig, value, buffer.value?.[1], 'date') > 0
        ? [value, value]
        : [value, buffer.value?.[1]]
    }

    return compareDateTime(dateConfig, value, buffer.value?.[0], 'date') < 0
      ? [value, value]
      : [buffer.value?.[0], value]
  }

  const getAdjustedBufferValue = (value: Date | undefined, isFrom: boolean) => {
    const adjustType: DateConfigType | TimeConfigType = secondEnabled.value
      ? 'second'
      : minuteEnabled.value
        ? 'minute'
        : hourEnabled.value
          ? 'hour'
          : convertPickerTypeToConfigType(typeRef.value)

    return adjustRangeValue(dateConfig, getValidBufferValue(value, isFrom), convertedValue.value, adjustType)
  }

  const fromControl = useControl(dateConfig, formatContext, inputEnableStatus, fromDateRef, value => {
    setBuffer(getAdjustedBufferValue(value, true))
    setBufferUpdated(true)
  })
  const toControl = useControl(dateConfig, formatContext, inputEnableStatus, toDateRef, value => {
    setBuffer(getAdjustedBufferValue(value, false))
    setBufferUpdated(true)
  })

  watch(fromControl.visiblePanel, handleVisiblePanelUpdate)
  watch(toControl.visiblePanel, handleVisiblePanelUpdate)

  const init = (force = false) => {
    handleBufferUpdate(valueRef.value)
    setBufferUpdated(false)
    fromControl.init(force)
    toControl.init(force)
  }

  return {
    buffer,
    bufferUpdated,

    visiblePanel,
    setVisiblePanel: handleVisiblePanelUpdate,

    fromControl,
    toControl,

    init,
    handlePanelChange: handleBufferUpdate,
  }
}

function getRangeValue(
  dateConfig: DateConfig,
  values: (string | number | Date | undefined)[] | undefined,
  format: string,
) {
  return convertArray(values).map(v => convertToDate(dateConfig, v, format))
}
