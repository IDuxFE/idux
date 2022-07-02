/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions, PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const overlayPlacementDef = String as PropType<PopperPlacement>
export const overlayTriggerDef = String as PropType<PopperTrigger>
export const overlayDelayDef = [Number, Array] as PropType<number | [number | null, number | null]>

export const overlayProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  allowEnter: {
    type: Boolean,
    default: undefined,
  },
  autoAdjust: {
    type: Boolean,
    default: undefined,
  },
  clickOutside: {
    type: Boolean,
    default: undefined,
  },
  delay: overlayDelayDef,
  destroyOnHide: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  offset: Array as unknown as PropType<[number, number]>,
  placement: overlayPlacementDef,
  showArrow: {
    type: Boolean,
    default: undefined,
  },
  target: {
    type: [String, HTMLElement, Function] as PropType<string | HTMLElement | (() => string | HTMLElement)>,
    required: true,
  },
  transitionName: String,
  trigger: overlayTriggerDef,
  triggerId: { type: null, default: undefined },
  zIndex: Number,

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  'onUpdate:placement': [Function, Array] as PropType<MaybeArray<(placement: PopperPlacement) => void>>,
  onAfterLeave: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export interface OverlayBindings {
  updatePopper: (options?: Partial<PopperOptions>) => void
  forceUpdatePopper: () => void
}

export type OverlayProps = ExtractInnerPropTypes<typeof overlayProps>
export type OverlayPublicProps = ExtractPublicPropTypes<typeof overlayProps>
export type OverlayComponent = DefineComponent<
  Omit<HTMLAttributes, keyof OverlayPublicProps> & OverlayPublicProps,
  OverlayBindings
>
export type OverlayInstance = InstanceType<DefineComponent<OverlayProps, OverlayBindings>>
