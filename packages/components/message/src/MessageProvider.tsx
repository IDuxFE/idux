/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MessageOptions, MessageRef } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, VNode } from 'vue'

import { TransitionGroup, computed, defineComponent, provide, ref } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { callEmit, convertArray, convertCssPixel, uniqueId } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import Message from './Message'
import { messageProviderToken } from './token'
import { messageProviderProps } from './types'

export default defineComponent({
  name: 'IxMessageProvider',
  inheritAttrs: false,
  props: messageProviderProps,
  setup(props, { expose, slots, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message-provider`)
    const config = useGlobalConfig('message')
    const style = computed(() => ({ top: convertCssPixel(props.top ?? config.top) }))
    const maxCount = computed(() => props.maxCount ?? config.maxCount)
    const { messages, loadContainer, open, info, success, warning, error, loading, update, destroy, destroyAll } =
      useMessage(maxCount, mergedPrefixCls)

    const apis = { open, info, success, warning, error, loading, update, destroy, destroyAll }

    provide(messageProviderToken, apis)
    expose(apis)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const child = messages.value.map(item => {
        // The default value for `visible` is true, onDestroy should not be passed in Message
        const { key, content, visible = true, onDestroy, ...restProps } = item
        const onClose = () => destroy(key!)
        const mergedProps = { key, visible, onClose }
        return (
          <Message {...mergedProps} {...restProps}>
            {content}
          </Message>
        )
      })

      return (
        <>
          {slots.default?.()}
          <CdkPortal target={`${prefixCls}-container`} load={loadContainer.value}>
            <TransitionGroup tag="div" name="ix-move-up" class={`${prefixCls}-wrapper`} style={style.value} {...attrs}>
              {child}
            </TransitionGroup>
          </CdkPortal>
        </>
      )
    }
  },
})

const useMessage = (maxCount: ComputedRef<number>, mergedPrefixCls: ComputedRef<string>) => {
  const prefixCls = mergedPrefixCls.value
  const messages = ref<MessageOptions[]>([])

  const getCurrIndex = (key: VKey) => {
    return messages.value.findIndex(message => message.key === key)
  }

  const add = (item: MessageOptions) => {
    const currIndex = item.key ? getCurrIndex(item.key) : -1
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item)
      return item.key!
    }

    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1)
    }

    const key = item.key ?? uniqueId(`${prefixCls}`)
    messages.value.push({ ...item, key })
    return key
  }

  const update = (key: VKey, item: MessageOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const newItem = { ...messages.value[currIndex], ...item }
      messages.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (key: VKey | VKey[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const item = messages.value.splice(currIndex, 1)
        callEmit(item[0].onDestroy, key)
      }
    })
  }

  const destroyAll = () => {
    messages.value = []
  }

  const loadContainer = ref(false)

  const open = (options: MessageOptions): MessageRef => {
    const key = add(options)
    const ref = {
      key,
      update: (options: MessageOptions) => update(key, options),
      destroy: () => destroy(key),
    }
    if (!loadContainer.value) {
      loadContainer.value = true
    }
    return ref
  }

  const messageTypes = ['info', 'success', 'warning', 'error', 'loading'] as const
  const [info, success, warning, error, loading] = messageTypes.map(type => {
    return (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) =>
      open({ ...options, content, type })
  })

  return { messages, loadContainer, open, info, success, warning, error, loading, update, destroy, destroyAll }
}
