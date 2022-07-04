/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

type SkeletonType = 'text' | 'rect' | 'round' | 'circle'

export const skeletonProps = {
  animated: {
    type: Boolean,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<SkeletonType>,
    default: 'text',
  },
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
  repeat: {
    type: Number,
    default: 1,
  },
} as const

export type SkeletonProps = ExtractInnerPropTypes<typeof skeletonProps>
export type SkeletonPublicProps = ExtractPublicPropTypes<typeof skeletonProps>
export type SkeletonComponent = DefineComponent<Omit<HTMLAttributes, keyof SkeletonPublicProps> & SkeletonPublicProps>
export type SkeletonInstance = InstanceType<DefineComponent<SkeletonProps>>
