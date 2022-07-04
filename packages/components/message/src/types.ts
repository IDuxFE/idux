/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export interface MessageOptions<K = VKey> extends MessagePublicProps {
  key?: K
  content?: string | VNode
  onDestroy?: (key: K) => void
}
export interface MessageRef<K = VKey> {
  key: K
  update: (options: MessageOptions<K>) => void
  destroy: () => void
}

export const messageProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHover: {
    type: Boolean,
    default: undefined,
  },
  duration: Number,
  icon: [String, Object] as PropType<string | VNode>,
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
  },

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<(evt?: Event) => void>>,
} as const

export type MessageProps = ExtractInnerPropTypes<typeof messageProps>
export type MessagePublicProps = ExtractPublicPropTypes<typeof messageProps>
export type MessageComponent = DefineComponent<Omit<HTMLAttributes, keyof MessagePublicProps> & MessagePublicProps>
export type MessageInstance = InstanceType<DefineComponent<MessageProps>>

export const messageProviderProps = {
  maxCount: Number,
  top: [String, Number] as PropType<string | number>,
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
} as const
export interface MessageProviderRef<K = VKey> {
  open: (options: MessageOptions<K>) => MessageRef
  info: (content: string | VNode, options?: Omit<MessageOptions<K>, 'type' | 'content'>) => MessageRef<K>
  success: (content: string | VNode, options?: Omit<MessageOptions<K>, 'type' | 'content'>) => MessageRef<K>
  warning: (content: string | VNode, options?: Omit<MessageOptions<K>, 'type' | 'content'>) => MessageRef<K>
  error: (content: string | VNode, options?: Omit<MessageOptions<K>, 'type' | 'content'>) => MessageRef<K>
  loading: (content: string | VNode, options?: Omit<MessageOptions<K>, 'type' | 'content'>) => MessageRef<K>
  update: (key: K, options: MessageOptions<K>) => void
  destroy: (key: K | K[]) => void
  destroyAll: () => void
}

export type MessageProviderProps = ExtractInnerPropTypes<typeof messageProviderProps>
export type MessageProviderPublicProps = ExtractPublicPropTypes<typeof messageProviderProps>
export type MessageProviderComponent = DefineComponent<MessageProviderPublicProps, MessageProviderRef>
export type MessageProviderInstance = InstanceType<DefineComponent<MessageProviderProps, MessageProviderRef>>
