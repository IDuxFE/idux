import type { DefineComponent, HTMLAttributes, VNode } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'

import { IxPropTypes } from '@idux/cdk/utils'
import { HeaderProps } from '@idux/components/header'

export type ModalType = 'default' | 'confirm' | 'info' | 'success' | 'warning' | 'error'
export interface ModalButtonProps extends ButtonProps {
  text?: string | VNode
  visible?: boolean
  onClick?: (evt: Event) => void
}
export interface ModalOptions extends ModalPublicProps {
  id?: string
  content?: string | VNode
  onDestroy?: (id: string) => void
}
export interface ModalRef extends ModalBindings {
  id: string
  update: (options: ModalOptions) => void
  destroy: () => void
}

export const modalProps = {
  visible: IxPropTypes.bool.def(false),
  cancelButton: IxPropTypes.object<ButtonProps>(),
  cancelText: IxPropTypes.string,
  centered: IxPropTypes.bool,
  closable: IxPropTypes.bool,
  closeIcon: IxPropTypes.string,
  closeOnEsc: IxPropTypes.bool,
  containerClassName: IxPropTypes.string,
  destroyOnHide: IxPropTypes.bool,
  footer: IxPropTypes.oneOfType<ModalButtonProps[] | VNode | null>([IxPropTypes.array(), IxPropTypes.vNode]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  mask: IxPropTypes.bool,
  maskClosable: IxPropTypes.bool,
  okButton: IxPropTypes.object<ButtonProps>(),
  okText: IxPropTypes.string,
  title: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  type: IxPropTypes.oneOf<ModalType>(['default', 'confirm', 'info', 'success', 'warning', 'error']).def('default'),
  width: IxPropTypes.oneOfType([String, Number]),
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onAfterOpen: IxPropTypes.emit<() => void>(),
  onAfterClose: IxPropTypes.emit<() => void>(),
  onClose: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onCancel: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onOk: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
}

export type ModalProps = IxInnerPropTypes<typeof modalProps>
export interface ModalBindings {
  open: () => void
  close: (evt?: Event | unknown) => Promise<void>
  cancel: (evt?: Event | unknown) => Promise<void>
  ok: (evt?: Event | unknown) => Promise<void>
}
export type ModalPublicProps = IxPublicPropTypes<typeof modalProps>
export type ModalComponent = DefineComponent<HTMLAttributes & typeof modalProps, ModalBindings>
export type ModalInstance = InstanceType<DefineComponent<ModalProps, ModalBindings>>

export interface ModalProviderRef {
  open: (options: ModalOptions) => ModalRef
  confirm: (options: Omit<ModalOptions, 'type'>) => ModalRef
  info: (options: Omit<ModalOptions, 'type'>) => ModalRef
  success: (options: Omit<ModalOptions, 'type'>) => ModalRef
  warning: (options: Omit<ModalOptions, 'type'>) => ModalRef
  error: (options: Omit<ModalOptions, 'type'>) => ModalRef
  update: (id: string, options: ModalOptions) => void
  destroy: (id: string | string[]) => void
  destroyAll: () => void
}
export type ModalProviderComponent = DefineComponent<null, ModalProviderRef>
export type ModalProviderInstance = InstanceType<DefineComponent<null, ModalProviderRef>>
