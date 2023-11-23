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
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxDateRangePicker',
  inheritAttrs: false,
  props: dateRangePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const { globalHashId, hashId, registerToken } = useThemeToken('datePicker')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-range-picker`)
    const config = useGlobalConfig('datePicker')
    const dateConfig = useDateConfig()

    const overlayRef = ref<ɵOverlayInstance>()
    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const { overlayOpened, overlayVisible, onAfterLeave, setOverlayOpened } = useOverlayState(props)
    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, config, dateConfig, formatContext.formatRef, setOverlayOpened)

    const { accessor, handleFocus: _handleFocus, handleBlur: _handleBlur, handleChange } = pickerStateContext

    const rangeControlContext = useRangeControl(dateConfig, formatContext, inputEnableStatus, toRef(accessor, 'value'))
    const handleKeyDown = useRangeKeyboardEvents(rangeControlContext, overlayOpened, setOverlayOpened, handleChange)

    const { focused, handleFocus, handleBlur, bindOverlayMonitor } = useOverlayFocusMonitor(_handleFocus, _handleBlur)
    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
    })

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.dateRangePicker.separator

    const context = {
      props,
      slots,
      common,
      locale,
      config,
      focused,
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
      handleFocus,
      handleBlur,
    }

    provide(dateRangePickerToken, context)

    watch(overlayOpened, opened => {
      if (opened) {
        setTimeout(() => {
          inputRef.value?.focus()
        })
      } else {
        rangeControlContext.init(true)

        if (focused.value) {
          triggerRef.value?.focus()
        }
      }
    })

    const renderTrigger = () => <RangeTrigger ref={triggerRef} {...attrs}></RangeTrigger>
    const renderContent = () => <RangeContent></RangeContent>
    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() =>
      normalizeClass([`${mergedPrefixCls.value}-overlay`, globalHashId.value, hashId.value, props.overlayClassName]),
    )

    return () => {
      return (
        <ɵOverlay
          ref={overlayRef}
          {...overlayProps.value}
          class={overlayClass.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          triggerId={attrs.id}
        />
      )
    }
  },
})
