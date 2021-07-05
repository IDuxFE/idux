import { computed, defineComponent, inject, toRef } from 'vue'
import { isString, toArray } from '@idux/cdk/utils'
import { IxHeader } from '@idux/components/header'
import { modalInnerToken, modalToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, config } = inject(modalInnerToken)!
    const { close } = inject(modalToken)!
    const closable = computed(() => props.closable ?? config.closable)
    const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)

    const onClose = async (evt: Event, name: string) => {
      if (closable.value && closeIcon.value && closeIcon.value === name) {
        close(evt)
      }
    }

    return {
      closable,
      closeIcon,
      onClose,
      header: toRef(props, 'header'),
      headerSlot: toRef(slots, 'header'),
    }
  },

  render() {
    const { headerSlot, closable, closeIcon, onClose, header } = this

    if (headerSlot) {
      return headerSlot({ closable, closeIcon, onClose })
    }

    if (!header && !closable) {
      return null
    }

    const headerProps = isString(header) ? { title: header } : header || {}
    if (closable) {
      const extras = toArray(headerProps.extra)
      extras.push(closeIcon)
      headerProps.extra = extras

      const onExtraClick = toArray(headerProps.onExtraClick)
      onExtraClick.push(onClose)
      headerProps.onExtraClick = onExtraClick
    }

    return <IxHeader {...headerProps}></IxHeader>
  },
})
