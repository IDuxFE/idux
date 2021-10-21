/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalButtonProps } from './types'
import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject, isVNode } from 'vue'

import { IxButton } from '@idux/components/button'
import { getLocale } from '@idux/components/i18n'

import { MODAL_TOKEN, modalToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, mergedPrefixCls, cancelLoading, okLoading } = inject(modalToken)!
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

    const okButtonProps = computed<ModalButtonProps>(() => {
      return {
        text: okText.value,
        onClick: ok,
        loading: okLoading.value,
        mode: 'primary',
        ...props.okButton,
      }
    })

    const cancelButtonProps = computed<ModalButtonProps>(() => {
      return {
        text: cancelText.value,
        onClick: cancel,
        loading: cancelLoading.value,
        ...props.cancelButton,
      }
    })

    return () => {
      const { footer } = props
      if (footer === null) {
        return null
      }

      let children: VNodeTypes
      if (slots.footer) {
        children = slots.footer({ cancel, cancelLoading, ok, okLoading })
      } else if (isVNode(footer)) {
        children = footer
      } else {
        let buttonProps = footer
        if (!buttonProps) {
          buttonProps = [okButtonProps.value]
          if (cancelVisible.value) {
            buttonProps.unshift(cancelButtonProps.value)
          }
        }
        children = buttonProps.map(item => {
          const { text, ...rest } = item
          return <IxButton {...rest}>{text}</IxButton>
        })
      }

      return <div class={`${mergedPrefixCls.value}-footer`}>{children}</div>
    }
  },
})
