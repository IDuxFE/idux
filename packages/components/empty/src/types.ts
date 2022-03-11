/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const emptyProps = {
  description: IxPropTypes.string,
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  image: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
}

export type EmptyProps = ExtractInnerPropTypes<typeof emptyProps>
export type EmptyPublicProps = ExtractPublicPropTypes<typeof emptyProps>
export type EmptyComponent = DefineComponent<Omit<HTMLAttributes, keyof EmptyPublicProps> & EmptyPublicProps>
export type EmptyInstance = InstanceType<DefineComponent<EmptyProps>>
