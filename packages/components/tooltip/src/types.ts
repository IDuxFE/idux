/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { ɵOverlayDelayDef, ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private/overlay'

export const tooltipProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  autoAdjust: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHide: {
    type: Boolean,
    default: undefined,
  },
  delay: ɵOverlayDelayDef,
  placement: ɵOverlayPlacementDef,
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  title: String,
  trigger: ɵOverlayTriggerDef,
  zIndex: Number,

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
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
