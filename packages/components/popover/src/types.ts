import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'
import { IxPropTypes } from '@idux/cdk/utils'

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

export type PopoverProps = IxInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = IxPublicPropTypes<typeof popoverProps>
export type PopoverComponent = DefineComponent<HTMLAttributes & typeof popoverProps>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps>>
