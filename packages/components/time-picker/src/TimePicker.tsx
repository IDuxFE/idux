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

import { usePickerControl } from './composables/useControl'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayProps } from './composables/useOverlayProps'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import Content from './content/Content'
import { timePickerContext } from './tokens'
import Trigger from './trigger/Trigger'
import { timePickerProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxTimePicker',
  inheritAttrs: false,
  props: timePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('timePicker')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
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
    const pickerControl = usePickerControl(dateConfig, formatRef, handleChange, toRef(accessor, 'value'))

    const inputEnableStatus = useInputEnableStatus(props, config)
    const handleKeyDown = useKeyboardEvents(overlayOpened, setOverlayOpened)

    const { focused, handleFocus, handleBlur, bindOverlayMonitor } = useOverlayFocusMonitor(_handleFocus, _handleBlur)
    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
    })

    const context = {
      props,
      slots,
      dateConfig,
      common,
      locale,
      config,
      mergedPrefixCls,
      formatRef,
      focused,
      handleKeyDown,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      setOverlayOpened,
      controlContext: pickerControl,
      ...pickerState,
      handleFocus,
      handleBlur,
    }
    provide(timePickerContext, context)

    expose({ focus, blur })

    watch(overlayOpened, opened => {
      if (opened) {
        setTimeout(() => {
          inputRef.value?.focus()
        })
      } else {
        pickerControl.init(true)

        if (focused.value) {
          triggerRef.value?.focus()
        }
      }
    })

    const renderTrigger = () => <Trigger ref={triggerRef} {...attrs} />
    const renderContent = () => <Content />

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
