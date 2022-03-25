/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵOverlayDelayDef, ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private/overlay'

export const tooltipProps = {
  visible: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  destroyOnHide: IxPropTypes.bool,
  delay: ɵOverlayDelayDef,
  placement: ɵOverlayPlacementDef,
  target: ɵPortalTargetDef,
  title: IxPropTypes.string,
  trigger: ɵOverlayTriggerDef,
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
}

export type TooltipProps = ExtractInnerPropTypes<typeof tooltipProps>
export type TooltipPublicProps = ExtractPublicPropTypes<typeof tooltipProps>
export interface TooltipBindings {
  updatePopper: () => void
}
export type TooltipComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TooltipPublicProps> & TooltipPublicProps,
  TooltipBindings
>
export type TooltipInstance = InstanceType<DefineComponent<TooltipProps, TooltipBindings>>
