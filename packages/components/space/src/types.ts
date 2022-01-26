/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type SpaceJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
export type SpaceDirection = 'vertical' | 'horizontal'
export type SpaceSize = 'sm' | 'md' | 'lg'

export const spaceProps = {
  align: IxPropTypes.oneOf<SpaceAlign>(['start', 'center', 'end', 'baseline', 'stretch']).def('center'),
  block: IxPropTypes.bool,
  direction: IxPropTypes.oneOf<SpaceDirection>(['vertical', 'horizontal']),
  justify: IxPropTypes.oneOf<SpaceJustify>(['start', 'center', 'end', 'space-around', 'space-between']).def('start'),
  size: IxPropTypes.oneOfType([Number, String, IxPropTypes.array<string | number>()]),
  split: IxPropTypes.string,
  separator: IxPropTypes.string,
  vertical: IxPropTypes.bool,
  wrap: IxPropTypes.bool,
}

export type SpaceProps = IxInnerPropTypes<typeof spaceProps>
export type SpacePublicProps = IxPublicPropTypes<typeof spaceProps>
export type SpaceComponent = DefineComponent<Omit<HTMLAttributes, keyof SpacePublicProps> & SpacePublicProps>
export type SpaceInstance = InstanceType<DefineComponent<SpaceProps>>
