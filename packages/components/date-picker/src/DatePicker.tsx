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
import { useOverlayFocusMonitor } from '@idux/components/utils'

import { useControl } from './composables/useControl'
import { useFormat } from './composables/useFormat'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayProps } from './composables/useOverlayProps'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import Content from './content/Content'
import { datePickerToken } from './token'
import Trigger from './trigger/Trigger'
import { datePickerProps } from './types'

export default defineComponent({
  name: 'IxDatePicker',
  inheritAttrs: false,
  props: datePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-picker`)
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

    const { focused, handleFocus, handleBlur, bindOverlayMonitor } = useOverlayFocusMonitor(_handleFocus, _handleBlur)
    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
    })

    const controlContext = useControl(
      dateConfig,
      formatContext,
      inputEnableStatus,
      toRef(accessor, 'value'),
      handleChange,
    )
    const handleKeyDown = useKeyboardEvents(overlayOpened, setOverlayOpened)

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
      handleKeyDown,
      controlContext,
      ...formatContext,
      ...pickerStateContext,
      handleFocus,
      handleBlur,
    }

    provide(datePickerToken, context)

    watch(overlayOpened, opened => {
      if (opened) {
        setTimeout(() => {
          inputRef.value?.focus()
        })
      } else {
        controlContext.init(true)

        if (focused.value) {
          triggerRef.value?.focus()
        }
      }
    })

    const renderTrigger = () => <Trigger ref={triggerRef} {...attrs}></Trigger>
    const renderContent = () => <Content></Content>
    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() => normalizeClass([`${mergedPrefixCls.value}-overlay`, props.overlayClassName]))

    return () => (
      <ɵOverlay
        ref={overlayRef}
        {...overlayProps.value}
        class={overlayClass.value}
        v-slots={{ default: renderTrigger, content: renderContent }}
        triggerId={attrs.id}
      />
    )
  },
})
