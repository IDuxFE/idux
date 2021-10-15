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
    const { props, slots, config, prefixCls } = inject(modalToken)!
    const isDefault = computed(() => props.type === 'default')
    const iconName = computed(() => {
      const { icon, type } = props
      return icon ?? config.icon?.[type] ?? defaultIconTypes[type]
    })

    return () => {
      const _prefixCls = `${prefixCls.value}-body`
      if (isDefault.value) {
        return <div class={_prefixCls}>{slots.default?.()}</div>
      }
      const classes = `${_prefixCls} ${_prefixCls}-${props.type}`
      const iconNode = renderIcon(_prefixCls, slots.icon, iconName.value)
      const titleNode = renderTitle(_prefixCls, slots.title, props.title)
      return (
        <div class={classes}>
          {iconNode}
          <div class={`${_prefixCls}-content`}>
            {titleNode}
            {slots.default?.()}
          </div>
        </div>
      )
    }
  },
})

const renderIcon = (_prefixCls: string, iconSlot: Slot | undefined, icon: string | VNode | undefined) => {
  if (!iconSlot && !icon) {
    return null
  }
  let children: VNodeTypes
  if (iconSlot) {
    children = iconSlot()
  } else {
    children = isString(icon) ? <IxIcon name={icon}></IxIcon> : icon!
  }
  return <div class={`${_prefixCls}-icon`}>{children}</div>
}

const renderTitle = (_prefixCls: string, titleSlot: Slot | undefined, title: string | VNode | undefined) => {
  if (!titleSlot && !title) {
    return null
  }
  const children = titleSlot ? titleSlot() : title
  return <div class={`${_prefixCls}-title`}>{children}</div>
}
