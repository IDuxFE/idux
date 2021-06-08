import type { DefineComponent } from 'vue'

import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const popoverProps = {
  title: IxPropTypes.string,
  content: IxPropTypes.string.isRequired,
  placement: overlayPlacementProp,
  visible: IxPropTypes.bool,
  trigger: overlayTriggerProp,
  showDelay: IxPropTypes.number,
  hideDelay: IxPropTypes.number,
  destroyOnHide: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
}

export type PopoverProps = IxExtractPropTypes<typeof popoverProps>

export type PopoverInstance = InstanceType<DefineComponent<PopoverProps>>
