import { computed, defineComponent, inject, toRef } from 'vue'
import { isString, toArray } from '@idux/cdk/utils'
import { IxHeader } from '@idux/components/header'
import { modalToken, MODAL_TOKEN } from './token'

export default defineComponent({
  setup() {
    const { props, slots, config } = inject(modalToken)!
    const { close } = inject(MODAL_TOKEN)!
    const closable = computed(() => props.closable ?? config.closable)
    const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)

    const onClose = async (evt: Event) => {
      if (closable.value) {
        close(evt)
      }
    }

    return {
      closable,
      closeIcon,
      onClose,
      closeIconSlot: toRef(slots, 'closeIcon'),
      header: toRef(props, 'header'),
      headerSlot: toRef(slots, 'header'),
    }
  },

  render() {
    const { headerSlot, closable, closeIcon, onClose, closeIconSlot, header } = this

    if (headerSlot) {
      return headerSlot({ closable, closeIcon, onClose })
    }

    if (!header && !closable && !closeIconSlot) {
      return null
    }

    const headerProps = isString(header) ? { title: header } : header || {}

    if (closeIconSlot) {
      const slots = { extra: () => closeIconSlot({ onClose }) }
      return <IxHeader {...headerProps} v-slots={slots}></IxHeader>
    }

    if (closable) {
      headerProps.extra = headerProps.extra ?? closeIcon

      const onExtraClick = toArray(headerProps.onExtraClick)
      onExtraClick.push(onClose)
      headerProps.onExtraClick = onExtraClick
    }

    return <IxHeader {...headerProps}></IxHeader>
  },
})
