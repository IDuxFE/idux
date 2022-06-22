/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { isArray } from 'lodash-es'

import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'

import { useRangeActiveValue } from '../composables/useActiveValue'
import { useRangePanelState } from '../composables/useRangePanelState'
import { dateRangePanelProps } from '../types'

export default defineComponent({
  name: 'IxDateRangePanel',
  props: dateRangePanelProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-range-picker-panel`)
    const dateConfig = useDateConfig()

    const { handleChange, handleDatePanelCellClick, handleDatePanelCellMouseenter, panelValue, isSelecting } =
      useRangePanelState(props, dateConfig)
    const { fromActiveValue, toActiveValue, setFromActiveValue, setToActiveValue } = useRangeActiveValue(
      dateConfig,
      props,
      panelValue,
      isSelecting,
    )

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
      }
    }

    const renderSide = (isFrom: boolean) => {
      const timeValue = panelValue.value?.[isFrom ? 0 : 1]
      const activeValue = isFrom ? fromActiveValue.value : toActiveValue.value

      const handleTimePanelChange = (value: Date) => {
        handleChange(isFrom ? [value, panelValue.value?.[1]] : [panelValue.value?.[0], value])
      }

      const datePanelProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: props.type === 'datetime' ? 'date' : props.type,
        value: panelValue.value,
        visible: props.type === 'datetime' ? props.visible === 'datePanel' : !!props.visible,
        activeDate: activeValue,
        onCellClick: handleDatePanelCellClick,
        onCellMouseenter: handleDatePanelCellMouseenter,
        'onUpdate:activeDate': isFrom ? setFromActiveValue : setToActiveValue,
      }
      const _timePanelProps = {
        ...((isArray(props.timePanelOptions) ? props.timePanelOptions[isFrom ? 0 : 1] : props.timePanelOptions) ?? {}),
        activeValue: timeValue ?? activeValue,
        value: timeValue,
        visible: props.type === 'datetime' ? props.visible === 'timePanel' : false,
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': isFrom ? setFromActiveValue : setToActiveValue,
      }

      return (
        <div class={`${mergedPrefixCls.value}-side`}>
          <ɵDatePanel v-show={props.visible !== 'timePanel'} v-slots={slots} {...datePanelProps} />
          {props.type === 'datetime' && <ɵTimePanel v-show={props.visible === 'timePanel'} {..._timePanelProps} />}
        </div>
      )
    }

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={prefixCls} tabindex={-1} onMousedown={handleMouseDown}>
          {renderSide(true)}
          {slots.separator?.() ?? <div class={`${prefixCls}-separator`}></div>}
          {renderSide(false)}
        </div>
      )
    }
  },
})
