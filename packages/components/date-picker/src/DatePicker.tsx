/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, nextTick, normalizeClass, provide, watch } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/form'

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

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, dateConfig, formatContext.formatRef)

    const { accessor, handleChange } = pickerStateContext

    const controlContext = useControl(dateConfig, formatContext, inputEnableStatus, accessor.valueRef, handleChange)
    const { overlayOpened, setOverlayOpened } = useOverlayState(props, controlContext)
    const handleKeyDown = useKeyboardEvents(setOverlayOpened)

    const context = {
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
      handleKeyDown,
      controlContext,
      ...formatContext,
      ...pickerStateContext,
    }

    provide(datePickerToken, context)

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

    const renderTrigger = () => <Trigger {...attrs}></Trigger>
    const renderContent = () => <Content></Content>
    const overlayProps = useOverlayProps(context)
    const overlayClass = computed(() => normalizeClass([`${mergedPrefixCls.value}-overlay`, props.overlayClassName]))

    return () => (
      <ɵOverlay
        {...overlayProps.value}
        class={overlayClass.value}
        v-slots={{ default: renderTrigger, content: renderContent }}
        triggerId={attrs.id}
      />
    )
  },
})
