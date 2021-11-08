/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵOverlayDelayDef, ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private'

export const tooltipProps = {
  visible: IxPropTypes.bool.def(false),
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  delay: ɵOverlayDelayDef,
  placement: ɵOverlayPlacementDef,
  target: ɵPortalTargetDef,
  title: IxPropTypes.string,
  trigger: ɵOverlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type TooltipProps = IxInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = IxPublicPropTypes<typeof tooltipProps>
export type TooltipComponent = DefineComponent<Omit<HTMLAttributes, keyof TooltipPublicProps> & TooltipPublicProps>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
