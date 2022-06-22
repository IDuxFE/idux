/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'

import { useActiveValue } from '../composables/useActiveValue'
import { datePanelProps } from '../types'
import { applyDateTime } from '../utils'

export default defineComponent({
  name: 'IxDatePanel',
  props: datePanelProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-picker-panel`)
    const dateConfig = useDateConfig()

    const { activeValue, setActiveValue } = useActiveValue(dateConfig, props)

    function handleChange(value: Date | undefined) {
      callEmit(props.onChange, value)
    }
    function handleDatePanelChange(value: Date) {
      handleChange(props.value ? applyDateTime(dateConfig, props.value, value, ['hour', 'minute', 'second']) : value)
    }
    function handleTimePanelChange(value: Date) {
      handleChange(props.value ? applyDateTime(dateConfig, props.value, value, ['year', 'month', 'date']) : value)
    }

    const handleDatePanelCellClick = (value: Date) => {
      handleDatePanelChange(value)
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
      }
    }

    return () => {
      const datePanelType = props.type === 'datetime' ? 'date' : props.type

      const datePanelProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: datePanelType,
        value: props.value,
        visible: props.type === 'datetime' ? props.visible === 'datePanel' : !!props.visible,
        activeDate: activeValue.value,
        onCellClick: handleDatePanelCellClick,
        'onUpdate:activeDate': setActiveValue,
      }
      const _timePanelProps = {
        ...props.timePanelOptions,
        activeValue: activeValue.value,
        value: props.value,
        visible: props.type === 'datetime' ? props.visible === 'timePanel' : false,
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': setActiveValue,
      }

      return (
        <div class={mergedPrefixCls.value} tabindex={-1} onMousedown={handleMouseDown}>
          <ɵDatePanel v-show={props.visible !== 'timePanel'} v-slots={slots} {...datePanelProps} />
          {props.type === 'datetime' && <ɵTimePanel v-show={props.visible === 'timePanel'} {..._timePanelProps} />}
        </div>
      )
    }
  },
})
