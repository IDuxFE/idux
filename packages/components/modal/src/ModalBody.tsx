/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Slot, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

import { modalToken } from './token'

// staticIcons.ts
const defaultIconTypes = {
  default: '',
  confirm: 'question-circle-filled',
  info: 'info-circle-filled',
  success: 'check-circle-filled',
  warning: 'exclamation-circle-filled',
  error: 'close-circle-filled',
} as const

export default defineComponent({
  setup() {
    const { props, slots, config, mergedPrefixCls } = inject(modalToken)!
    const isDefault = computed(() => props.type === 'default')
    const iconName = computed(() => {
      const { icon, type } = props
      return icon ?? config.icon?.[type] ?? defaultIconTypes[type]
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-body`
      const defaultNode = slots.default?.() ?? props.__content_node

      if (isDefault.value) {
        return <div class={prefixCls}>{defaultNode}</div>
      }
      const classes = `${prefixCls} ${prefixCls}-${props.type}`
      const iconNode = renderIcon(prefixCls, slots.icon, iconName.value)
      const titleNode = renderTitle(prefixCls, slots.title, props.title)
      return (
        <div class={classes}>
          {iconNode}
          <div class={[`${prefixCls}-content`, defaultNode ? '' : `${prefixCls}-content-only-title`]}>
            {titleNode}
            {defaultNode}
          </div>
        </div>
      )
    }
  },
})

const renderIcon = (prefixCls: string, iconSlot: Slot | undefined, icon: string | VNode | undefined) => {
  if (!iconSlot && !icon) {
    return null
  }
  let children: VNodeTypes
  if (iconSlot) {
    children = iconSlot()
  } else {
    children = isString(icon) ? <IxIcon name={icon}></IxIcon> : icon!
  }
  return <div class={`${prefixCls}-icon`}>{children}</div>
}

const renderTitle = (prefixCls: string, titleSlot: Slot | undefined, title: string | VNode | undefined) => {
  if (!titleSlot && !title) {
    return null
  }
  const children = titleSlot ? titleSlot() : title
  return <div class={`${prefixCls}-title`}>{children}</div>
}
