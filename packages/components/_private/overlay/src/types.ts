import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'

import { IxPropTypes } from '@idux/cdk/utils'

export const overlayPlacementDef = IxPropTypes.oneOf<PopperPlacement>([
  'topStart',
  'top',
  'topEnd',
  'rightStart',
  'right',
  'rightEnd',
  'bottomStart',
  'bottom',
  'bottomEnd',
  'leftStart',
  'left',
  'leftEnd',
])
export const overlayTriggerDef = IxPropTypes.oneOf<PopperTrigger>(['click', 'hover', 'focus', 'contextmenu', 'manual'])

export const overlayProps = {
  visible: IxPropTypes.bool,
  allowEnter: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  hideDelay: IxPropTypes.number,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: overlayPlacementDef,
  showDelay: IxPropTypes.number,
  showArrow: IxPropTypes.bool.def(true),
  target: IxPropTypes.oneOfType([String, HTMLElement]).def('ix-overlay-container'),
  transitionName: IxPropTypes.string,
  trigger: overlayTriggerDef,
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  'onUpdate:placement': IxPropTypes.emit<(placement: PopperPlacement) => void>(),
}

export type OverlayProps = IxInnerPropTypes<typeof overlayProps>
export type OverlayPublicProps = IxPublicPropTypes<typeof overlayProps>
export type OverlayComponent = DefineComponent<HTMLAttributes & typeof overlayProps>
export type OverlayInstance = InstanceType<DefineComponent<OverlayProps>>
