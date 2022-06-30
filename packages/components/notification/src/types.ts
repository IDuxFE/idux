/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

// 挑出部分必填的属性
type PickRequire<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>> & Required<Pick<T, U>>

export interface NotificationButtonProps<K = VKey> extends ButtonProps {
  key?: K
  text?: string | VNode
  onClick?: (evt: Event) => void
}

export interface SlotProps {
  visible?: boolean
  close?: () => void
}

export const notificationType = ['info', 'success', 'warning', 'error'] as const
export const notificationPlacement = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'] as const
export const notificationProps = {
  visible: IxPropTypes.bool,
  destroyOnHover: IxPropTypes.bool,
  duration: IxPropTypes.number,
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  closeIcon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  type: IxPropTypes.oneOf<NotificationType>(['info', 'success', 'warning', 'error']),
  key: IxPropTypes.oneOfType<VKey>([String, Number, Symbol]),
  title: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  content: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  footer: IxPropTypes.oneOfType<string | NotificationButtonProps[] | VNode>([
    IxPropTypes.array(),
    IxPropTypes.vNode,
    String,
  ]),
  placement: IxPropTypes.oneOf<NotificationPlacement>(['topStart', 'topEnd', 'bottomStart', 'bottomEnd']),

  // event
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onClose: IxPropTypes.emit<(evt?: Event) => void>(),
}
export const notificationProviderProps = {
  offset: IxPropTypes.oneOfType<string | number | (number | string)[]>([String, Number, Array]),
  maxCount: IxPropTypes.number,
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
}

export type NotificationType = typeof notificationType[number]
export type NotificationPlacement = typeof notificationPlacement[number]
export type NotificationNodePropKey = 'title' | 'content' | 'footer'
export type NotificationProps = ExtractInnerPropTypes<typeof notificationProps>
export type NotificationPublicProps = ExtractPublicPropTypes<typeof notificationProps>
export type NotificationComponent = DefineComponent<
  Omit<HTMLAttributes, keyof NotificationPublicProps> & NotificationPublicProps
>
export type NotificationInstance = InstanceType<DefineComponent<NotificationProps>>

// 通过useNotification的配置
export interface NotificationOptions<K = VKey> extends PickRequire<NotificationProps, 'title' | 'content'> {
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
