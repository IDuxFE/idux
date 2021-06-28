import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

type Done = (cancel: boolean) => void
export type BeforeCloseFunc = (done: Done) => void

export const drawerProps = {
  visible: IxPropTypes.bool,
  title: IxPropTypes.string,
  footer: IxPropTypes.string,
  closable: IxPropTypes.bool.def(true),
  placement: IxPropTypes.oneOf(['top', 'right', 'bottom', 'left'] as const).def('right'),
  width: IxPropTypes.oneOfType([Number, String]),
  height: IxPropTypes.oneOfType([Number, String]),
  offset: IxPropTypes.oneOfType([Number, String]).def(0),
  mask: IxPropTypes.bool.def(true),
  maskClosable: IxPropTypes.bool.def(true),
  wrapClassName: String,
  destroyOnHide: IxPropTypes.bool.def(false),
  keyboard: IxPropTypes.bool.def(true),
  beforeClose: IxPropTypes.func<BeforeCloseFunc>(),
}

export type DrawerProps = IxExtractPropTypes<typeof drawerProps>

export type DrawerInstance = InstanceType<DefineComponent<DrawerProps>>
