/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { portalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { overlayDelayDef, overlayPlacementDef, overlayTriggerDef } from '@idux/components/_private'

export const tooltipProps = {
  visible: IxPropTypes.bool.def(false),
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  delay: overlayDelayDef,
  placement: overlayPlacementDef,
  target: portalTargetDef,
  title: IxPropTypes.string,
  trigger: overlayTriggerDef,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type TooltipProps = IxInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = IxPublicPropTypes<typeof tooltipProps>
export type TooltipComponent = DefineComponent<Omit<HTMLAttributes, keyof TooltipPublicProps> & TooltipPublicProps>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps>>
