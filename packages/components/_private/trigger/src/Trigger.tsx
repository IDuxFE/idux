/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { isArray, isNil, toString } from 'lodash-es'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { callEmit, isEmptyNode, isFocusable, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import ProxyNode from './ProxyNode'
import { type TriggerSlots, triggerProps } from './types'

const hiddenBoxStyle = { width: 0, height: 0, position: 'absolute' as const, overflow: 'hidden', opacity: 0 }

export default defineComponent({
  props: triggerProps,
  setup(props, { expose, slots: _slots }) {
    const slots = _slots as TriggerSlots
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-trigger`)
    const ariaLivePoliteValue = computed(() => (isArray(props.value) ? props.value.join(',') : toString(props.value)))
    const mergedClearable = computed(() => {
      return (
        !props.disabled &&
        !props.readonly &&
        props.clearable &&
        (isArray(props.value) ? !!props.value.length : !isNil(props.value))
      )
    })
    const [focused, setFocused] = useState(false)
    const mergedFocused = computed(() => props.focused ?? focused.value)

    const focusMonitor = useSharedFocusMonitor()
    const triggerRef = ref<HTMLElement>()

    const focus = (options?: FocusOptions) => focusMonitor.focusVia(triggerRef.value, 'program', options)
    const blur = () => focusMonitor.blurVia(triggerRef.value)

    expose({ focus, blur })

    let monitorStop: (() => void) | undefined

    const initMonitor = () => {
      monitorStop?.()
      if (props.monitorFocus) {
        monitorStop = watch(focusMonitor.monitor(triggerRef.value!, true), evt => {
          const { origin, event } = evt
          if (event) {
            if (origin) {
              setFocused(true)
              callEmit(props.onFocus, event)
            } else {
              setFocused(false)
              callEmit(props.onBlur, event)
            }
          }
        })
      }
    }
    onMounted(() => {
      watch(() => props.monitorFocus, initMonitor, {
        immediate: true,
      })
    })

    onBeforeUnmount(() => {
      monitorStop?.()
      focusMonitor.stopMonitoring(triggerRef.value!)
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { size, status, borderless, paddingless, disabled, readonly, raw } = props

      if (raw) {
        return
      }

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-paddingless`]: paddingless,
        [`${prefixCls}-with-suffix`]: slots.suffix || props.suffix || mergedClearable.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: mergedFocused.value,
        [`${prefixCls}-readonly`]: readonly,
      })
    })

    const handleMouseDown = (evt: MouseEvent) => {
      if (isFocusable(evt.target)) {
        return
      }

      const { disabled, readonly } = props
      if (disabled || readonly || props.focused) {
        evt.preventDefault()
      }
    }

    const handleClear = (evt: MouseEvent) => {
      if (props.disabled) {
        return
      }

      evt.stopPropagation()
      callEmit(props.onClear, evt)
    }
    const renderSuffix = () => {
      if (!(slots.suffix || props.suffix)) {
        return null
      }

      return (
        <div key="__suffix" class={`${mergedPrefixCls.value}-suffix`}>
          {slots.suffix?.() ?? (props.suffix && <IxIcon rotate={props.suffixRotate} name={props.suffix}></IxIcon>)}
        </div>
      )
    }
    const renderClearIcon = () => {
      if (!mergedClearable.value) {
        return null
      }

      return (
        <span key="__clear" class={`${mergedPrefixCls.value}-clear-icon`} onClick={handleClear}>
          {slots.clearIcon ? slots.clearIcon() : props.clearIcon && <IxIcon name={props.clearIcon}></IxIcon>}
        </span>
      )
    }

    return () => {
      const {
        value,
        borderless,
        disabled,
        readonly,
        raw,
        size,
        status,
        suffix,
        suffixRotate,
        clearIcon,
        ariaControls,
      } = props
      const defaultSlotParams = {
        value,
        borderless: !!borderless,
        disabled: !!disabled,
        readonly: !!readonly,
        focused: mergedFocused.value,
        size,
        status,
        suffix,
        suffixRotate,
        clearable: !!mergedClearable.value,
        clearIcon: clearIcon || 'close-circle',
        ariaControls: ariaControls || '',
      }

      const defaultSlotNodes = slots.default?.(defaultSlotParams)

      if (raw && defaultSlotNodes?.length === 1) {
        const node = defaultSlotNodes[0]
        if (ariaControls) {
          node.props = { ...node.props, 'aria-controls': ariaControls }
        }

        return <ProxyNode ref={triggerRef}>{node}</ProxyNode>
      }

      const defaultSlotEmpty = isEmptyNode(defaultSlotNodes)

      return (
        <div
          ref={triggerRef}
          class={classes.value}
          tabindex={-1}
          onMousedown={handleMouseDown}
          aria-controls={ariaControls}
        >
          {props.focused && (
            <span style={hiddenBoxStyle} aria-live="polite">
              {ariaLivePoliteValue.value}
            </span>
          )}
          {defaultSlotEmpty ? (
            <span class={`${mergedPrefixCls.value}-placeholder`}>{slots.placeholder?.() ?? props.placeholder}</span>
          ) : (
            defaultSlotNodes
          )}
          {!raw && renderSuffix()}
          {!raw && renderClearIcon()}
        </div>
      )
    }
  },
})
