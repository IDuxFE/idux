/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type CollapseTransitionMode = 'height' | 'width'

export const collapseTransitionProps = {
  appear: {
    type: Boolean,
    default: false,
  },
  name: String,
  mode: {
    type: String as PropType<CollapseTransitionMode>,
    default: 'height',
  },
  onAfterEnter: [Function, Array] as PropType<MaybeArray<() => void>>,
  onAfterLeave: [Function, Array] as PropType<MaybeArray<() => void>>,
}

export type CollapseTransitionProps = ExtractInnerPropTypes<typeof collapseTransitionProps>
export type CollapseTransitionPublicProps = ExtractPublicPropTypes<typeof collapseTransitionProps>
export type CollapseTransitionComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CollapseTransitionPublicProps> & CollapseTransitionPublicProps
>
export type CollapseTransitionInstance = InstanceType<DefineComponent<CollapseTransitionProps>>
