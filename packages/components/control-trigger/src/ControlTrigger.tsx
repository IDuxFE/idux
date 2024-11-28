/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵTrigger, type ɵTriggerInstance, type ɵTriggerSlots } from '@idux/components/_private/trigger'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { useMergedCommonControlProps, useOverlayFocusMonitor } from '@idux/components/utils'

import ControlTriggerOverlay from './ControlTriggerOverlay'
import { useOverlayState } from './composables/useOverlayState'
import { useTriggerFocusState } from './composables/useTriggerFocusState'
import { controlTriggerToken } from './token'
import { type ControlTriggerSlots, controlTriggerProps } from './types'

const defaultTriggerProps = {
  borderless: false,
  clearIcon: 'close-circle',
  size: 'md' as const,
  suffix: 'down',
  overlayMatchWidth: false,
}

export default defineComponent({
  name: 'IxControlTrigger',
  inheritAttrs: false,
  props: controlTriggerProps,
  setup(props, { attrs, expose, slots: _slots }) {
    const slots = _slots as ControlTriggerSlots
    const common = useGlobalConfig('common')
    const { globalHashId } = useThemeToken()
    const mergedPrefixCls = computed(() => `${common.prefixCls}-control-trigger`)
    const triggerRef = ref<ɵTriggerInstance>()

    const mergedControlProps = useMergedCommonControlProps(props, defaultTriggerProps)

    const onFocus = (evt: FocusEvent) => {
      callEmit(props.onFocus, evt)
      handleTriggerFocus(evt)
    }
    const onBlur = (evt: FocusEvent) => {
      setOverlayOpened(false)
      callEmit(props.onBlur, evt)
    }
    const { focused, triggerFocused, overlayFocused, focusVia, blurVia, bindOverlayMonitor, handleFocus, handleBlur } =
      useOverlayFocusMonitor(onFocus, onBlur)

    const { resetTriggerFocus, handleTriggerFocus } = useTriggerFocusState(triggerRef, triggerFocused)

    const { overlayOpened, overlayRef, overlayMatchWidth, overlayStyle, setOverlayOpened } = useOverlayState(
      props,
      defaultTriggerProps,
      triggerRef,
      focused,
      triggerFocused,
    )

    const focus = () => focusVia(triggerRef.value)
    const blur = () => blurVia(triggerRef.value)

    expose({
      focus,
      blur,
    })

    provide(controlTriggerToken, {
      props,
      mergedPrefixCls,
      overlayFocused,
      resetTriggerFocus,
      bindOverlayMonitor,
    })

    const handleClear = (evt: MouseEvent) => {
      callEmit(props.onClear, evt)
    }
    const handleClick = (evt: Event) => {
      const target = evt.target

      if (
        !props.disabled &&
        !props.readonly &&
        !(overlayOpened.value && target instanceof HTMLInputElement && !target.readOnly && !target.disabled)
      ) {
        setOverlayOpened(!overlayOpened.value)
      }

      callEmit(props.onClick, evt)
    }
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (
        !overlayOpened.value &&
        !props.disabled &&
        !props.readonly &&
        !['Escape', 'Backspace', 'Tab'].includes(evt.code)
      ) {
        setOverlayOpened(true)
      } else if (overlayOpened.value && evt.code === 'Escape') {
        setOverlayOpened(false)
      }

      callEmit(props.onKeydown, evt)
    }

    const triggerProps = computed(() => {
      const { borderless, clearIcon, size, suffix } = mergedControlProps.value
      return {
        value: props.value,
        size,
        status: props.status,
        borderless,
        clearIcon,
        clearable: props.clearable,
        disabled: props.disabled,
        readonly: props.readonly,
        focused: focused.value,
        opened: overlayOpened.value,
        placeholder: props.placeholder,
        suffix,
        suffixRotate: props.suffixRotate ?? (overlayOpened.value ? 180 : 0),
        onClear: handleClear,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClick: handleClick,
        onKeydown: handleKeyDown,
      }
    })
    const overlayClasses = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-match-width`]: overlayMatchWidth.value === true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderTriggerContent: ɵTriggerSlots['default'] = params => {
      const triggerDefaultSlot = slots.trigger ?? slots.default

      return triggerDefaultSlot?.({ ...params, opened: overlayOpened.value }) ?? []
    }

    const renderTrigger = () => {
      const triggerSlots: ɵTriggerSlots = {
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
        default: renderTriggerContent,
      }

      return (
        <ɵTrigger
          class={mergedPrefixCls.value}
          ref={triggerRef}
          v-slots={triggerSlots}
          {...triggerProps.value}
          {...attrs}
          raw={!!slots.trigger}
        />
      )
    }

    const renderContent = () => {
      return slots.overlay?.({
        opened: overlayOpened.value,
      })
    }

    return () => (
      <ControlTriggerOverlay
        ref={overlayRef}
        class={overlayClasses.value}
        style={overlayStyle.value}
        visible={overlayOpened.value}
        lazy={props.overlayLazy}
        tabindex={props.overlayTabindex}
        trigger="manual"
        onAfterLeave={props.onOverlayAfterLeave}
        v-slots={{ default: renderTrigger, content: renderContent }}
      />
    )
  },
})
