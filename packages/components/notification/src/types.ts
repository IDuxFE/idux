/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { ButtonProps } from '@idux/components/button'

// 挑出部分必填的属性
type PickRequire<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>> & Required<Pick<T, U>>

export interface NotificationButtonProps extends ButtonProps {
  key?: VKey
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
}

export type NotificationType = typeof notificationType[number]
export type NotificationPlacement = typeof notificationPlacement[number]
export type NotificationNodePropKey = 'title' | 'content' | 'footer'
export type NotificationProps = IxInnerPropTypes<typeof notificationProps>
export type NotificationPublicProps = IxPublicPropTypes<typeof notificationProps>
export type NotificationComponent = DefineComponent<
  Omit<HTMLAttributes, keyof NotificationPublicProps> & NotificationPublicProps
>
export type NotificationInstance = InstanceType<DefineComponent<NotificationProps>>

// 通过useNotification的配置
export interface NotificationOptions extends PickRequire<NotificationProps, 'title' | 'content'> {
  onDestroy?: (key: VKey) => void
}
export type NotificationPlacementMap = Record<NotificationPlacement, NotificationOptions[]>

export interface NotificationProviderRef {
  open: (options: NotificationOptions) => NotificationRef
  info: (options: Omit<NotificationOptions, 'type'>) => NotificationRef
  success: (options: Omit<NotificationOptions, 'type'>) => NotificationRef
  warning: (options: Omit<NotificationOptions, 'type'>) => NotificationRef
  error: (options: Omit<NotificationOptions, 'type'>) => NotificationRef
  update: (key: VKey, options: Partial<Omit<NotificationOptions, 'key'>>) => void
  destroy: (key: VKey | VKey[]) => void
  destroyAll: () => void
}

export interface NotificationRef {
  key: VKey
  update: (options: Partial<NotificationOptions>) => void
  destroy: () => void
}

export type NotificationProviderProps = IxInnerPropTypes<typeof notificationProviderProps>
export type NotificationProviderPublicProps = IxPublicPropTypes<typeof notificationProviderProps>
export type NotificationProviderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof NotificationProviderPublicProps> & NotificationProviderPublicProps
>
export type NotificationProviderInstance = InstanceType<
  DefineComponent<NotificationProviderProps, NotificationProviderRef>
>
