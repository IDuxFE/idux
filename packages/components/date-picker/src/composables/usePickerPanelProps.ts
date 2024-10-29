/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerContext } from '../token'
import type { DatePanelProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { useTimePanelProps } from './useTimePanelProps'

export function usePickerPanelProps(context: DatePickerContext): ComputedRef<DatePanelProps> {
  const {
    props,
    hourEnabled,
    minuteEnabled,
    secondEnabled,
    use12Hours,
    inputEnableStatus,
    controlContext: { visiblePanel, panelValue, handlePanelChange },
    overlayVisible,
    setOverlayOpened,
  } = context

  const _handlePanelChange = (value: Date | undefined) => {
    handlePanelChange(value)

    if (!inputEnableStatus.value.enableOverlayTimeInput) {
      setOverlayOpened(false)
    }
  }

  const timePanelProps = useTimePanelProps(props, hourEnabled, minuteEnabled, secondEnabled, use12Hours)

  const datePanelProps = computed(() => ({
    cellTooltip: props.cellTooltip,
    disabledDate: props.disabledDate,
    value: panelValue.value,
    type: props.type,
    timePanelOptions: timePanelProps.value,
    visible: overlayVisible.value && visiblePanel.value,
    onChange: _handlePanelChange,
  }))

  return datePanelProps
}
