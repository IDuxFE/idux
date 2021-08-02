import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { portalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

import { overlayPlacementDef, overlayTriggerDef, overlayDelayDef } from '@idux/components/_private'

export const tooltipProps = {
  visible: IxPropTypes.bool.def(false),
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  delay: overlayDelayDef,
  placement: overlayPlacementDef,
  target: portalTargetDef,
  title: IxPropTypes.string,
  trigger: overlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type TooltipProps = IxInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = IxPublicPropTypes<typeof tooltipProps>
export type TooltipComponent = DefineComponent<HTMLAttributes & typeof tooltipProps>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
