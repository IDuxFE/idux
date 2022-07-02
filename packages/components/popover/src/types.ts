/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

import { ɵTooltipProps } from '@idux/components/tooltip'

export const popoverProps = {
  ...ɵTooltipProps,
  closable: {
    type: Boolean,
    default: false,
  },
  closeIcon: [String, Object] as PropType<string | VNode>,
  header: [String, Object] as PropType<string | HeaderProps>,
  content: String,
} as const

export type PopoverProps = ExtractInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = ExtractPublicPropTypes<typeof popoverProps>
export interface PopoverBindings {
  updatePopper: () => void
}
export type PopoverComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PopoverPublicProps> & PopoverPublicProps,
  PopoverBindings
>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps, PopoverBindings>>
