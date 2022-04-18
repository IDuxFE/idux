/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, watch } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/utils'

import { useFormat } from './composables/useFormat'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangeKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useRangeControl } from './composables/useRangeControl'
import RangeContent from './content/RangeContent'
import { dateRangePickerToken } from './token'
import RangeTrigger from './trigger/RangeTrigger'
import { dateRangePickerProps } from './types'

const defaultOffset: [number, number] = [0, 8]

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

    const showFooter = computed(() => !!props.footer || !!slots.footer)

    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, dateConfig, formatContext.formatRef)

    const { accessor, handleChange } = pickerStateContext

    const rangeControlContext = useRangeControl(dateConfig, formatContext, inputEnableStatus, accessor.valueRef)
    const { overlayOpened, setOverlayOpened } = useOverlayState(props, rangeControlContext)
    const handleKeyDown = useRangeKeyboardEvents(rangeControlContext, showFooter, setOverlayOpened, handleChange)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.dateRangePicker.separator

    provide(dateRangePickerToken, {
      props,
      slots,
      locale,
      config,
      mergedPrefixCls,
      dateConfig,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      setOverlayOpened,
      rangeControlContext,
      renderSeparator,
      handleKeyDown,
      ...formatContext,
      ...pickerStateContext,
    })

    watch(overlayOpened, opened => {
      if (!opened) {
        rangeControlContext.init(true)
      }

      opened ? focus() : blur()
    })

    watch(rangeControlContext.buffer, value => {
      if (!showFooter.value) {
        handleChange(value)
      }
    })

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)
    const renderTrigger = () => <RangeTrigger {...attrs}></RangeTrigger>
    const renderContent = () => <RangeContent></RangeContent>
    const overlayProps = { 'onUpdate:visible': setOverlayOpened }

    return () => {
      return (
        <ɵOverlay
          {...overlayProps}
          visible={overlayOpened.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          class={normalizeClass(props.overlayClassName)}
          clickOutside
          disabled={accessor.disabled.value || props.readonly}
          offset={defaultOffset}
          placement="bottomStart"
          target={target.value}
          trigger="manual"
        />
      )
    }
  },
})
