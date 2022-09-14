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
      const iconNode = slots.icon ? slots.icon() : props.icon ? <IxIcon name={props.icon}></IxIcon> : undefined
      const titleNode = slots.title ? slots.title() : props.title
      const contentNode = slots.content ? slots.content() : props.content
      return (
        <div class={`${prefixCls}-wrapper`}>
          {(iconNode || titleNode) && (
            <div class={`${prefixCls}-title`}>
              {iconNode}
              <span>{titleNode}</span>
            </div>
          )}
          {contentNode && <div class={`${prefixCls}-content`}>{contentNode}</div>}
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
