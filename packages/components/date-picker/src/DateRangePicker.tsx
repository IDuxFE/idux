/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slots, computed, defineComponent, normalizeClass, provide, ref, toRef, watch } from 'vue'

import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { IxControlTrigger } from '@idux/components/control-trigger'
import { useFormElement } from '@idux/components/form'
import { useThemeToken } from '@idux/components/theme'

import { getThemeTokens } from '../theme'
import { useFormat } from './composables/useFormat'
import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { useRangeKeyboardEvents } from './composables/useKeyboardEvents'
import { useOverlayState } from './composables/useOverlayState'
import { usePickerState } from './composables/usePickerState'
import { useRangeControl } from './composables/useRangeControl'
import { useRangePickerPanelProps } from './composables/useRangePickerPanelProps'
import { useRangeShortcuts } from './composables/useRangeShortcuts'
import { useTriggerProps } from './composables/useTriggerProps'
import RangeContent from './content/RangeContent'
import { dateRangePickerPanelPropsToken, dateRangePickerPanelSlotsToken, dateRangePickerToken } from './token'
import RangeTrigger from './trigger/RangeTrigger'
import { dateRangePickerProps } from './types'

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

    const triggerRef = ref<{ focus: () => void }>()

    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const { overlayOpened, overlayVisible, onAfterLeave, setOverlayOpened } = useOverlayState(props)
    const inputEnableStatus = useInputEnableStatus(props, config)
    const formatContext = useFormat(props, config)
    const pickerStateContext = usePickerState(props, config, dateConfig, formatContext.formatRef)

    const { accessor, convertedValue, focused, handleFocus, handleBlur, handleChange } = pickerStateContext

    const rangeControlContext = useRangeControl(
      dateConfig,
      formatContext,
      inputEnableStatus,
      toRef(accessor, 'value'),
      toRef(props, 'type'),
    )

    const rangeShortcutsContext = useRangeShortcuts(
      computed(() => props.shortcuts),
      convertedValue,
      overlayOpened,
    )

    const handleKeyDown = useRangeKeyboardEvents(rangeControlContext, overlayOpened, setOverlayOpened, handleChange)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? locale.dateRangePicker.separator

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
      rangeControlContext,
      renderSeparator,
      handleKeyDown,
      ...formatContext,
      ...pickerStateContext,
      ...rangeShortcutsContext,
      handleFocus,
      handleBlur,
    }

    const { shortcuts, selectedShortcut, showShortcutPanel } = rangeShortcutsContext

    const triggerProps = useTriggerProps(context)
    const dateRangePanelProps = useRangePickerPanelProps(context)

    const dateRangePanelSlots = {
      cell: slots.cell,
      separator: inputEnableStatus.value.enableOverlayDateInput
        ? () => <div class={`${mergedPrefixCls.value}-overlay-separator`}></div>
        : undefined,
    } as Slots

    provide(dateRangePickerToken, context)
    provide(dateRangePickerPanelPropsToken, dateRangePanelProps)
    provide(dateRangePickerPanelSlotsToken, dateRangePanelSlots)

    watch(overlayOpened, opened => {
      if (opened) {
        setTimeout(() => {
          if (!focused.value) {
            inputRef.value?.focus()
          }
        })
      } else {
        rangeControlContext.init(true)

        if (focused.value) {
          triggerRef.value?.focus()
        }
      }
    })

    const renderTrigger = () => <RangeTrigger ref={triggerRef} v-slots={slots}></RangeTrigger>
    const renderContent = () => <RangeContent v-slots={slots}></RangeContent>
    const overlayClass = computed(() =>
      normalizeClass([`${mergedPrefixCls.value}-overlay`, globalHashId.value, hashId.value, props.overlayClassName]),
    )

    return () => (
      <IxControlTrigger
        {...triggerProps.value}
        class={`${mergedPrefixCls.value} ${globalHashId.value} ${hashId.value}`}
        overlayClassName={overlayClass.value}
        overlayMatchWidth={
          !!shortcuts.value.length && !showShortcutPanel.value && !selectedShortcut.value?.panelRenderer
        }
        {...attrs}
        v-slots={{ default: renderTrigger, overlay: renderContent, suffix: slots.suffix, clearIcon: slots.clearIcon }}
      />
    )
  },
})
