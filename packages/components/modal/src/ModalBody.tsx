import type { Slot, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, toRef } from 'vue'
import { isString } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { modalInnerToken } from './token'

// staticIcons.ts
const iconMap = {
  confirm: 'question-circle-filled',
  info: 'info-circle-filled',
  success: 'check-circle-filled',
  warning: 'exclamation-circle-filled',
  error: 'close-circle-filled',
} as const

export default defineComponent({
  setup() {
    const { props, slots } = inject(modalInnerToken)!
    const isDefault = computed(() => props.type === 'default')
    const icon = computed(() => {
      const { icon, type } = props
      return icon ?? iconMap[type as keyof typeof iconMap]
    })

    return {
      slots,
      isDefault,
      icon,
      type: toRef(props, 'type'),
      title: toRef(props, 'title'),
    }
  },

  render() {
    if (this.isDefault) {
      return <div class="ix-modal-body">{this.slots.default?.()}</div>
    }
    const classes = `ix-modal-body ix-modal-body-${this.type}`
    const icon = renderIcon(this.slots.icon, this.icon)
    const title = renderTitle(this.slots.title, this.title)
    return (
      <div class={classes}>
        {icon}
        <div class="ix-modal-body-content">
          {title}
          {this.slots.default?.()}
        </div>
      </div>
    )
  },
})

const renderIcon = (iconSlot: Slot | undefined, icon: string | VNode | undefined) => {
  if (!iconSlot && !icon) {
    return null
  }
  let child: VNodeTypes
  if (iconSlot) {
    child = iconSlot()
  } else {
    child = isString(icon) ? <IxIcon name={icon}></IxIcon> : icon!
  }
  return <div class="ix-modal-body-icon">{child}</div>
}

const renderTitle = (titleSlot: Slot | undefined, title: string | VNode | undefined) => {
  if (!titleSlot && !title) {
    return null
  }
  const child = titleSlot ? titleSlot() : title
  return <div class="ix-modal-body-title">{child}</div>
}
