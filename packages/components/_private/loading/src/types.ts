/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const loadingProps = {
  strokeWidth: IxPropTypes.number.def(4),
  radius: IxPropTypes.number.def(14),
  duration: IxPropTypes.number.def(2),
}

export type LoadingProps = ExtractInnerPropTypes<typeof loadingProps>
export type LoadingPublicProps = ExtractPublicPropTypes<typeof loadingProps>
export type LoadingComponent = DefineComponent<Omit<HTMLAttributes, keyof LoadingPublicProps> & LoadingPublicProps>
export type LoadingInstance = InstanceType<DefineComponent<LoadingProps>>
