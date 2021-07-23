import type { Slot, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'
import { isString } from '@idux/cdk/utils'
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
    const { props, slots, config } = inject(modalToken)!
    const isDefault = computed(() => props.type === 'default')
    const iconName = computed(() => {
      const { icon, type } = props
      return icon ?? config.icon?.[type] ?? defaultIconTypes[type]
    })

    return () => {
      if (isDefault.value) {
        return <div class="ix-modal-body">{slots.default?.()}</div>
      }
      const classes = `ix-modal-body ix-modal-body-${props.type}`
      const icon = renderIcon(slots.icon, iconName.value)
      const title = renderTitle(slots.title, props.title)
      return (
        <div class={classes}>
          {icon}
          <div class="ix-modal-body-content">
            {title}
            {slots.default?.()}
          </div>
        </div>
      )
    }
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
