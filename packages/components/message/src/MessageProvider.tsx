/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  TransitionGroup,
  type VNode,
  type VNodeChild,
  computed,
  defineComponent,
  provide,
  ref,
} from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { VKey, callEmit, convertArray, convertCssPixel, uniqueId } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { convertStringVNode, usePortalTarget } from '@idux/components/utils'

import Message from './Message'
import { MESSAGE_PROVIDER_TOKEN } from './token'
import { type MessageOptions, type MessageRef, messageProviderProps } from './types'
import { getThemeTokens, transforms } from '../theme'

export default defineComponent({
  name: 'IxMessageProvider',
  inheritAttrs: false,
  props: messageProviderProps,
  setup(props, { expose, slots, attrs }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('message')
    registerToken(getThemeTokens, transforms)

    const config = useGlobalConfig('message')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message`)
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls)

    const style = computed(() => ({ top: convertCssPixel(props.top ?? config.top) }))
    const maxCount = computed(() => props.maxCount ?? config.maxCount)
    const { messages, loadContainer, open, info, success, warning, error, loading, update, destroy, destroyAll } =
      useMessage(maxCount)

    const apis = { open, info, success, warning, error, loading, update, destroy, destroyAll }

    provide(MESSAGE_PROVIDER_TOKEN, apis)
    expose(apis)

    return () => {
      const child = messages.value.map(item => {
        // The default value for `visible` is true, onDestroy should not be passed in Message
        const { key, content, visible = true, onDestroy, ...restProps } = item
        const onClose = () => destroy(key!)
        const mergedProps = { key, visible, onClose }
        const contentNode = convertStringVNode(undefined, content)
        return (
          <Message {...mergedProps} {...restProps}>
            {contentNode}
          </Message>
        )
      })

      return (
        <>
          {slots.default?.()}
          <CdkPortal target={mergedPortalTarget.value} load={loadContainer.value}>
            <TransitionGroup
              tag="div"
              appear
              name={`${common.prefixCls}-move-up`}
              class={[`${mergedPrefixCls.value}-wrapper`, globalHashId.value, hashId.value]}
              style={style.value}
              {...attrs}
            >
              {child}
            </TransitionGroup>
          </CdkPortal>
        </>
      )
    }
  },
})

const useMessage = (maxCount: ComputedRef<number>) => {
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

    const key = item.key ?? uniqueId('ix-message')
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
    return (content: string | VNode | (() => VNodeChild), options?: Omit<MessageOptions, 'type' | 'content'>) =>
      open({ ...options, content, type })
  })

  return { messages, loadContainer, open, info, success, warning, error, loading, update, destroy, destroyAll }
}
