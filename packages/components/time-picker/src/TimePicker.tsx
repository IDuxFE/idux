/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, nextTick, normalizeClass, provide, toRef, watch } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/form'

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

export default defineComponent({
  name: 'IxTimePicker',
  inheritAttrs: false,
  props: timePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const formatRef = computed(() => props.format ?? config.format)
    const pickerState = usePickerState(props, config, dateConfig, formatRef)
    const { accessor, handleChange } = pickerState
    const pickerControl = usePickerControl(dateConfig, formatRef, handleChange, toRef(accessor, 'value'))
    const { overlayOpened, setOverlayOpened } = useOverlayState(props, pickerControl)

    const inputEnableStatus = useInputEnableStatus(props, config)
    const handleKeyDown = useKeyboardEvents(setOverlayOpened)

    const context = {
      props,
      slots,
      dateConfig,
      common,
      locale,
      config,
      mergedPrefixCls,
      formatRef,
      handleKeyDown,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      setOverlayOpened,
      controlContext: pickerControl,
      ...pickerState,
    }
    provide(timePickerContext, context)

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

    const renderTrigger = () => <Trigger {...attrs} />
    const renderContent = () => <Content />

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
