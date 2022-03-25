/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions, PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { IxPropTypes } from '@idux/cdk/utils'

export const overlayPlacementDef = IxPropTypes.oneOf<PopperPlacement>([
  'topStart',
  'top',
  'topEnd',
  'rightStart',
  'right',
  'rightEnd',
  'bottomStart',
  'bottom',
  'bottomEnd',
  'leftStart',
  'left',
  'leftEnd',
])
export const overlayTriggerDef = IxPropTypes.oneOf<PopperTrigger>(['click', 'hover', 'focus', 'contextmenu', 'manual'])
export const overlayDelayDef = IxPropTypes.oneOfType<number | [number | null, number | null]>([
  Number,
  IxPropTypes.array() as unknown as VueTypeDef<[number | null, number | null]>,
])

export const overlayProps = {
  visible: IxPropTypes.bool,
  allowEnter: IxPropTypes.bool,
  autoAdjust: IxPropTypes.bool,
  clickOutside: IxPropTypes.bool,
  delay: overlayDelayDef,
  destroyOnHide: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  placement: overlayPlacementDef,
  showArrow: IxPropTypes.bool,
  target: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]).isRequired,
  transitionName: IxPropTypes.string,
  trigger: overlayTriggerDef,
  zIndex: IxPropTypes.number,

  // events
  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  'onUpdate:placement': IxPropTypes.emit<(placement: PopperPlacement) => void>(),
  onAfterLeave: IxPropTypes.emit<() => void>(),
}

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
