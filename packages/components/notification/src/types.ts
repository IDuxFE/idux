/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild, VNodeProps } from 'vue'

export interface NotificationButtonProps<K = VKey> extends ButtonProps {
  key?: K
  text?: string | VNode | (() => VNodeChild)
  onClick?: (evt: Event) => void
}

export interface SlotProps {
  visible?: boolean
  close?: () => void
}

export const notificationType = ['info', 'success', 'warning', 'error'] as const
export const notificationPlacement = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'] as const
export const notificationProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHover: {
    type: Boolean,
    default: undefined,
  },
  duration: Number,
  icon: [String, Object, Function] as PropType<string | VNode | (() => VNodeChild)>,
  closeIcon: [String, Object, Function] as PropType<string | VNode | (() => VNodeChild)>,
  type: String as PropType<NotificationType>,
  title: [String, Object, Function] as PropType<string | VNode | (() => VNodeChild)>,
  content: [String, Object, Function] as PropType<string | VNode | (() => VNodeChild)>,
  footer: [String, Array, Object] as PropType<
    string | NotificationButtonProps[] | VNode | ((options: SlotProps) => VNodeChild)
  >,
  placement: String as PropType<NotificationPlacement>,

  // event
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<(evt?: Event) => void>>,
} as const

export const notificationProviderProps = {
  container: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  maxCount: Number,
  offset: [String, Number, Array] as PropType<string | number | (number | string)[]>,
} as const

export type NotificationType = (typeof notificationType)[number]
export type NotificationPlacement = (typeof notificationPlacement)[number]
export type NotificationNodePropKey = 'title' | 'content' | 'footer'
export type NotificationProps = ExtractInnerPropTypes<typeof notificationProps>
export type NotificationPublicProps = ExtractPublicPropTypes<typeof notificationProps>
export type NotificationComponent = DefineComponent<
  Omit<HTMLAttributes, keyof NotificationPublicProps> & NotificationPublicProps
>
export type NotificationInstance = InstanceType<DefineComponent<NotificationProps>>

// 通过useNotification的配置
export interface NotificationOptions<K = VKey> extends NotificationProps {
  key?: K
  contentProps?: Record<string, unknown> | VNodeProps
  onDestroy?: (key: K) => void
}
export type NotificationPlacementMap = Record<NotificationPlacement, NotificationOptions[]>

export interface NotificationProviderRef<K = VKey> {
  open: (options: NotificationOptions<K>) => NotificationRef<K>
  info: (options: Omit<NotificationOptions<K>, 'type'>) => NotificationRef<K>
  success: (options: Omit<NotificationOptions<K>, 'type'>) => NotificationRef<K>
  warning: (options: Omit<NotificationOptions<K>, 'type'>) => NotificationRef<K>
  error: (options: Omit<NotificationOptions<K>, 'type'>) => NotificationRef<K>
  update: (key: K, options: Partial<Omit<NotificationOptions<K>, 'key'>>) => void
  destroy: (key: K | K[]) => void
  destroyAll: () => void
}

export interface NotificationRef<K = VKey> {
  key: K
  update: (options: Partial<NotificationOptions<K>>) => void
  destroy: () => void
}

export type NotificationProviderProps = ExtractInnerPropTypes<typeof notificationProviderProps>
export type NotificationProviderPublicProps = ExtractPublicPropTypes<typeof notificationProviderProps>
export type NotificationProviderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof NotificationProviderPublicProps> & NotificationProviderPublicProps
>
export type NotificationProviderInstance = InstanceType<
  DefineComponent<NotificationProviderProps, NotificationProviderRef>
>
