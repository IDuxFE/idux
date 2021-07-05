import type { VNodeTypes } from 'vue'
import type { ModalButtonProps } from './types'

import { computed, defineComponent, inject, isVNode, toRef } from 'vue'
import { IxButton } from '@idux/components/button'
import { getLocale } from '@idux/components/i18n'
import { modalInnerToken, modalToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, cancelLoading, okLoading } = inject(modalInnerToken)!
    const { cancel, ok } = inject(modalToken)!
    const locale = getLocale('modal')

    const cancelVisible = computed(() => props.type === 'default' || props.type === 'confirm')

    const cancelText = computed(() => props.cancelText ?? locale.value.cancelText)
    const okText = computed(() => {
      if (props.okText) {
        return props.okText
      }
      return cancelVisible.value ? locale.value.okText : locale.value.justOkText
    })

    return {
      cancelVisible,
      cancelText,
      cancelLoading,
      okText,
      okLoading,
      cancel,
      ok,
      footer: toRef(props, 'footer'),
      cancelButton: toRef(props, 'cancelButton'),
      okButton: toRef(props, 'okButton'),
      footerSlot: toRef(slots, 'footer'),
    }
  },

  render() {
    const { footerSlot, footer, cancel, cancelLoading, ok, okLoading } = this
    if (!footerSlot && footer === null) {
      return null
    }

    let childNode: VNodeTypes

    if (footerSlot) {
      childNode = footerSlot({ cancel, cancelLoading, ok, okLoading })
    } else if (isVNode(footer)) {
      childNode = footer
    } else {
      let buttonProps = footer

      if (!buttonProps) {
        const cancelButton: ModalButtonProps = {
          text: this.cancelText,
          visible: this.cancelVisible,
          onClick: cancel,
          loading: cancelLoading,
          ...this.cancelButton,
        }
        const okButton: ModalButtonProps = {
          text: this.okText,
          onClick: ok,
          loading: okLoading,
          mode: 'primary',
          ...this.okButton,
        }
        buttonProps = [cancelButton, okButton]
      }

      childNode = buttonProps.map(item => {
        // The default value for `visible` is true
        const { text, visible = true, ...rest } = item
        return visible ? <IxButton {...rest}>{text}</IxButton> : null
      })
    }

    return <div class="ix-modal-footer">{childNode}</div>
  },
})
