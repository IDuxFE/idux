/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, toRef, watch } from 'vue'

import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { IxControlTrigger } from '@idux/components/control-trigger'
import { useFormElement } from '@idux/components/form'
import { useThemeToken } from '@idux/components/theme'

import { usePickerControl } from './composables/useControl'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useTriggerProps } from './composables/useTriggerProps'
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

    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const formatRef = computed(() => props.format ?? config.format)
    const { overlayOpened, setOverlayOpened } = useOverlayState(props, focus)
    const pickerState = usePickerState(props, config, dateConfig, formatRef)
    const { accessor, focused, handleFocus, handleBlur, handleChange } = pickerState
    const pickerControl = usePickerControl(dateConfig, formatRef, handleChange, toRef(accessor, 'value'))

    const inputEnableStatus = useInputEnableStatus(props, config)
    const handleKeyDown = useKeyboardEvents(overlayOpened, setOverlayOpened)

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
      handleFocus,
      handleBlur,
    }
    provide(timePickerContext, context)

    const triggerProps = useTriggerProps(context)

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

    const overlayClass = computed(() =>
      normalizeClass([`${mergedPrefixCls.value}-overlay`, globalHashId.value, hashId.value, props.overlayClassName]),
    )

    return () => (
      <IxControlTrigger
        {...triggerProps.value}
        class={`${mergedPrefixCls.value} ${globalHashId.value} ${hashId.value}`}
        overlayClassName={overlayClass.value}
        {...attrs}
        v-slots={{ default: renderTrigger, overlay: renderContent, suffix: slots.suffix, clearIcon: slots.clearIcon }}
      />
    )
  },
})
