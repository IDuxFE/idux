/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onMounted, ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { baseTriggerProps } from '../types'

export default defineComponent({
  name: 'IxTimePickerBaseTrigger',
  props: baseTriggerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker-trigger`)

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

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-borderless`]: props.borderless,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-focused`]: props.focused,
        [`${prefixCls}-${props.size}`]: props.size,
      })
    })

    const handkeClick = (evt: Event) => {
      if (isDisabled.value) {
        return
      }

      callEmit(props.onClick, evt)
    }

    const onClear = (evt: MouseEvent) => {
      evt.stopPropagation()
      callEmit(props.onClear, evt)
    }
    const renderSuffix = () => {
      if (!(props.clearable || slots.clearIcon || props.suffix)) {
        return null
      }

      return (
        <div class={`${mergedPrefixCls.value}-suffix`}>
          {slots.suffix?.() ?? (props.suffix && <IxIcon name={props.suffix}></IxIcon>)}
        </div>
      )
    }
    const renderClearIcon = () => {
      if (!props.clearable || isDisabled.value) {
        return null
      }

      return (
        <span class={`${mergedPrefixCls.value}-clear-icon`} onClick={onClear}>
          {slots.clearIcon ? slots.clearIcon() : props.clearIcon && <IxIcon name={props.clearIcon}></IxIcon>}
        </span>
      )
    }

    return () => (
      <div ref={triggerRef} class={classes.value} onClick={handkeClick}>
        {slots.default?.()}
        {renderSuffix()}
        {renderClearIcon()}
      </div>
    )
  },
})
