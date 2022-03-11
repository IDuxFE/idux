/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private/overlay'

export const dropdownProps = {
  visible: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool.def(false),
  hideOnClick: IxPropTypes.bool.def(true),
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: ɵOverlayPlacementDef,
  showArrow: IxPropTypes.bool,
  target: ɵPortalTargetDef,
  trigger: ɵOverlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type DropdownProps = ExtractInnerPropTypes<typeof dropdownProps>
export type DropdownPublicProps = ExtractPublicPropTypes<typeof dropdownProps>
export type DropdownComponent = DefineComponent<Omit<HTMLAttributes, keyof DropdownPublicProps> & DropdownPublicProps>
export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>
