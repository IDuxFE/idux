/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmButtonProps } from './types'
import type { VNode } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { ɵFooter } from '@idux/components/_private'
import { getLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'

import { popconfirmToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, mergedPrefixCls, cancelLoading, okLoading, cancel, ok } = inject(popconfirmToken)!
    const locale = getLocale('popconfirm')

    const cancelText = computed(() => props.cancelText ?? locale.value.cancelText)
    const okText = computed(() => props.okText ?? locale.value.okText)

    const cancelButton = computed<PopconfirmButtonProps>(() => {
      return { size: 'sm', ...props.cancelButton }
    })

    const okButton = computed<PopconfirmButtonProps>(() => {
      return { size: 'sm', ...props.okButton }
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const children: VNode[] = []
      if (slots.title || props.title) {
        children.push()
      }

      return (
        <div class={`${prefixCls}-wrapper`}>
          <div class={`${prefixCls}-title`}>
            {slots.icon?.() ?? <IxIcon name={props.icon}></IxIcon>}
            <span>{slots.title?.() ?? props.title}</span>
          </div>
          <ɵFooter
            v-slots={slots}
            class={`${prefixCls}-footer`}
            cancel={cancel}
            cancelButton={cancelButton.value}
            cancelLoading={cancelLoading.value}
            cancelText={cancelText.value}
            footer={props.footer}
            ok={ok}
            okButton={okButton.value}
            okLoading={okLoading.value}
            okText={okText.value}
          />
        </div>
      )
    }
  },
})
