/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

type SkeletonType = 'text' | 'rect' | 'round' | 'circle'

export const skeletonProps = {
  animated: IxPropTypes.bool,
  loading: IxPropTypes.bool.def(true),
  type: IxPropTypes.oneOf<SkeletonType>(['round', 'circle', 'text', 'rect']).def('text'),
  width: IxPropTypes.oneOfType([String, Number]),
  height: IxPropTypes.oneOfType([String, Number]),
  repeat: IxPropTypes.number.def(1),
}

export type SkeletonProps = IxInnerPropTypes<typeof skeletonProps>
export type SkeletonPublicProps = IxPublicPropTypes<typeof skeletonProps>
export type SkeletonComponent = DefineComponent<Omit<HTMLAttributes, keyof SkeletonPublicProps> & SkeletonPublicProps>
export type SkeletonInstance = InstanceType<DefineComponent<SkeletonProps>>
