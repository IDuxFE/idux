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
import type { ButtonProps } from '@idux/components/button'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeProps } from 'vue'

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
  visible: {
    type: Boolean,
    default: undefined,
  },
  cancelButton: Object as PropType<ButtonProps>,
  cancelText: String,
  centered: {
    type: Boolean,
    default: undefined,
  },
  closable: {
    type: Boolean,
    default: undefined,
  },
  closeIcon: [String, Object] as PropType<string | VNode>,
  closeOnDeactivated: {
    type: Boolean,
    default: true,
  },
  closeOnEsc: {
    type: Boolean,
    default: undefined,
  },
  container: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  draggable: { type: Boolean, default: false },
  footer: {
    type: [Boolean, Array, Object] as PropType<boolean | ModalButtonProps[] | VNode>,
    default: true,
  },
  header: [String, Object] as PropType<string | HeaderProps>,
  icon: [String, Object] as PropType<string | VNode>,
  mask: {
    type: Boolean,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },
  animatable: {
    type: Boolean,
    default: undefined,
  },
  offset: {
    type: [String, Number] as PropType<string | number>,
    default: 128,
  },
  okButton: Object as PropType<ButtonProps>,
  okText: String,
  scrollStrategy: Object as PropType<ScrollStrategy>,
  title: [String, Object] as PropType<string | VNode>,
  type: {
    type: String as PropType<ModalType>,
    default: 'default',
  },
  width: [String, Number] as PropType<string | number>,
  zIndex: Number,

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  onAfterOpen: [Function, Array] as PropType<MaybeArray<() => void>>,
  onAfterClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  onBeforeClose: [Function, Array] as PropType<
    MaybeArray<(evt?: Event | unknown) => void | boolean | Promise<boolean>>
  >,
  onClose: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => void>>,
  onCancel: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => unknown>>,
  onOk: [Function, Array] as PropType<MaybeArray<(evt?: Event | unknown) => unknown>>,

  // private
  __content_node: [String, Object] as PropType<string | VNode>,
} as const

export type ModalProps = ExtractInnerPropTypes<typeof modalProps>
export type ModalPublicProps = Omit<ExtractPublicPropTypes<typeof modalProps>, '__content_node'>
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
