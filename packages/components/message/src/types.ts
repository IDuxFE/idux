import type { DefineComponent } from 'vue'
import type { VNode } from 'vue'

interface MessageItemOriginalProps {
  duration?: number
  pauseOnHover?: boolean
  icon?: string | { [key in string]: any }
  content: string | { [key in string]: any }
  type?: MessageType
  messageId: MessageId
  onClose: (id: MessageId) => void
}

export type MessageItemProps = Readonly<MessageItemOriginalProps>

export type MessageItemComponent = InstanceType<DefineComponent<MessageItemProps>>

export type MessageType = 'success' | 'error' | 'info' | 'warn'

export type MessageId = string | number

export interface MessageDataOptions {
  duration?: number
  pauseOnHover?: boolean
}

export interface MessageData {
  type: MessageType
  content: string | VNode
  icon: string | VNode
  messageId: MessageId
  onClose?: (id: MessageId) => void
}

export type MessageListItem = MessageDataOptions & MessageData

export interface MessageApiFnReturn {
  messageId: MessageId
  destroy: () => void
}

export interface MessageApiFn {
  (content: string | Partial<Omit<MessageListItem, 'type'>>, duration?: number): MessageApiFnReturn
}

export interface MessageApi {
  success: MessageApiFn
  error: MessageApiFn
  info: MessageApiFn
  warn: MessageApiFn
  remove: (id?: MessageId | MessageId[]) => Promise<void>
  create: (option: Partial<MessageListItem>) => MessageApiFnReturn
  getContainer: () => HTMLElement
}
