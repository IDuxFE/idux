/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ɵFooterButtonProps } from '@idux/components/_private'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, VNode, VNodeProps } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export type DrawerPlacement = 'top' | 'bottom' | 'start' | 'end'

export type DrawerButtonProps = ɵFooterButtonProps

export interface DrawerOptions extends DrawerPublicProps {
  key?: VKey
  content?: string | VNode
  contentProps?: Record<string, unknown> | VNodeProps
  onDestroy?: (key: VKey) => void
}
export interface DrawerRef extends DrawerBindings {
  key: VKey
  update: (options: DrawerOptions) => void
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
  target: ɵPortalTargetDef,
  width: IxPropTypes.oneOfType([String, Number]),
  wrapperClassName: IxPropTypes.string,
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onClose: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onAfterOpen: IxPropTypes.emit<() => void>(),
  onAfterClose: IxPropTypes.emit<() => void>(),
}

export type DrawerProps = IxInnerPropTypes<typeof drawerProps>
export type DrawerPublicProps = IxPublicPropTypes<typeof drawerProps>
export interface DrawerBindings {
  open: () => void
  close: (evt?: Event | unknown) => Promise<void>
}
export type DrawerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DrawerPublicProps> & DrawerPublicProps,
  DrawerBindings
>
export type DrawerInstance = InstanceType<DefineComponent<DrawerProps, DrawerBindings>>

export interface DrawerProviderRef {
  open: (options: DrawerOptions) => DrawerRef
  update: (key: VKey, options: DrawerOptions) => void
  destroy: (key: VKey | VKey[]) => void
  destroyAll: () => void
}
export type DrawerProviderComponent = DefineComponent<HTMLAttributes, DrawerProviderRef>
export type DrawerProviderInstance = InstanceType<DefineComponent<HTMLAttributes, DrawerProviderRef>>
