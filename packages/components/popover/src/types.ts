/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵTooltipProps } from '@idux/components/tooltip'

export const popoverProps = {
  ...ɵTooltipProps,
  content: IxPropTypes.string,
}

export type PopoverProps = IxInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = IxPublicPropTypes<typeof popoverProps>
export type PopoverComponent = DefineComponent<Omit<HTMLAttributes, keyof PopoverPublicProps> & PopoverPublicProps>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps>>
