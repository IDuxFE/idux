import type { ComputedRef, Ref, VNodeTypes } from 'vue'
import type { ModalButtonProps } from './types'

import { computed, defineComponent, inject, isVNode } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { ButtonProps, IxButton } from '@idux/components/button'
import { getLocale } from '@idux/components/i18n'
import { modalToken, MODAL_TOKEN } from './token'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')

    const { props, slots, cancelLoading, okLoading } = inject(modalToken)!
    const { cancel, ok } = inject(MODAL_TOKEN)!
    const locale = getLocale('modal')

    const cancelVisible = computed(() => props.type === 'default' || props.type === 'confirm')

    const cancelText = computed(() => props.cancelText ?? locale.value.cancelText)
    const okText = computed(() => {
      if (props.okText) {
        return props.okText
      }
      return cancelVisible.value ? locale.value.okText : locale.value.justOkText
    })

    return () => {
      const { footer, cancelButton, okButton } = props
      if (!slots.footer && footer === null) {
        return null
      }

      let childNode: VNodeTypes

      if (slots.footer) {
        childNode = slots.footer({ cancel, cancelLoading, ok, okLoading })
      } else if (isVNode(footer)) {
        childNode = footer
      } else {
        childNode = useButtons(
          footer,
          cancelText,
          cancelVisible,
          cancel,
          cancelLoading,
          cancelButton,
          okText,
          ok,
          okLoading,
          okButton,
        )
      }

      return <div class={`${prefixCls}-modal-footer`}>{childNode}</div>
    }
  },
})

const useButtons = (
  footer: ModalButtonProps[] | null | undefined,
  cancelText: ComputedRef<string>,
  cancelVisible: ComputedRef<boolean>,
  cancel: (evt?: unknown) => Promise<void>,
  cancelLoading: Ref<boolean>,
  cancelButton: ButtonProps | undefined,
  okText: ComputedRef<string>,
  ok: (evt?: unknown) => Promise<void>,
  okLoading: Ref<boolean>,
  okButton: ButtonProps | undefined,
) => {
  let buttonProps = footer

  if (!buttonProps) {
    const _cancelButton: ModalButtonProps = {
      text: cancelText.value,
      visible: cancelVisible.value,
      onClick: cancel,
      loading: cancelLoading.value,
      ...cancelButton,
    }
    const _okButton: ModalButtonProps = {
      text: okText.value,
      onClick: ok,
      loading: okLoading.value,
      mode: 'primary',
      ...okButton,
    }
    buttonProps = [_cancelButton, _okButton]
  }

  return buttonProps.map(item => {
    // The default value for `visible` is true
    const { text, visible = true, ...rest } = item
    return visible ? <IxButton {...rest}>{text}</IxButton> : null
  })
}
