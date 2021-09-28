import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { portalTargetDef } from '@idux/cdk/portal'
import { overlayPlacementDef, overlayTriggerDef } from '@idux/components/_private'

export const dropdownProps = {
  visible: IxPropTypes.bool.def(false),
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool.def(false),
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: overlayPlacementDef,
  showArrow: IxPropTypes.bool,
  target: portalTargetDef,
  trigger: overlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type DropdownProps = IxInnerPropTypes<typeof dropdownProps>
export type DropdownPublicProps = IxPublicPropTypes<typeof dropdownProps>
export type DropdownComponent = DefineComponent<Omit<HTMLAttributes, keyof DropdownPublicProps> & DropdownPublicProps>
export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>
