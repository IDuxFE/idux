import { MessageOptions, messageProviderProps, MessageRef } from './types'

import { defineComponent, ref, provide, TransitionGroup, computed, ComputedRef, VNode } from 'vue'
import { callEmit, convertArray, convertCssPixel, uniqueId } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import Message from './Message'
import { messageProviderToken } from './token'
import { IxPortal } from '@idux/cdk/portal'

export default defineComponent({
  name: 'IxMessageProvider',
  inheritAttrs: false,
  props: messageProviderProps,
  setup(props, { expose, slots, attrs }) {
    const config = useGlobalConfig('message')
    const style = computed(() => ({ top: convertCssPixel(props.top ?? config.top) }))
    const maxCount = computed(() => props.maxCount ?? config.maxCount)
    const { messages, loadContainer, apis } = useMessageApis(maxCount)

    provide(messageProviderToken, apis)
    expose(apis)

    return () => {
      const child = messages.value.map(item => {
        // The default value for `visible` is true
        const { key, content, visible = true, onDestroy, ...rest } = item
        const update = { 'onUpdate:visible': (visible: boolean) => !visible && apis.destroy(key!) }
        return (
          <Message key={key} {...rest} {...update} visible={visible}>
            {content}
          </Message>
        )
      })

      return (
        <>
          {slots.default?.()}
          <IxPortal target="ix-message-container" load={loadContainer.value}>
            <TransitionGroup tag="div" name="ix-move-up" class="ix-message-wrapper" style={style.value} {...attrs}>
              {child}
            </TransitionGroup>
          </IxPortal>
        </>
      )
    }
  },
})

const useMessage = (maxCount: ComputedRef<number>) => {
  const messages = ref<MessageOptions[]>([])

  const getCurrIndex = (key: string) => {
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

  const update = (key: string, item: MessageOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const newItem = { ...messages.value[currIndex], ...item }
      messages.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (key: string | string[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const item = messages.value.splice(currIndex, 1)
        callEmit(item[0].onDestroy)
      }
    })
  }

  const destroyAll = () => {
    messages.value = []
  }

  return { messages, add, update, destroy, destroyAll }
}

const useMessageApis = (maxCount: ComputedRef<number>) => {
  const { messages, add, update, destroy, destroyAll } = useMessage(maxCount)
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

  const apis = { open, info, success, warning, error, loading, update, destroy, destroyAll }

  return { messages, loadContainer, apis }
}
