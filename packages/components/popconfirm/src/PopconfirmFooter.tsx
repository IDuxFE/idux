/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmButtonProps } from './types'
import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject, isVNode } from 'vue'

import { IxButton } from '@idux/components/button'
import { getLocale } from '@idux/components/i18n'

import { popconfirmToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, mergedPrefixCls, cancelLoading, okLoading, cancel, ok } = inject(popconfirmToken)!
    const locale = getLocale('popconfirm')

    const cancelText = computed(() => props.cancelText ?? locale.value.cancelText)
    const okText = computed(() => props.okText ?? locale.value.okText)

    const okButtonProps = computed<PopconfirmButtonProps>(() => {
      return {
        text: okText.value,
        onClick: ok,
        loading: okLoading.value,
        mode: 'primary',
        ...props.okButton,
      }
    })

    const cancelButtonProps = computed<PopconfirmButtonProps>(() => {
      return {
        text: cancelText.value,
        onClick: cancel,
        loading: cancelLoading.value,
        ...props.cancelButton,
      }
    })

    return () => {
      const { footer } = props
      if (footer === false) {
        return null
      }

      let children: VNodeTypes
      if (slots.footer) {
        children = slots.footer({ cancel, cancelLoading, ok, okLoading })
      } else if (isVNode(footer)) {
        children = footer
      } else {
        let buttonProps = footer
        if (!Array.isArray(buttonProps)) {
          buttonProps = [cancelButtonProps.value, okButtonProps.value]
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
