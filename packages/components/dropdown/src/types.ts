import type { DefineComponent, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { overlayPlacementProp, overlayTriggerProp } from '@idux/cdk/overlay'

export const dropdownProps = {
  visible: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  overlayClass: IxPropTypes.string,
  placement: overlayPlacementProp,
  trigger: overlayTriggerProp,
}

export type DropdownProps = IxInnerPropTypes<typeof dropdownProps>
export type DropdownPublicProps = IxPublicPropTypes<typeof dropdownProps>
export type DropdownComponent = DefineComponent<AnchorHTMLAttributes & typeof dropdownProps>
export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>

export const dropdownButtonProps = {
  ...dropdownProps,
  icon: IxPropTypes.string.def('ellipsis'),
}

export type DropdownButtonProps = IxInnerPropTypes<typeof dropdownButtonProps>
export type DropdownButtonPublicProps = IxPublicPropTypes<typeof dropdownButtonProps>
export type DropdownButtonComponent = DefineComponent<ButtonHTMLAttributes & typeof dropdownButtonProps>
export type DropdownButtonInstance = InstanceType<DefineComponent<DropdownButtonProps>>
