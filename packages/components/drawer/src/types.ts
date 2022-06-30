/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ScrollStrategy } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ɵFooterButtonProps } from '@idux/components/_private/footer'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeProps } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

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
  visible: IxPropTypes.bool,
  closable: IxPropTypes.bool,
  closeIcon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  closeOnEsc: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool.def(false),
  footer: IxPropTypes.oneOfType([IxPropTypes.array<DrawerButtonProps>(), IxPropTypes.vNode]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  height: IxPropTypes.oneOfType([String, Number]),
  mask: IxPropTypes.bool,
  maskClosable: IxPropTypes.bool,
  offset: IxPropTypes.oneOfType([String, Number]).def(0),
  placement: IxPropTypes.oneOf<DrawerPlacement>(['top', 'bottom', 'start', 'end']).def('end'),
  scrollStrategy: IxPropTypes.object<ScrollStrategy>(),
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  width: IxPropTypes.oneOfType([String, Number]),
  wrapperClassName: IxPropTypes.string,
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onAfterOpen: IxPropTypes.emit<() => void>(),
  onAfterClose: IxPropTypes.emit<() => void>(),
  onBeforeClose: IxPropTypes.emit<(evt?: Event | unknown) => void | boolean | Promise<boolean>>(),
  onClose: IxPropTypes.emit<(evt?: Event | unknown) => void>(),
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
