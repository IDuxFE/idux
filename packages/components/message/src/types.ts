/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export interface MessageOptions extends MessagePublicProps {
  key?: VKey
  content?: string | VNode
  onDestroy?: (key: VKey) => void
}
export interface MessageRef {
  key: VKey
  update: (options: MessageOptions) => void
  destroy: () => void
}

export const messageProps = {
  visible: IxPropTypes.bool,
  destroyOnHover: IxPropTypes.bool,
  duration: IxPropTypes.number,
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  type: IxPropTypes.oneOf<MessageType>(['info', 'success', 'warning', 'error', 'loading']).def('info'),

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onClose: IxPropTypes.emit<(evt?: Event) => void>(),
}

export type MessageProps = IxInnerPropTypes<typeof messageProps>
export type MessagePublicProps = IxPublicPropTypes<typeof messageProps>
export type MessageComponent = DefineComponent<Omit<HTMLAttributes, keyof MessagePublicProps> & MessagePublicProps>
export type MessageInstance = InstanceType<DefineComponent<MessageProps>>

export const messageProviderProps = {
  maxCount: IxPropTypes.number,
  top: IxPropTypes.oneOfType([String, Number]),
  target: ɵPortalTargetDef,
}
export interface MessageProviderRef {
  open: (options: MessageOptions) => MessageRef
  info: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  success: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  warning: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  error: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  loading: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  update: (key: string, options: MessageOptions) => void
  destroy: (key: string | string[]) => void
  destroyAll: () => void
}

export type MessageProviderProps = IxInnerPropTypes<typeof messageProviderProps>
export type MessageProviderPublicProps = IxPublicPropTypes<typeof messageProviderProps>
export type MessageProviderComponent = DefineComponent<MessageProviderPublicProps, MessageProviderRef>
export type MessageProviderInstance = InstanceType<DefineComponent<MessageProviderProps, MessageProviderRef>>
