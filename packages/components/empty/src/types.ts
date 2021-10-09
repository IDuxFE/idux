/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const emptyProps = {
  description: IxPropTypes.string,
  image: IxPropTypes.string,
}

export type EmptyProps = IxInnerPropTypes<typeof emptyProps>
export type EmptyPublicProps = IxPublicPropTypes<typeof emptyProps>
export type EmptyComponent = DefineComponent<Omit<HTMLAttributes, keyof EmptyPublicProps> & EmptyPublicProps>
export type EmptyInstance = InstanceType<DefineComponent<EmptyProps>>
