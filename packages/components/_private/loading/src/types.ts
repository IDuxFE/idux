/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

export const loadingProps = {
  strokeWidth: {
    type: Number,
    default: 4,
  },
  radius: {
    type: Number,
    default: 14,
  },
  duration: {
    type: Number,
    default: 2,
  },
} as const

export type LoadingProps = ExtractInnerPropTypes<typeof loadingProps>
export type LoadingPublicProps = ExtractPublicPropTypes<typeof loadingProps>
export type LoadingComponent = DefineComponent<Omit<HTMLAttributes, keyof LoadingPublicProps> & LoadingPublicProps>
export type LoadingInstance = InstanceType<DefineComponent<LoadingProps>>
