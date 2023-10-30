/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { triggerProps } from './types'

export default defineComponent({
  props: triggerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-trigger`)

    const focusMonitor = useSharedFocusMonitor()
    const triggerRef = ref<HTMLElement>()
    onMounted(() => {
      watch(focusMonitor.monitor(triggerRef.value!, true), evt => {
        const { origin, event } = evt
        if (event) {
          if (origin) {
            callEmit(props.onFocus, event)
          } else {
            callEmit(props.onBlur, event)
          }
        }
      })
    })

    onBeforeUnmount(() => focusMonitor.stopMonitoring(triggerRef.value!))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { className, size, status, borderless, disabled, focused, readonly } = props
      return normalizeClass({
        [`${className}`]: !!className,
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-readonly`]: readonly,
      })
    })

    const handleClick = (evt: Event) => {
      if (props.disabled) {
        return
      }

      callEmit(props.onClick, evt)
    }
    const handleMouseDown = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLInputElement) {
        return
      }

      const { disabled, readonly } = props
      if (disabled || readonly || props.focused) {
        evt.preventDefault()
      }
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (props.disabled) {
        return
      }

      callEmit(props.onKeyDown, evt)
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
        <div class={`${mergedPrefixCls.value}-suffix`}>
          {slots.suffix?.() ?? (props.suffix && <IxIcon name={props.suffix}></IxIcon>)}
        </div>
      )
    }
    const renderClearIcon = () => {
      if (!props.clearable || props.disabled || (!props.clearIcon && !slots.clearIcon)) {
        return null
      }

      return (
        <span class={`${mergedPrefixCls.value}-clear-icon`} onClick={handleClear}>
          {slots.clearIcon ? slots.clearIcon() : props.clearIcon && <IxIcon name={props.clearIcon}></IxIcon>}
        </span>
      )
    }

    return () => (
      <div
        ref={triggerRef}
        class={classes.value}
        tabindex={-1}
        onClick={handleClick}
        onMousedown={handleMouseDown}
        onKeydown={handleKeyDown}
      >
        {slots.default?.()}
        {renderSuffix()}
        {renderClearIcon()}
      </div>
    )
  },
})
