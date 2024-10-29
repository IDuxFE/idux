/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateRangePickerContext } from '../token'
import type { DateRangePanelProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { useRangeTimePanelProps } from './useTimePanelProps'

export function useRangePickerPanelProps(context: DateRangePickerContext): ComputedRef<DateRangePanelProps> {
  const {
    props,
    hourEnabled,
    minuteEnabled,
    secondEnabled,
    use12Hours,
    rangeControlContext: { buffer, visiblePanel, handlePanelChange },
    overlayVisible,
  } = context

  const timePanelProps = useRangeTimePanelProps(props, hourEnabled, minuteEnabled, secondEnabled, use12Hours)

  const datePanelProps = computed(() => {
    return {
      value: buffer.value as Date[],
      cellTooltip: props.cellTooltip,
      disabledDate: props.disabledDate,
      type: props.type,
      timePanelOptions: timePanelProps.value,
      visible: overlayVisible.value && visiblePanel.value,
      onChange: handlePanelChange,
      onSelect: props.onSelect,
    }
  })

  return datePanelProps
}
