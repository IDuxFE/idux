/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeRangePickerProps } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, watch } from 'vue'

import { convertArray, useState } from '@idux/cdk/utils'

import { type PickerControlContext, usePickerControl } from './useControl'
import { convertToDate } from '../utils'

type RangeValueType = TimeRangePickerProps['value']

export type OnRangePickerValueChange = (value: [Date | undefined, Date | undefined]) => void

export interface PickerRangeControlContext {
  buffer: ComputedRef<(Date | undefined)[] | undefined>
  bufferUpdated: ComputedRef<boolean>

  fromControl: PickerControlContext
  toControl: PickerControlContext

  init: (force?: boolean) => void
}

export function useRangePickerControl(
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
  valueRef: Ref<RangeValueType>,
): PickerRangeControlContext {
  const [buffer, setBuffer] = useState<(Date | undefined)[] | undefined>(
    convertArray(valueRef.value).map(v => convertToDate(dateConfig, v, formatRef.value)),
  )
  const [bufferUpdated, setBufferUpdated] = useState(false)
  const handleBufferUpdate = (values: (string | number | Date | undefined)[] | undefined) => {
    setBuffer(getRangeValue(dateConfig, values, formatRef.value))
    setBufferUpdated(true)
  }
  watch([valueRef, formatRef], ([value]) => {
    handleBufferUpdate(value)
  })

  const rangeValueRef = computed(() => convertArray(buffer.value))
  const fromValue = computed(() => rangeValueRef.value[0])
  const toValue = computed(() => rangeValueRef.value[1])

  const fromControl = usePickerControl(
    dateConfig,
    formatRef,
    value => {
      handleBufferUpdate([value, toValue.value])
    },
    fromValue,
  )
  const toControl = usePickerControl(
    dateConfig,
    formatRef,
    value => {
      handleBufferUpdate([fromValue.value, value])
    },
    toValue,
  )

  const init = (force = false) => {
    handleBufferUpdate(valueRef.value)
    setBufferUpdated(false)
    fromControl.init(force)
    toControl.init(force)
  }

  return {
    buffer,
    bufferUpdated,

    fromControl,
    toControl,

    init,
  }
}

function getRangeValue(
  dateConfig: DateConfig,
  values: (string | number | Date | undefined)[] | undefined,
  format: string,
) {
  return convertArray(values).map(v => convertToDate(dateConfig, v, format))
}
