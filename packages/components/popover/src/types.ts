import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { overlayPlacementDef, overlayTriggerDef } from '@idux/components/_private/overlay'

export const popoverProps = {
  title: IxPropTypes.string,
  content: IxPropTypes.string.isRequired,
  placement: overlayPlacementDef,
  visible: IxPropTypes.bool.def(false),
  trigger: overlayTriggerDef,
  showDelay: IxPropTypes.number,
  hideDelay: IxPropTypes.number,
  destroyOnHide: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  'onUpdate:visible': IxPropTypes.func<(visible: boolean) => void>().def(() => {}),
}

export type PopoverProps = IxInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = IxPublicPropTypes<typeof popoverProps>
export type PopoverComponent = DefineComponent<HTMLAttributes & typeof popoverProps>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps>>
