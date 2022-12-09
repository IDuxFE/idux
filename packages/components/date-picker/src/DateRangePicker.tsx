/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, toRef, watch } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/form'

import { useFormat } from './composables/useFormat'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangeKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayProps } from './composables/useOverlayProps'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useRangeControl } from './composables/useRangeControl'
import RangeContent from './content/RangeContent'
import { dateRangePickerToken } from './token'
import RangeTrigger from './trigger/RangeTrigger'
import { dateRangePickerProps } from './types'

export default defineComponent({
  name: 'IxDateRangePicker',
  inheritAttrs: false,
  props: dateRangePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-range-picker`)
    const config = useGlobalConfig('datePicker')
    const dateConfig = useDateConfig()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, config, dateConfig, formatContext.formatRef)

    const { accessor, handleChange } = pickerStateContext

    const rangeControlContext = useRangeControl(dateConfig, formatContext, inputEnableStatus, toRef(accessor, 'value'))
    const { overlayOpened, overlayVisible, onAfterLeave, setOverlayOpened } = useOverlayState(
      props,
      rangeControlContext,
    )
    const handleKeyDown = useRangeKeyboardEvents(rangeControlContext, setOverlayOpened, handleChange)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.dateRangePicker.separator

    const context = {
      props,
      slots,
      common,
      locale,
      config,
      mergedPrefixCls,
      dateConfig,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      overlayVisible,
      onAfterLeave,
      setOverlayOpened,
      rangeControlContext,
      renderSeparator,
      handleKeyDown,
      ...formatContext,
      ...pickerStateContext,
    }

    provide(dateRangePickerToken, context)

    watch(overlayOpened, opened => {
      setTimeout(() => {
        if (opened) {
          focus()
          inputRef.value?.dispatchEvent(new FocusEvent('focus'))
        } else {
          blur()
          inputRef.value?.dispatchEvent(new FocusEvent('blur'))
        }
      })
    })

    const renderTrigger = () => <RangeTrigger {...attrs}></RangeTrigger>
    const renderContent = () => <RangeContent></RangeContent>
    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() => normalizeClass([`${mergedPrefixCls.value}-overlay`, props.overlayClassName]))

    return () => {
      return (
        <ɵOverlay
          {...overlayProps.value}
          class={overlayClass.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          triggerId={attrs.id}
        />
      )
    }
  },
})
