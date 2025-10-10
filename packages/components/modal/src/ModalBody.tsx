/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Slot, VNode, VNodeChild } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'
import { IxSpin } from '@idux/components/spin'

import { modalToken } from './token'

// staticIcons.ts
const defaultIconTypes = {
  default: '',
  confirm: 'exclamation-circle-filled',
  info: 'info-circle-filled',
  success: 'check-circle-filled',
  warning: 'exclamation-circle-filled',
  error: 'close-circle-filled',
} as const

export default defineComponent({
  setup() {
    const { props, slots, config, mergedPrefixCls, mergedSpin, mergedSpinWithFullModal } = inject(modalToken)!
    const isDefault = computed(() => props.type === 'default')
    const iconName = computed(() => {
      const { icon, type } = props
      return icon ?? config.icon?.[type] ?? defaultIconTypes[type]
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-body`
      const defaultNode = slots.default?.() ?? props.__content_node

      let bodyNode: VNode

      if (isDefault.value) {
        bodyNode = <div class={prefixCls}>{defaultNode}</div>
      } else {
        const classes = `${prefixCls} ${prefixCls}-${props.type}`
        const iconNode = renderIcon(prefixCls, slots.icon, iconName.value)
        const titleNode = renderTitle(prefixCls, slots.title, props.title)

        bodyNode = (
          <div class={classes}>
            {iconNode}
            <div class={[`${prefixCls}-content`, defaultNode ? '' : `${prefixCls}-content-only-title`]}>
              {titleNode}
              {defaultNode}
            </div>
          </div>
        )
      }

      const spinProps = mergedSpin.value

      if (!mergedSpinWithFullModal.value && spinProps) {
        const spinSlots = {
          default: slots.spinContent ?? (() => bodyNode),
          icon: slots.spinIcon,
        }
        return <IxSpin v-slots={spinSlots} {...spinProps}></IxSpin>
      }

      return bodyNode
    }
  },
})

const renderIcon = (
  prefixCls: string,
  iconSlot: Slot | undefined,
  icon: string | VNode | (() => VNodeChild) | undefined,
) => {
  if (!iconSlot && !icon) {
    return null
  }
  let children: VNodeChild
  if (iconSlot) {
    children = iconSlot()
  } else if (isFunction(icon)) {
    children = icon()
  } else {
    children = isString(icon) ? <IxIcon name={icon}></IxIcon> : icon!
  }
  return <div class={`${prefixCls}-icon`}>{children}</div>
}

const renderTitle = (
  prefixCls: string,
  titleSlot: Slot | undefined,
  title: string | VNode | (() => VNodeChild) | undefined,
) => {
  if (!titleSlot && !title) {
    return null
  }

  let children: VNodeChild
  if (titleSlot) {
    children = titleSlot()
  } else if (isFunction(title)) {
    children = title()
  } else {
    children = title
  }

  return <div class={`${prefixCls}-title`}>{children}</div>
}
