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
import type { ButtonProps } from '@idux/components/button'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeProps } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ModalType = 'default' | 'confirm' | 'info' | 'success' | 'warning' | 'error'
export type ModalButtonProps = ɵFooterButtonProps
export interface ModalOptions<K = VKey> extends ModalPublicProps {
  key?: K
  content?: string | VNode
  contentProps?: Record<string, unknown> | VNodeProps
  onDestroy?: (key: K) => void
}
export interface ModalRef<K = VKey> extends ModalBindings {
  key: K
  update: (options: ModalOptions<K>) => void
  destroy: () => void
}

export const modalProps = {
  visible: IxPropTypes.bool,
  cancelButton: IxPropTypes.object<ButtonProps>(),
  cancelText: IxPropTypes.string,
  centered: IxPropTypes.bool,
  closable: IxPropTypes.bool,
  closeIcon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  closeOnEsc: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool.def(false),
  footer: IxPropTypes.oneOfType([Boolean, IxPropTypes.array<ModalButtonProps>(), IxPropTypes.vNode]).def(true),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  mask: IxPropTypes.bool,
  maskClosable: IxPropTypes.bool,
  animatable: IxPropTypes.bool.def(true),
  offset: IxPropTypes.oneOfType([String, Number]).def(128),
  okButton: IxPropTypes.object<ButtonProps>(),
  okText: IxPropTypes.string,
  scrollStrategy: IxPropTypes.object<ScrollStrategy>(),
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  title: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  type: IxPropTypes.oneOf<ModalType>(['default', 'confirm', 'info', 'success', 'warning', 'error']).def('default'),
  width: IxPropTypes.oneOfType([String, Number]),
  wrapperClassName: IxPropTypes.string,
  zIndex: IxPropTypes.number,
  draggable: { type: Boolean, default: false },

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onAfterOpen: IxPropTypes.emit<() => void>(),
  onAfterClose: IxPropTypes.emit<() => void>(),
  onBeforeClose: IxPropTypes.emit<(evt?: Event | unknown) => void | boolean | Promise<boolean>>(),
  onClose: IxPropTypes.emit<(evt?: Event | unknown) => void>(),
  onCancel: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onOk: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
}

export type ModalProps = ExtractInnerPropTypes<typeof modalProps>
export type ModalPublicProps = ExtractPublicPropTypes<typeof modalProps>
export interface ModalBindings {
  open: () => void
  close: (evt?: Event | unknown) => Promise<void>
  cancel: (evt?: Event | unknown) => Promise<void>
  ok: (evt?: Event | unknown) => Promise<void>
}
export type ModalComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ModalPublicProps> & ModalPublicProps,
  ModalBindings
>
export type ModalInstance = InstanceType<DefineComponent<ModalProps, ModalBindings>>

export interface ModalProviderRef<K = VKey> {
  open: (options: ModalOptions<K>) => ModalRef<K>
  confirm: (options: Omit<ModalOptions<K>, 'type'>) => ModalRef<K>
  info: (options: Omit<ModalOptions<K>, 'type'>) => ModalRef<K>
  success: (options: Omit<ModalOptions<K>, 'type'>) => ModalRef<K>
  warning: (options: Omit<ModalOptions<K>, 'type'>) => ModalRef<K>
  error: (options: Omit<ModalOptions<K>, 'type'>) => ModalRef<K>
  update: (key: K, options: ModalOptions<K>) => void
  destroy: (key: K | K[]) => void
  destroyAll: () => void
}
export type ModalProviderComponent = DefineComponent<HTMLAttributes, ModalProviderRef>
export type ModalProviderInstance = InstanceType<DefineComponent<HTMLAttributes, ModalProviderRef>>
