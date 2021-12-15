/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject, provide, watch } from 'vue'

import { isArray } from 'lodash-es'

import { useControlledProp, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { getLocale } from '@idux/components/i18n'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangePickerControl } from './composables/usePickerControl'
import { useCommonOverlayProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import RangeOverlay from './overlay/RangeOverlay'
import { timeRangePickerContext, timeRangePickerControl } from './tokens'
import RangeTrigger from './trigger/RangeTrigger'
import { timeRangePickerProps } from './types'
import { convertToDate } from './utils'

export default defineComponent({
  name: 'IxTimeRangePicker',
  props: timeRangePickerProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('timeRangePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const locale = getLocale('timeRangePicker')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => props.format ?? config.format)

    const commonBindings = useTimePickerCommonBindings(props)
    const { accessor, isDisabled } = commonBindings

    const accessorDateValue = computed(() => {
      if (!isArray(accessor.valueRef.value)) {
        return [undefined, undefined]
      }

      return accessor.valueRef.value.map(v => convertToDate(dateConfig, v, format.value))
    }) as ComputedRef<[Date | undefined, Date | undefined]>
    const [bufferValue, setBufferValue] = useState<[Date | undefined, Date | undefined]>(accessorDateValue.value)
    watch(accessorDateValue, setBufferValue)

    const rangePickerControl = useRangePickerControl(
      bufferValue,
      dateConfig,
      format,
      [],
      (value: string) => !value || isValid(parse(value, format.value)),
      setBufferValue,
    )
    const inputEnableStatus = useInputEnableStatus(props, config)

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        setBufferValue(accessorDateValue.value)
      }
    }

    const formContext = inject(FORM_TOKEN, null)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.value.separator

    provide(timeRangePickerControl, rangePickerControl)
    provide(timeRangePickerContext, {
      dateConfig,
      config,
      props,
      format,
      formContext,
      slots,
      overlayOpened: visibility,
      mergedPrefixCls,
      inputEnableStatus,
      commonBindings,
      bufferValue,
      setOverlayOpened: changeVisible,
      renderSeparator,
    })

    const overlayProps = useCommonOverlayProps(props, config, mergedPrefixCls, changeVisible)

    return () => {
      const renderTrigger = () => <RangeTrigger class={mergedPrefixCls.value} value={accessorDateValue.value} />
      const renderContent = () => <RangeOverlay />

      return (
        <ɵOverlay
          {...overlayProps.value}
          visible={visibility.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          disabled={isDisabled.value || props.readonly}
        />
      )
    }
  },
})
