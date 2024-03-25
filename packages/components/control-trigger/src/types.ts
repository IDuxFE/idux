/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, Slot } from 'vue'

import { ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private/overlay'
import { ɵTriggerDefaultSlotParams, ɵTriggerPropsDefs, ɵTriggerSlots } from '@idux/components/_private/trigger'

export const controlTriggerProps = {
  ...ɵTriggerPropsDefs,

  autofocus: { type: Boolean, default: undefined },
  offset: Array as unknown as PropType<[number, number]>,
  open: { type: Boolean, default: undefined },
  overlayClassName: { type: String, default: undefined },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayContainerFallback: String,
  overlayMatchWidth: { type: [Boolean, String] as PropType<boolean | 'minWidth'>, default: undefined },

  // events
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onKeydown: [Function, Array] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
  onOverlayAfterLeave: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export const controlTrigglerOverlayProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  placement: ɵOverlayPlacementDef,
  trigger: ɵOverlayTriggerDef,
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  showArrow: {
    type: Boolean,
    default: undefined,
  },
  onAfterLeave: [Function, Array] as PropType<MaybeArray<() => void>>,
}

export interface ControlTriggerBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type ControlTriggerSlots = {
  suffix?: ɵTriggerSlots['suffix']
  clearIcon?: ɵTriggerSlots['clearIcon']
  trigger?: Slot<ɵTriggerDefaultSlotParams & { opened: boolean }>
  default?: Slot<ɵTriggerDefaultSlotParams & { opened: boolean }>
  overlay?: Slot<{ opened: boolean }>
}
export type ControlTriggerProps = ExtractInnerPropTypes<typeof controlTriggerProps>
export type ControlTriggerPublicProps = ExtractPublicPropTypes<typeof controlTriggerProps>
export type ControlTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ControlTriggerPublicProps> & ControlTriggerPublicProps,
  ControlTriggerBindings
>
export type ControlTriggerInstance = InstanceType<DefineComponent<ControlTriggerProps, ControlTriggerBindings>>

export interface ControlTriggerOverlayBindings {
  updatePopper: () => void
}

export type ControlTriggerOverlayProps = ExtractInnerPropTypes<typeof controlTrigglerOverlayProps>
export type ControlTriggerOverlayPublicProps = ExtractPublicPropTypes<typeof controlTrigglerOverlayProps>
export type ControlTriggerOverlayComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ControlTriggerOverlayPublicProps> & ControlTriggerOverlayPublicProps,
  ControlTriggerOverlayBindings
>
export type ControlTriggerOverlayInstance = InstanceType<
  DefineComponent<ControlTriggerOverlayProps, ControlTriggerOverlayBindings>
>
