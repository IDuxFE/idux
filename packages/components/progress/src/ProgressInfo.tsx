/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNode, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

import { useIcons } from './composables/useIcons'
import { useInfo } from './composables/useInfo'
import { progressContext } from './tokens'

export default defineComponent({
  setup() {
    const { props, config, slots, mergedPrefixCls, status, percent, formattedSuccess } = inject(progressContext)!
    const { formattedText, showSuccessIcon, showExceptionIcon, showFormat } = useInfo(
      props,
      config,
      status,
      percent,
      formattedSuccess,
    )

    const icons = useIcons(props, config)

    const renderInfo = () => {
      if (showFormat.value) {
        return formattedText.value
      }

      const prefixCls = mergedPrefixCls.value

      if (showSuccessIcon.value) {
        return renderIcon(icons.value.success, `${prefixCls}-success-icon`)
      }

      if (showExceptionIcon.value) {
        return renderIcon(icons.value.exception, `${prefixCls}-exception-icon`)
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
          {slot ? slot({ percent: percent.value, successPercent: formattedSuccess.value.percent }) : renderInfo()}
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
