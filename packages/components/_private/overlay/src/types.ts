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
export const overlayDelayDef = IxPropTypes.oneOfType<number | [number | null, number | null]>([
  Number,
  IxPropTypes.array() as unknown as VueTypeDef<[number | null, number | null]>,
])

export const overlayProps = {
  visible: IxPropTypes.bool,
  allowEnter: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  clickOutside: IxPropTypes.bool,
  delay: overlayDelayDef,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: overlayPlacementDef,
  showArrow: IxPropTypes.bool.def(true),
  target: IxPropTypes.oneOfType([String, HTMLElement]).def('ix-overlay-container'),
  transitionName: IxPropTypes.string,
  trigger: overlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  'onUpdate:placement': IxPropTypes.emit<(placement: PopperPlacement) => void>(),
  onAfterLeave: IxPropTypes.emit<() => void>(),
}

export type OverlayProps = IxInnerPropTypes<typeof overlayProps>
export type OverlayPublicProps = IxPublicPropTypes<typeof overlayProps>
export type OverlayComponent = DefineComponent<HTMLAttributes & typeof overlayProps>
export type OverlayInstance = InstanceType<DefineComponent<OverlayProps>>
