import { ComputedRef, Ref, ref } from 'vue'
import { toArray, uniqueId } from '@idux/cdk/utils'
import { MessageOptions } from './types'

export interface UseMessage {
  messages: Ref<MessageOptions[]>
  add: (item: MessageOptions) => string
  destroy: (id?: string | string[]) => void
}

export const useMessage = (maxCount: ComputedRef<number>): UseMessage => {
  const messages = ref<MessageOptions[]>([])

  const getCurrIndex = (id: string) => {
    return messages.value.findIndex(message => message.id === id)
  }

  const add = (item: MessageOptions): string => {
    const currIndex = item.id ? getCurrIndex(item.id) : -1
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item)
      return item.id!
    }

    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1)
    }

    const id = item.id ?? uniqueId('ix-message-item')
    messages.value.push({ ...item, id })
    return id
  }

  const removeItem = (id: string) => {
    const currIndex = getCurrIndex(id)
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1)
    }
  }

  const destroy = (id?: string | string[]) => {
    if (!id) {
      messages.value = []
    } else {
      const ids = toArray(id)
      ids.forEach(id => removeItem(id))
    }
  }

  return { messages, add, destroy }
}
