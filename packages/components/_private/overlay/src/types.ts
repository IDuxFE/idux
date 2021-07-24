import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { PopperPlacement, PopperScrollStrategy, PopperTrigger } from '@idux/cdk/popper'

import { IxPropTypes } from '@idux/cdk/utils'

export const overlayScrollStrategyDef = IxPropTypes.oneOf<PopperScrollStrategy>(['close', 'reposition', 'none'])
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
  scrollStrategy: overlayScrollStrategyDef,
  disabled: IxPropTypes.bool,
  placement: overlayPlacementDef,
  trigger: overlayTriggerDef,
  allowEnter: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  hideDelay: IxPropTypes.number,
  showDelay: IxPropTypes.number,
  showArrow: IxPropTypes.bool.def(true),
  arrowOffset: IxPropTypes.number.def(0),
  visibleTransition: IxPropTypes.string.def('ix-fade-fast'),
  destroyOnHide: IxPropTypes.bool,
  clsPrefix: IxPropTypes.string.def('ix-overlay'),
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  'onUpdate:placement': IxPropTypes.emit<(placement: PopperPlacement) => void>(),
}

export type OverlayProps = IxInnerPropTypes<typeof overlayProps>
export type OverlayPublicProps = IxPublicPropTypes<typeof overlayProps>
export type OverlayComponent = DefineComponent<HTMLAttributes & typeof overlayProps>
export type OverlayInstance = InstanceType<DefineComponent<OverlayProps>>
