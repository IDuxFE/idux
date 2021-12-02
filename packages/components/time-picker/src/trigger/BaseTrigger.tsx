/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { baseTriggerProps } from '../types'

export default defineComponent({
  name: 'IxTimePickerTrigger',
  props: baseTriggerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker-trigger`)

    const isDisabled = computed(() => props.disabled)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
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

      if (props.clearable && !isDisabled.value) {
        return (
          <span class={`${mergedPrefixCls.value}-clear-icon`}>
            {slots.clearIcon?.({ onClear }) ?? <IxIcon name={props.clearIcon} onClick={onClear}></IxIcon>}
          </span>
        )
      }

      return slots.suffix?.() ?? <IxIcon name={props.suffix}></IxIcon>
    }

    return () => (
      <div class={classes.value} onClick={handkeClick}>
        {slots.default?.()}
        <div class={`${mergedPrefixCls.value}-suffix`}>{renderSuffix()}</div>
      </div>
    )
  },
})
