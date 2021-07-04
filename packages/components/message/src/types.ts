import type { DefineComponent, HTMLAttributes, VNode } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export interface MessageOptions extends MessagePublicProps {
  id?: string
  content?: string | VNode
  onDestroy?: () => void
}
export interface MessageRef {
  id: string
  update: (options: MessageOptions) => void
  destroy: () => void
}

export const messageProps = {
  visible: IxPropTypes.bool.def(false),
  destroyOnHover: IxPropTypes.bool,
  duration: IxPropTypes.number,
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  type: IxPropTypes.oneOf<MessageType>(['info', 'success', 'warning', 'error', 'loading']).def('info'),

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type MessageProps = IxInnerPropTypes<typeof messageProps>
export type MessagePublicProps = IxPublicPropTypes<typeof messageProps>
export type MessageComponent = DefineComponent<HTMLAttributes & typeof messageProps>
export type MessageInstance = InstanceType<DefineComponent<MessageProps>>

export const messageProviderProps = {
  maxCount: IxPropTypes.number,
  top: IxPropTypes.oneOfType([String, Number]),
}
export interface MessageProviderRef {
  open: (options: MessageOptions) => MessageRef
  info: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  success: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  warning: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  error: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  loading: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  update: (id: string, options: MessageOptions) => void
  destroy: (id: string | string[]) => void
  destroyAll: () => void
}

export type MessageProviderProps = IxInnerPropTypes<typeof messageProviderProps>
export type MessageProviderPublicProps = IxPublicPropTypes<typeof messageProviderProps>
export type MessageProviderComponent = DefineComponent<typeof messageProviderProps, MessageProviderRef>
export type MessageProviderInstance = InstanceType<DefineComponent<MessageProviderProps, MessageProviderRef>>
