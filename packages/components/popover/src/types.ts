/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵTooltipProps } from '@idux/components/tooltip'

export const popoverProps = {
  ...ɵTooltipProps,
  closable: IxPropTypes.bool.def(false),
  closeIcon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  content: IxPropTypes.string,
}

export type PopoverProps = IxInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = IxPublicPropTypes<typeof popoverProps>
export interface PopoverBindings {
  updatePopper: () => void
}
export type PopoverComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PopoverPublicProps> & PopoverPublicProps,
  PopoverBindings
>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps, PopoverBindings>>
