/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResultProps } from './types'
import type { ResultConfig } from '@idux/components/config'
import type { Ref, SetupContext, Slot, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent } from 'vue'

import { isString } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { resultProps } from './types'

const defaultIconMap = {
  success: 'check-circle-filled',
  error: 'close-circle-filled',
  info: 'info-circle-filled',
  warning: 'exclamation-circle-filled',
} as const

export default defineComponent({
  name: 'IxResult',
  components: { IxIcon },
  props: resultProps,
  setup(props, { slots }: SetupContext) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-result`)
    const resultConfig = useGlobalConfig('result')
    const className = useClassName(props, mergedPrefixCls, resultConfig)
    const currentIcon = useIcon(props, resultConfig)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { title, subtitle } = props

      return (
        <div class={className.value}>
          {renderIcon(prefixCls, slots.icon, currentIcon.value)}
          {renderSlottedNode(`${prefixCls}-title`, slots.title, title)}
          {renderSlottedNode(`${prefixCls}-subtitle`, slots.subtitle, subtitle)}
          {renderSlottedNode(`${prefixCls}-extra`, slots.extra)}
          {renderSlottedNode(`${prefixCls}-content`, slots.default)}
        </div>
      )
    }
  },
})

function renderSlottedNode(cls: string, slot: Slot | undefined, defaultContent?: VNodeTypes) {
  if (!slot && !defaultContent) {
    return null
  }

  const content = slot ? slot() : defaultContent
  return content ? <div class={cls}>{content}</div> : null
}

function renderIcon(prefixCls: string, iconSlot: Slot | undefined, icon: string | VNode | undefined) {
  const content = isString(icon) ? <IxIcon name={icon} /> : icon
  return renderSlottedNode(`${prefixCls}-icon`, iconSlot, content)
}

function useClassName(props: ResultProps, mergedPrefixCls: Ref<string>, config: ResultConfig) {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value
    const status = props.status ?? config.status

    return {
      [prefixCls]: true,
      [`${prefixCls}-${status}`]: !!status,
    }
  })
}

function useIcon(props: ResultProps, config: ResultConfig) {
  return computed(() => {
    const status = props.status ?? config.status
    return props.icon ?? config.icon?.[status] ?? defaultIconMap[status]
  })
}
