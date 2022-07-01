/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ScrollStrategy } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { ɵFooterButtonProps } from '@idux/components/_private/footer'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeProps } from 'vue'

export type DrawerPlacement = 'top' | 'bottom' | 'start' | 'end'

export type DrawerButtonProps = ɵFooterButtonProps

export interface DrawerOptions<K = VKey> extends DrawerPublicProps {
  key?: K
  content?: string | VNode
  contentProps?: Record<string, unknown> | VNodeProps
  onDestroy?: (key: K) => void
}
export interface DrawerRef<K = VKey> extends DrawerBindings {
  key: K
  update: (options: DrawerOptions<K>) => void
  destroy: () => void
}

export const drawerProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  closable: {
    type: Boolean,
    default: undefined,
  },
  closeIcon: [String, Object] as PropType<string | VNode>,
  closeOnEsc: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  footer: [Array, Object] as PropType<DrawerButtonProps[] | VNode>,
  header: [String, Object] as PropType<string | HeaderProps>,
  height: [String, Number],
  mask: {
    type: Boolean,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },
  offset: {
    type: [String, Number],
    default: 0,
  },
  placement: {
    type: String as PropType<DrawerPlacement>,
    default: 'end',
  },
  scrollStrategy: Object as PropType<ScrollStrategy>,
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  width: [String, Number],
  wrapperClassName: String,
  zIndex: Number,

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onAfterOpen: [Function, Array] as PropType<MaybeArray<() => void>>,
  onAfterClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  onBeforeClose: [Function, Array] as PropType<
    MaybeArray<(evt?: Event | unknown) => void | boolean | Promise<boolean>>
  >,
  onClose: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => void>>,
}

export type DrawerProps = ExtractInnerPropTypes<typeof drawerProps>
export type DrawerPublicProps = ExtractPublicPropTypes<typeof drawerProps>
export interface DrawerBindings {
  open: () => void
  close: (evt?: Event | unknown) => Promise<void>
}
export type DrawerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DrawerPublicProps> & DrawerPublicProps,
  DrawerBindings
>
export type DrawerInstance = InstanceType<DefineComponent<DrawerProps, DrawerBindings>>

export interface DrawerProviderRef<K = VKey> {
  open: (options: DrawerOptions) => DrawerRef
  update: (key: K, options: DrawerOptions) => void
  destroy: (key: K | K[]) => void
  destroyAll: () => void
}
export type DrawerProviderComponent = DefineComponent<HTMLAttributes, DrawerProviderRef>
export type DrawerProviderInstance = InstanceType<DefineComponent<HTMLAttributes, DrawerProviderRef>>
