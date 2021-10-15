/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type TagShape = 'round' | 'rect'

export const tagProps = {
  checkable: IxPropTypes.bool,
  checked: IxPropTypes.bool,
  closable: IxPropTypes.bool,
  color: IxPropTypes.string,
  icon: IxPropTypes.string,
  shape: IxPropTypes.oneOf<TagShape>(['round', 'rect']),
}

export type TagProps = IxInnerPropTypes<typeof tagProps>
export type TagPublicProps = IxPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>
