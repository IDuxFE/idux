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

    const isDisabled = computed(() => props.disabled)

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
      return normalizeClass({
        [`${props.className}`]: !!props.className,
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-borderless`]: props.borderless,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-focused`]: props.focused,
        [`${prefixCls}-${props.size}`]: props.size,
      })
    })

    const handleClick = (evt: Event) => {
      if (isDisabled.value) {
        return
      }

      callEmit(props.onClick, evt)
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (isDisabled.value) {
        return
      }

      callEmit(props.onKeyDown, evt)
    }

    const handleClear = (evt: MouseEvent) => {
      if (isDisabled.value) {
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
      if (!props.clearable || isDisabled.value || (!props.clearIcon && !slots.clearIcon)) {
        return null
      }

      return (
        <span class={`${mergedPrefixCls.value}-clear-icon`} onClick={handleClear}>
          {slots.clearIcon ? slots.clearIcon() : props.clearIcon && <IxIcon name={props.clearIcon}></IxIcon>}
        </span>
      )
    }

    return () => (
      <div ref={triggerRef} class={classes.value} onClick={handleClick} onKeydown={handleKeyDown}>
        {slots.default?.()}
        {renderSuffix()}
        {renderClearIcon()}
      </div>
    )
  },
})
