/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, nextTick, normalizeClass, provide, toRef, watch } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN, useFormElement } from '@idux/components/form'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangeKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayProps } from './composables/useOverlayProps'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useRangePickerControl } from './composables/useRangeControl'
import RangeOverlay from './content/RangeContent'
import { timeRangePickerContext } from './tokens'
import RangeTrigger from './trigger/RangeTrigger'
import { timeRangePickerProps } from './types'

export default defineComponent({
  name: 'IxTimeRangePicker',
  inheritAttrs: false,
  props: timeRangePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const formatRef = computed(() => props.format ?? config.format)

    const pickerState = usePickerState(props, dateConfig, formatRef)
    const { accessor, handleChange } = pickerState

    const rangePickerControl = useRangePickerControl(dateConfig, formatRef, toRef(accessor, 'value'))
    const { overlayOpened, setOverlayOpened } = useOverlayState(props, rangePickerControl)
    const inputEnableStatus = useInputEnableStatus(props, config)

    const formContext = inject(FORM_TOKEN, null)

    const handleKeyDown = useRangeKeyboardEvents(rangePickerControl, setOverlayOpened, handleChange)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.timeRangePicker.separator

    const context = {
      props,
      slots,
      dateConfig,
      locale,
      config,
      mergedPrefixCls,
      formatRef,
      formContext,
      handleKeyDown,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      setOverlayOpened,
      renderSeparator,
      rangeControlContext: rangePickerControl,
      ...pickerState,
    }
    provide(timeRangePickerContext, context)

    expose({ focus, blur })

    watch(overlayOpened, opened => {
      nextTick(() => {
        if (opened) {
          focus()
          inputRef.value?.dispatchEvent(new FocusEvent('focus'))
        } else {
          blur()
          inputRef.value?.dispatchEvent(new FocusEvent('blur'))
        }
      })
    })

    const renderTrigger = () => <RangeTrigger {...attrs} />
    const renderContent = () => <RangeOverlay />

    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() => normalizeClass([`${mergedPrefixCls.value}-overlay`, props.overlayClassName]))

    return () => (
      <ɵOverlay
        {...overlayProps.value}
        class={overlayClass.value}
        triggerId={attrs.id}
        v-slots={{ default: renderTrigger, content: renderContent }}
      />
    )
  },
})
