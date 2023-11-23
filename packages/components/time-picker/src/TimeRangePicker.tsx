/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onMounted, provide, ref, toRef, watch } from 'vue'

import { ɵOverlay, ɵOverlayInstance } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/form'
import { useThemeToken } from '@idux/components/theme'
import { useOverlayFocusMonitor } from '@idux/components/utils'

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
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxTimeRangePicker',
  inheritAttrs: false,
  props: timeRangePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('timePicker')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()

    const overlayRef = ref<ɵOverlayInstance>()
    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const formatRef = computed(() => props.format ?? config.format)

    const { overlayOpened, setOverlayOpened } = useOverlayState(props, focus)
    const pickerState = usePickerState(props, config, dateConfig, formatRef, setOverlayOpened)
    const { accessor, handleFocus: _handleFocus, handleBlur: _handleBlur, handleChange } = pickerState

    const rangePickerControl = useRangePickerControl(dateConfig, formatRef, toRef(accessor, 'value'))
    const inputEnableStatus = useInputEnableStatus(props, config)

    const handleKeyDown = useRangeKeyboardEvents(rangePickerControl, overlayOpened, setOverlayOpened, handleChange)

    const { focused, handleFocus, handleBlur, bindOverlayMonitor } = useOverlayFocusMonitor(_handleFocus, _handleBlur)
    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
    })

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.timeRangePicker.separator

    const context = {
      props,
      slots,
      dateConfig,
      common,
      locale,
      config,
      focused,
      mergedPrefixCls,
      formatRef,
      handleKeyDown,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      setOverlayOpened,
      renderSeparator,
      rangeControlContext: rangePickerControl,
      ...pickerState,
      handleFocus,
      handleBlur,
    }
    provide(timeRangePickerContext, context)

    expose({ focus, blur })

    watch(overlayOpened, opened => {
      if (opened) {
        setTimeout(() => {
          inputRef.value?.focus()
        })
      } else {
        rangePickerControl.init(true)

        if (focused.value) {
          triggerRef.value?.focus()
        }
      }
    })

    const renderTrigger = () => <RangeTrigger ref={triggerRef} {...attrs} />
    const renderContent = () => <RangeOverlay />

    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() =>
      normalizeClass([`${mergedPrefixCls.value}-overlay`, globalHashId.value, hashId.value, props.overlayClassName]),
    )

    return () => (
      <ɵOverlay
        ref={overlayRef}
        {...overlayProps.value}
        class={overlayClass.value}
        triggerId={attrs.id}
        v-slots={{ default: renderTrigger, content: renderContent }}
      />
    )
  },
})
