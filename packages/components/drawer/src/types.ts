import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const drawerProps = {
  visible: IxPropTypes.bool.def(false),
  title: IxPropTypes.string,
  footer: IxPropTypes.string,
  closable: IxPropTypes.bool.def(true),
  placement: IxPropTypes.oneOf(['top', 'right', 'bottom', 'left'] as const).def('right'),
  width: IxPropTypes.oneOfType([String, Number]),
  height: IxPropTypes.oneOfType([String, Number]),
  offset: IxPropTypes.oneOfType([String, Number]).def(0),
  mask: IxPropTypes.bool,
  maskClosable: IxPropTypes.bool,
  containerClassName: IxPropTypes.string,
  destroyOnHide: IxPropTypes.bool.def(false),
  closeOnEsc: IxPropTypes.bool,
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  onClose: IxPropTypes.emit<(evt?: Event | unknown) => unknown>(),
  onAfterOpen: IxPropTypes.emit<() => void>(),
  onAfterClose: IxPropTypes.emit<() => void>(),
}

export interface DrawerBindings {
  open: () => void
  close: (evt?: Event | unknown) => Promise<void>
}

export type DrawerProps = IxInnerPropTypes<typeof drawerProps>
export type DrawerPublicProps = IxPublicPropTypes<typeof drawerProps>
export type DrawerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DrawerPublicProps> & DrawerPublicProps,
  DrawerBindings
>
export type DrawerInstance = InstanceType<DefineComponent<DrawerProps, DrawerBindings>>
