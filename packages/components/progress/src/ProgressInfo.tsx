/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNode, computed, defineComponent, inject } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

import { progressContext } from './tokens'
import { fullPercent } from './util'

export default defineComponent({
  setup(_, { slots }) {
    const { props, config, mergedPrefixCls, status, percent, successPercent } = inject(progressContext)!

    const formatFn = computed(() => props.format ?? config.format)
    const formattedText = computed(() => formatFn.value(percent.value, successPercent.value))

    const showSuccessIcon = computed(
      () => status.value === 'success' || (status.value === 'normal' && percent.value === fullPercent),
    )
    const showExceptionIcon = computed(() => status.value === 'exception')
    const showFormat = computed(() => isFunction(props.format) || !(showSuccessIcon.value || showExceptionIcon.value))

    const mergedIconSuccess = computed(() => props.icons?.success ?? config.icon.success)
    const mergedIconException = computed(() => props.icons?.exception ?? config.icon.exception)

    const renderInfo = () => {
      if (showFormat.value) {
        return formattedText.value
      }

      const prefixCls = mergedPrefixCls.value

      if (showSuccessIcon.value && mergedIconSuccess.value) {
        return renderIcon(mergedIconSuccess.value, `${prefixCls}-success-icon`)
      }

      if (showExceptionIcon.value && mergedIconException.value) {
        return renderIcon(mergedIconException.value, `${prefixCls}-exception-icon`)
      }

      return null
    }

    return () => {
      if (props.hideInfo) {
        return null
      }
      const slot = slots.format ?? slots.default
      return (
        <div class={`${mergedPrefixCls.value}-info`}>
          {slot ? slot({ percent: percent.value, successPercent: successPercent.value }) : renderInfo()}
        </div>
      )
    }
  },
})

function renderIcon(icon: string | VNode, cls: string) {
  if (isString(icon)) {
    return <IxIcon class={cls} name={icon} />
  }

  return icon
}
