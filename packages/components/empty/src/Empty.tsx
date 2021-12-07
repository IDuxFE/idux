/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { EmptyProps } from './types'
import type { EmptyConfig } from '@idux/components/config'
import type { Slots } from 'vue'

import { computed, defineComponent } from 'vue'

import { isString } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'

import { emptyProps } from './types'

export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: emptyProps,
  setup(props, { slots }) {
    const emptyLocale = getLocale('empty')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-empty`)
    const config = useGlobalConfig('empty')
    const description = computed(() => props.description ?? emptyLocale.value.description)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const descriptionNode = slots.description?.() ?? description.value
      return (
        <div class={prefixCls}>
          <div class={`${prefixCls}-image`}>{renderImage(props, slots, config)}</div>
          {descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>}
          {slots.default && <div class={`${prefixCls}-content`}>{slots.default()}</div>}
        </div>
      )
    }
  },
})

function renderImage(props: EmptyProps, slots: Slots, config: EmptyConfig) {
  if (slots.image) {
    return slots.image()
  }
  const image = props.image ?? config.image
  if (image) {
    if (isString(image)) {
      return <img src={image} alt="empty image" />
    }
    return image
  }

  const icon = props.icon ?? config.icon
  return isString(icon) ? <IxIcon name={icon} /> : icon
}
