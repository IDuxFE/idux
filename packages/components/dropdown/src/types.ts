import type { DefineComponent } from 'vue'
import type { OverlayPlacement, OverlayTrigger } from '@idux/cdk/overlay'

import { OverlayPlacementPropDef, OverlayTriggerPropDef } from '@idux/cdk/overlay'
import { PropTypes } from '@idux/cdk/utils'

export interface DropdownProps {
  visible: boolean
  disabled: boolean
  icon?: string
  overlayClass?: string
  placement?: OverlayPlacement
  trigger?: OverlayTrigger
}

export const dropdownPropsDef = {
  visible: PropTypes.bool.def(false),
  disabled: PropTypes.bool.def(false),
  icon: PropTypes.string,
  overlayClass: PropTypes.string,
  placement: OverlayPlacementPropDef,
  trigger: OverlayTriggerPropDef,
}

export type DropdownComponent = InstanceType<DefineComponent<DropdownProps>>

export interface DropdownButtonProps extends DropdownProps {
  icon: string
}

export const dropdownButtonPropsDef = {
  ...dropdownPropsDef,
  icon: PropTypes.string.def('ellipsis'),
}

export type DropdownButtonComponent = InstanceType<DefineComponent<DropdownButtonProps>>
