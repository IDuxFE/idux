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
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import Content from './content/Content'
import { datePickerToken } from './token'
import Trigger from './trigger/Trigger'
import { datePickerProps } from './types'

const defaultOffset: [number, number] = [0, 8]

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

    provide(datePickerToken, {
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
    })

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

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)
    const renderTrigger = () => <Trigger {...attrs}></Trigger>
    const renderContent = () => <Content></Content>
    const overlayProps = { triggerId: attrs.id, 'onUpdate:visible': setOverlayOpened }

    return () => (
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
  },
})
