/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps } from '../types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface PanelStateContext {
  panelDate: ComputedRef<Date | undefined>
  setPanelDate: (value: Date) => void
}

export function usePanelState(
  props: DatePickerProps,
  dateConfig: DateConfig,
  accessor: ValueAccessor,
  formatRef: ComputedRef<string>,
): PanelStateContext {
  const initValue = accessor.valueRef.value ?? props.defaultOpenValue
  const initDate = initValue ? dateConfig.convert(accessor.valueRef.value, formatRef.value) : undefined
  const [panelDate, setPanelDate] = useState(initDate)

  watch(accessor.valueRef, value => {
    const { convert, isSame } = dateConfig
    const mergedValue = value ?? props.defaultOpenValue
    if (!mergedValue) {
      setPanelDate(undefined)
    }
    const currValue = convert(mergedValue, formatRef.value)
    if (!panelDate.value || !isSame(panelDate.value, currValue, props.type)) {
      setPanelDate(currValue)
    }
  })

  return {
    panelDate,
    setPanelDate,
  }
}
