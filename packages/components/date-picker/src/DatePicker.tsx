/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, toRaw, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { callEmit } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { useFormAccessor, useFormElement } from '@idux/components/utils'

import { useFormat } from './composables/useFormat'
import { useInputState } from './composables/useInputState'
import { useOverlayState } from './composables/useOverlayState'
import { usePanelState } from './composables/usePanelState'
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

    const focusMonitor = useSharedFocusMonitor()
    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    expose({ focus, blur })

    const { overlayOpened, setOverlayOpened } = useOverlayState(props)
    const accessor = useFormAccessor()
    const format = useFormat(props, config)
    const inputStateContext = useInputState(props, dateConfig, accessor, format)
    const { inputValue } = inputStateContext
    const { panelDate, setPanelDate } = usePanelState(props, dateConfig, accessor, format)

    const handlePanelCellClick = (date: Date) => {
      const oldDate = toRaw(accessor.valueRef.value)
      if (!oldDate || !dateConfig.isSame(date, dateConfig.convert(oldDate, format.value), props.type)) {
        setOverlayOpened(false)
        accessor.setValue(date)
        callEmit(props.onChange, date, oldDate)
      }
    }

    provide(datePickerToken, {
      props,
      slots,
      locale,
      config,
      mergedPrefixCls,
      dateConfig,
      focusMonitor,
      inputRef,
      overlayOpened,
      setOverlayOpened,
      accessor,
      format,
      ...inputStateContext,
      panelDate,
      setPanelDate,
      handlePanelCellClick,
    })

    watch(overlayOpened, opened => {
      if (!opened && inputValue.value) {
        // changeSelected(inputValue.value)
      }

      opened ? focus() : blur()
    })

    const classes = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)

    return () => {
      const renderTrigger = () => <Trigger {...attrs}></Trigger>
      const renderContent = () => <Content></Content>
      const overlayProps = { 'onUpdate:visible': setOverlayOpened }
      return (
        <ɵOverlay
          {...overlayProps}
          visible={overlayOpened.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          class={classes.value}
          clickOutside
          disabled={accessor.disabled.value || props.readonly}
          offset={defaultOffset}
          placement="bottomStart"
          target={target.value}
          trigger="manual"
        />
      )
    }
  },
})
