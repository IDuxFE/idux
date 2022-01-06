/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FooterButtonProps } from './types'
import type { VNodeTypes } from 'vue'

import { computed, defineComponent, isVNode } from 'vue'

import { IxButton } from '@idux/components/button'

import { footerProps } from './types'

export default defineComponent({
  props: footerProps,
  setup(props, { slots }) {
    const cancelButtonProps = computed<FooterButtonProps | undefined>(() => {
      const { cancel, cancelButton, cancelVisible, cancelLoading, cancelText } = props
      if (!cancelVisible || (!cancel && !cancelText && !cancelButton)) {
        return undefined
      }
      return {
        key: '__IDUX_FOOTER_BUTTON_CANCEL',
        text: cancelText,
        onClick: cancel,
        loading: cancelLoading,
        ...cancelButton,
      }
    })

    const okButtonProps = computed<FooterButtonProps | undefined>(() => {
      const { ok, okButton, okLoading, okText } = props
      if (!ok && !okText && !okButton) {
        return undefined
      }
      return {
        key: '__IDUX_FOOTER_BUTTON_OK',
        text: okText,
        onClick: ok,
        loading: okLoading,
        mode: cancelButtonProps.value ? 'primary' : 'default',
        ...okButton,
      }
    })

    return () => {
      const footerProp = props.footer
      const footerSlot = slots.footer
      if (!footerProp && !footerSlot) {
        return undefined
      }

      let children: VNodeTypes
      if (footerSlot) {
        children = footerSlot(props)
      } else if (isVNode(footerProp)) {
        children = footerProp
      } else {
        let buttonProps = footerProp
        if (!Array.isArray(buttonProps)) {
          const cancelButton = cancelButtonProps.value
          const okButton = okButtonProps.value
          buttonProps = []
          cancelButton && buttonProps.push(cancelButton)
          okButton && buttonProps.push(okButton)
        }
        children = buttonProps.map(item => {
          const { text, ...rest } = item
          return <IxButton {...rest}>{text}</IxButton>
        })
      }

      return <div>{children}</div>
    }
  },
})
