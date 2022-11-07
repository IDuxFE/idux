/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type SpaceJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
export type SpaceDirection = 'vertical' | 'horizontal'
export type SpaceSize = 'sm' | 'md' | 'lg'

export const spaceProps = {
  align: String as PropType<SpaceAlign>,
  block: {
    type: Boolean,
    default: undefined,
  },
  justify: String as PropType<SpaceJustify>,
  itemless: Boolean,
  size: [Number, String, Array] as PropType<number | string | (string | number)[]>,
  separator: String,
  vertical: {
    type: Boolean,
    default: undefined,
  },
  wrap: {
    type: Boolean,
    default: undefined,
  },
}

export type SpaceProps = ExtractInnerPropTypes<typeof spaceProps>
export type SpacePublicProps = ExtractPublicPropTypes<typeof spaceProps>
export type SpaceComponent = DefineComponent<Omit<HTMLAttributes, keyof SpacePublicProps> & SpacePublicProps>
export type SpaceInstance = InstanceType<DefineComponent<SpaceProps>>
