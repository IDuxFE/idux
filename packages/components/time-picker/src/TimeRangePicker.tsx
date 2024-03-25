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

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangeKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useRangePickerControl } from './composables/useRangeControl'
import { useTriggerProps } from './composables/useTriggerProps'
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

    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const formatRef = computed(() => props.format ?? config.format)

    const { overlayOpened, setOverlayOpened } = useOverlayState(props, focus)
    const pickerState = usePickerState(props, config, dateConfig, formatRef)
    const { accessor, focused, handleFocus, handleBlur, handleChange } = pickerState

    const rangePickerControl = useRangePickerControl(dateConfig, formatRef, toRef(accessor, 'value'))
    const inputEnableStatus = useInputEnableStatus(props, config)

    const handleKeyDown = useRangeKeyboardEvents(rangePickerControl, overlayOpened, setOverlayOpened, handleChange)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.timeRangePicker.separator

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
      renderSeparator,
      rangeControlContext: rangePickerControl,
      ...pickerState,
      handleFocus,
      handleBlur,
    }

    const triggerProps = useTriggerProps(context)

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
