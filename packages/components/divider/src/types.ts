/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type DividerPosition = 'left' | 'center' | 'right'
export type DividerType = 'horizontal' | 'vertical'

export const dividerProps = {
  dashed: IxPropTypes.bool,
  plain: IxPropTypes.bool,
  position: IxPropTypes.oneOf<DividerPosition>(['left', 'center', 'right']),
  type: IxPropTypes.oneOf<DividerType>(['horizontal', 'vertical']),
}

export type DividerProps = IxInnerPropTypes<typeof dividerProps>
export type DividerPublicProps = IxPublicPropTypes<typeof dividerProps>
export type DividerComponent = DefineComponent<Omit<HTMLAttributes, keyof DividerPublicProps> & DividerPublicProps>
export type DividerInstance = InstanceType<DefineComponent<DividerProps>>
