/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'
import { IxIcon } from '@idux/components/icon'

import { popconfirmToken } from './token'
import { type PopconfirmButtonProps } from './types'

export default defineComponent({
  setup() {
    const { props, slots, locale, mergedPrefixCls, cancelLoading, okLoading, cancel, ok } = inject(popconfirmToken)!

    const cancelText = computed(() => props.cancelText ?? locale.popconfirm.cancelText)
    const okText = computed(() => props.okText ?? locale.popconfirm.okText)

    const cancelButton = computed<PopconfirmButtonProps>(() => {
      return { size: 'xs', ...props.cancelButton }
    })

    const okButton = computed<PopconfirmButtonProps>(() => {
      return { size: 'xs', ...props.okButton }
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={`${prefixCls}-wrapper`}>
          <div class={`${prefixCls}-title`}>
            {slots.icon ? slots.icon() : <IxIcon name={props.icon}></IxIcon>}
            <span>{slots.title ? slots.title() : props.title}</span>
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
