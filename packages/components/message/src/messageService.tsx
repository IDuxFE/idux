import { useContainer } from '@idux/cdk/portal'
import { isString, toCssPixel, uniqueId, isFunction, isUndefined } from '@idux/cdk/utils'
import { createVNode, render, ref, isVNode, VNode, TransitionGroup } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import IxMessage from './Message'
import { MessageId, MessageListItem, MessageApi, MessageApiFnReturn, MessageType } from './types'

const containerCls = 'ix-message'
let isInit = false
const maxCount = 5 // todo 全局设置获取
const top = 60 // todo 全局设置获取
const { messages, add, remove } = useMessage()

const create = (option: Partial<MessageListItem>): MessageApiFnReturn => {
  if (!isInit) {
    const container = useContainer(containerCls)
    const onClose = (id: MessageId) => {
      remove(id)
    }
    const vm = createVNode(
      IxPortal,
      {
        target: containerCls,
      },
      {
        default: () => {
          const messageList = messages.value.map((message, index) => (
            <IxMessage
              key={message.messageId}
              duration={message.duration}
              pauseOnHover={message.pauseOnHover}
              messageId={message.messageId as MessageId}
              icon={message.icon}
              content={message.content}
              type={message.type}
              onClose={onClose}>
              {index}
            </IxMessage>
          ))
          return <TransitionGroup tag={'div'} name={'move-up'}>
            {messageList}
          </TransitionGroup>
        },
      },
    )
    render(vm, container)
    container.style.top = toCssPixel(top)
  }
  isInit = true
  const newMessageId = add(option)
  return {
    messageId: newMessageId,
    destroy: () => remove(newMessageId),
  }
}
const api: any = {
  remove,
  create,
  getContainer(): HTMLElement {
    return useContainer(containerCls)
  },
}

function useMessage() {
  const messages = ref<Partial<MessageListItem>[]>([])
  const getCurIndex = (id: MessageId | undefined) => {
    return messages.value.findIndex(message => message.messageId === id)
  }
  const add = (item: Partial<MessageListItem>): MessageId => {
    const curIndex = getCurIndex(item.messageId)
    const newMessageId = uniqueId('ix-message-item')
    if (curIndex !== -1) {
      messages.value.splice(curIndex, 1, item)
      return item.messageId as MessageId
    }
    if (messages.value.length >= maxCount) {
      messages.value = messages.value.slice(-maxCount + 1)
    }
    messages.value.push(
      Object.assign(
        {
          messageId: newMessageId,
        },
        item,
      ),
    )
    return newMessageId
  }
  const removeItem = (id: MessageId) => {
    if (messages.value.length) {
      const curItemIndex = getCurIndex(id)
      if (curItemIndex !== -1) {
        const curMessage = messages.value[curItemIndex]
        const messageClose = curMessage.onClose
        if (isFunction(messageClose)) {
          messageClose(id)
        }
        messages.value.splice(curItemIndex, 1)
      }
    }
  }
  const removeAll = () => {
    messages.value = []
    return Promise.resolve()
  }
  const remove = (id?: MessageId | MessageId[]) => {
    if (isUndefined(id)) {
      return removeAll()
    }
    if (Array.isArray(id)) {
      id.forEach(item => removeItem(item))
      return Promise.resolve()
    }
    removeItem(id)
    return Promise.resolve()
  }
  return {
    messages,
    add,
    remove,
  }
}

function formatOption(option: string | VNode | Partial<Omit<MessageListItem, 'type'>>, duration?: number) {
  // if option is plain string or vnode, return an object with content
  if (isString(option) || isVNode(option)) {
    return { content: option, duration }
  }
  if (isUndefined(duration)) {
    duration = option.duration
  }
  return {
    ...option,
    duration,
  }
}

['success', 'error', 'info', 'warn'].forEach((type) => {
  api[type] = function (
    option: string | Partial<Omit<MessageListItem, 'type'>> = '',
    duration?: number,
  ): MessageApiFnReturn {
    option = formatOption(option, duration)
    return create({
      ...option,
      type: type as MessageType,
    })
  }
})

export const MessageService: MessageApi = api
