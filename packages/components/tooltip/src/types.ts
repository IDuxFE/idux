import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { overlayPlacementDef, overlayTriggerDef } from '@idux/components/_private'
import { IxPropTypes } from '@idux/cdk/utils'

export const tooltipProps = {
  title: IxPropTypes.string,
  placement: overlayPlacementDef,
  visible: IxPropTypes.bool.def(false),
  trigger: overlayTriggerDef,
  hideDelay: IxPropTypes.number,
  showDelay: IxPropTypes.number,
  destroyOnHide: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  'onUpdate:visible': IxPropTypes.func<(visible: boolean) => void>().def(() => {}),
}

export type TooltipProps = IxInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = IxPublicPropTypes<typeof tooltipProps>
export type TooltipComponent = DefineComponent<HTMLAttributes & typeof tooltipProps>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
