/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { portalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private'

export const dropdownProps = {
  visible: IxPropTypes.bool.def(false),
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool.def(false),
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: ɵOverlayPlacementDef,
  showArrow: IxPropTypes.bool,
  target: portalTargetDef,
  trigger: ɵOverlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type DropdownProps = IxInnerPropTypes<typeof dropdownProps>
export type DropdownPublicProps = IxPublicPropTypes<typeof dropdownProps>
export type DropdownComponent = DefineComponent<Omit<HTMLAttributes, keyof DropdownPublicProps> & DropdownPublicProps>
export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>
