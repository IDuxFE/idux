import { MessageOptions, messageProviderProps, MessageRef } from './types'

import { defineComponent, ref, provide, TransitionGroup, computed, ComputedRef, VNode } from 'vue'
import { callEmit, toArray, toCssPixel, uniqueId } from '@idux/cdk/utils'
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
    const style = computed(() => ({ top: toCssPixel(props.top ?? config.top) }))
    const maxCount = computed(() => props.maxCount ?? config.maxCount)
    const { messages, loadContainer, apis } = useMessageApis(maxCount)

    provide(messageProviderToken, apis)
    expose(apis)

    return () => {
      const child = messages.value.map(item => {
        // The default value for `visible` is true
        const { id, content, visible = true, onDestroy, ...rest } = item
        const update = { 'onUpdate:visible': (visible: boolean) => !visible && apis.destroy(id!) }
        return (
          <Message {...rest} {...update} key={id} visible={visible}>
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

  const getCurrIndex = (id: string) => {
    return messages.value.findIndex(message => message.id === id)
  }

  const add = (item: MessageOptions) => {
    const currIndex = item.id ? getCurrIndex(item.id) : -1
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item)
      return item.id!
    }

    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1)
    }

    const id = item.id ?? uniqueId('ix-message')
    messages.value.push({ ...item, id })
    return id
  }

  const update = (id: string, item: MessageOptions) => {
    const currIndex = getCurrIndex(id)
    if (currIndex !== -1) {
      const newItem = { ...messages.value[currIndex], ...item }
      messages.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (id: string | string[]) => {
    const ids = toArray(id)
    ids.forEach(id => {
      const currIndex = getCurrIndex(id)
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
    const id = add(options)
    const ref = {
      id,
      update: (options: MessageOptions) => update(id, options),
      destroy: () => destroy(id),
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
