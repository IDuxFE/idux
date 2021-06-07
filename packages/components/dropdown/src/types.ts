import type { DefineComponent } from 'vue'

import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const dropdownProps = {
  visible: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  overlayClass: IxPropTypes.string,
  placement: overlayPlacementProp,
  trigger: overlayTriggerProp,
}

export type DropdownProps = IxExtractPropTypes<typeof dropdownProps>

export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>

export const dropdownButtonProps = {
  ...dropdownProps,
  icon: IxPropTypes.string.def('ellipsis'),
}

export type DropdownButtonProps = IxExtractPropTypes<typeof dropdownButtonProps>

export type DropdownButtonInstance = InstanceType<DefineComponent<DropdownButtonProps>>
