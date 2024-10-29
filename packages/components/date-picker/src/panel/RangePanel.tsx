/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isArray } from 'lodash-es'

import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { getTimePickerThemeTokens } from '@idux/components/time-picker'

import { getThemeTokens } from '../../theme'
import { useRangeActiveValue } from '../composables/useActiveValue'
import { useRangePanelState } from '../composables/useRangePanelState'
import { dateRangePickerPanelPropsToken } from '../token'
import { type DateRangePanelProps, dateRangePanelProps } from '../types'
import { convertPickerTypeToConfigType } from '../utils'

export default defineComponent({
  name: 'IxDateRangePanel',
  props: dateRangePanelProps,
  setup(props, { slots }) {
    const inherittedProps = inject(dateRangePickerPanelPropsToken, null)

    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('datePicker')
    const { registerToken: registerTimePickerToken } = useThemeToken('timePicker')
    registerToken(getThemeTokens)
    registerTimePickerToken(getTimePickerThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-range-picker-panel`)
    const dateConfig = useDateConfig()

    const mergedProps = computed(() => {
      if (!inherittedProps) {
        return props
      }

      const res = {} as DateRangePanelProps

      Object.keys(props).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(res as any)[key] =
          props[key as keyof DateRangePanelProps] ?? inherittedProps.value[key as keyof DateRangePanelProps]
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(res as any).type = res.type ?? 'date'

      return res
    })

    const { handleChange, handleDatePanelCellClick, handleDatePanelCellMouseenter, panelValue, isSelecting } =
      useRangePanelState(mergedProps, dateConfig)
    const { fromActiveValue, toActiveValue, setFromActiveValue, setToActiveValue } = useRangeActiveValue(
      dateConfig,
      mergedProps,
      panelValue,
      isSelecting,
    )

    const renderSide = (isFrom: boolean) => {
      const _props = mergedProps.value
      const timeValue = panelValue.value?.[isFrom ? 0 : 1]
      const datePanelType = convertPickerTypeToConfigType(_props.type!)
      const activeValue = isFrom ? fromActiveValue.value : toActiveValue.value

      const handleTimePanelChange = (value: Date) => {
        handleChange((isFrom ? [value, panelValue.value?.[1]] : [panelValue.value?.[0], value]) as Date[])
      }

      const datePanelProps = {
        cellTooltip: _props.cellTooltip,
        disabledDate: _props.disabledDate,
        type: datePanelType,
        value: panelValue.value,
        visible: _props.type === 'datetime' ? _props.visible === 'datePanel' : !!_props.visible,
        activeDate: activeValue,
        onCellClick: handleDatePanelCellClick,
        onCellMouseenter: handleDatePanelCellMouseenter,
        'onUpdate:activeDate': isFrom ? setFromActiveValue : setToActiveValue,
      }
      const _timePanelProps = {
        ...((isArray(_props.timePanelOptions) ? _props.timePanelOptions[isFrom ? 0 : 1] : _props.timePanelOptions) ??
          {}),
        activeValue: timeValue ?? activeValue,
        value: timeValue,
        visible: _props.type === 'datetime' ? _props.visible === 'timePanel' : false,
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': isFrom ? setFromActiveValue : setToActiveValue,
      }

      return (
        <div class={`${mergedPrefixCls.value}-side`}>
          <ɵDatePanel v-show={_props.visible !== 'timePanel'} v-slots={slots} {...datePanelProps} />
          {_props.type === 'datetime' && <ɵTimePanel v-show={_props.visible === 'timePanel'} {..._timePanelProps} />}
        </div>
      )
    }

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={[prefixCls, globalHashId.value, hashId.value]}>
          {renderSide(true)}
          {slots.separator?.() ?? <div class={`${prefixCls}-separator`}></div>}
          {renderSide(false)}
        </div>
      )
    }
  },
})
