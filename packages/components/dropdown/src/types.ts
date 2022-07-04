/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { ɵOverlayPlacementDef, ɵOverlayTriggerDef } from '@idux/components/_private/overlay'

export const dropdownProps = {
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
  disabled: {
    type: Boolean,
    default: false,
  },
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  offset: Array as unknown as PropType<[number, number]>,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  placement: ɵOverlayPlacementDef,
  showArrow: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  trigger: ɵOverlayTriggerDef,

  // events
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
} as const

export type DropdownProps = ExtractInnerPropTypes<typeof dropdownProps>
export type DropdownPublicProps = Omit<ExtractPublicPropTypes<typeof dropdownProps>, 'target'>
export type DropdownComponent = DefineComponent<Omit<HTMLAttributes, keyof DropdownPublicProps> & DropdownPublicProps>
export type DropdownInstance = InstanceType<DefineComponent<DropdownProps>>
