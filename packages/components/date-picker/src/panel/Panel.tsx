/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { getTimePickerThemeTokens } from '@idux/components/time-picker'
import { applyDateTime } from '@idux/components/utils'

import { getThemeTokens } from '../../theme'
import { useActiveValue } from '../composables/useActiveValue'
import { datePickerPanelPropsToken } from '../token'
import { type DatePanelProps, datePanelProps } from '../types'
import { convertPickerTypeToConfigType } from '../utils'

export default defineComponent({
  name: 'IxDatePanel',
  props: datePanelProps,
  setup(props, { slots }) {
    const inherittedProps = inject(datePickerPanelPropsToken, null)

    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('datePicker')
    const { registerToken: registerTimePickerToken } = useThemeToken('timePicker')
    registerToken(getThemeTokens)
    registerTimePickerToken(getTimePickerThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-picker-panel`)
    const dateConfig = useDateConfig()

    const mergedProps = computed(() => {
      if (!inherittedProps) {
        return props
      }

      const res = {} as DatePanelProps

      Object.keys(props).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(res as any)[key] = props[key as keyof DatePanelProps] ?? inherittedProps.value[key as keyof DatePanelProps]
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(res as any).type = res.type ?? 'date'

      return res
    })

    const { activeValue, setActiveValue } = useActiveValue(dateConfig, mergedProps)

    function handleChange(value: Date | undefined) {
      callEmit(mergedProps.value.onChange, value)
    }
    function handleDatePanelChange(value: Date) {
      handleChange(
        mergedProps.value.value
          ? applyDateTime(dateConfig, mergedProps.value.value, value, ['hour', 'minute', 'second', 'millisecond'])
          : value,
      )
    }
    function handleTimePanelChange(value: Date) {
      handleChange(
        mergedProps.value.value
          ? applyDateTime(dateConfig, mergedProps.value.value, value, ['year', 'month', 'date'])
          : value,
      )
    }

    const handleDatePanelCellClick = (value: Date) => {
      handleDatePanelChange(value)
    }

    return () => {
      const _props = mergedProps.value
      const datePanelType = convertPickerTypeToConfigType(_props.type!)

      const datePanelProps = {
        cellTooltip: _props.cellTooltip,
        disabledDate: _props.disabledDate,
        type: datePanelType,
        value: _props.value,
        visible: _props.type === 'datetime' ? _props.visible === 'datePanel' : !!_props.visible,
        activeDate: activeValue.value,
        onCellClick: handleDatePanelCellClick,
        'onUpdate:activeDate': setActiveValue,
      }
      const _timePanelProps = {
        ..._props.timePanelOptions,
        activeValue: activeValue.value,
        value: _props.value,
        visible: _props.type === 'datetime' ? _props.visible === 'timePanel' : false,
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': setActiveValue,
      }

      return (
        <div class={[mergedPrefixCls.value, globalHashId.value, hashId.value]}>
          <ɵDatePanel v-show={_props.visible !== 'timePanel'} v-slots={slots} {...datePanelProps} />
          {_props.type === 'datetime' && <ɵTimePanel v-show={_props.visible === 'timePanel'} {..._timePanelProps} />}
        </div>
      )
    }
  },
})
