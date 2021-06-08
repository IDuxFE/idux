import type { DefineComponent } from 'vue'

import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

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

export type TooltipProps = IxExtractPropTypes<typeof tooltipProps>

export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
