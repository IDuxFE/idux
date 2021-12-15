/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { usePickerControl } from './composables/usePickerControl'
import { useCommonOverlayProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import Overlay from './overlay/Overlay'
import { timePickerContext, timePickerControl } from './tokens'
import Trigger from './trigger/Trigger'
import { timePickerProps } from './types'
import { convertToDate } from './utils'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => props.format ?? config.format)
    const commonBindings = useTimePickerCommonBindings(props)
    const { accessor, isDisabled, handleChange } = commonBindings
    const pickerControl = usePickerControl(
      accessor.valueRef,
      dateConfig,
      format,
      [],
      (value: string) => !value || isValid(parse(value, format.value)),
      handleChange,
    )
    const { init } = pickerControl

    const inputEnableStatus = useInputEnableStatus(props, config)

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        init()
      }
    }

    const formContext = inject(FORM_TOKEN, null)

    provide(timePickerControl, pickerControl)
    provide(timePickerContext, {
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
      setOverlayOpened: changeVisible,
    })

    const overlayProps = useCommonOverlayProps(props, config, mergedPrefixCls, changeVisible)

    return () => {
      const renderTrigger = () => (
        <Trigger
          class={mergedPrefixCls.value}
          value={convertToDate(dateConfig, accessor.valueRef.value, format.value)}
        />
      )
      const renderContent = () => <Overlay />

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
