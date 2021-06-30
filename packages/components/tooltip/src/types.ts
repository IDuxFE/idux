import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'
import { IxPropTypes } from '@idux/cdk/utils'

export const tooltipProps = {
  title: IxPropTypes.string,
  placement: overlayPlacementProp,
  visible: IxPropTypes.bool,
  trigger: overlayTriggerProp,
  showDelay: IxPropTypes.number,
  hideDelay: IxPropTypes.number,
  destroyOnHide: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
}

export type TooltipProps = IxInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = IxPublicPropTypes<typeof tooltipProps>
export type TooltipComponent = DefineComponent<HTMLAttributes & typeof tooltipProps>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
