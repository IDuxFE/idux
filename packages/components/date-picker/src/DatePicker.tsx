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

import { getThemeTokens } from '../theme'
import { useControl } from './composables/useControl'
import { useFormat } from './composables/useFormat'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerPanelProps } from './composables/usePickerPanelProps'
import { usePickerState } from './composables/usePickerState'
import { useTriggerProps } from './composables/useTriggerProps'
import Content from './content/Content'
import { datePickerPanelPropsToken, datePickerToken } from './token'
import Trigger from './trigger/Trigger'
import { datePickerProps } from './types'

export default defineComponent({
  name: 'IxDatePicker',
  inheritAttrs: false,
  props: datePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const { globalHashId, hashId, registerToken } = useThemeToken('datePicker')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-picker`)
    const config = useGlobalConfig('datePicker')
    const dateConfig = useDateConfig()

    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const { overlayOpened, overlayVisible, onAfterLeave, setOverlayOpened } = useOverlayState(props)
    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, config, dateConfig, formatContext.formatRef)

    const { accessor, focused, handleFocus, handleBlur, handleChange } = pickerStateContext

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

    const triggerProps = useTriggerProps(context)
    const datePanelProps = usePickerPanelProps(context)

    provide(datePickerToken, context)
    provide(datePickerPanelPropsToken, datePanelProps)

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

    const renderTrigger = () => <Trigger ref={triggerRef} v-slots={slots}></Trigger>
    const renderContent = () => <Content v-slots={slots}></Content>
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
