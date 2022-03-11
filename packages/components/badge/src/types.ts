/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  count: IxPropTypes.oneOfType([Number, String]).def(0),
  showZero: IxPropTypes.bool,
  overflowCount: IxPropTypes.number,
  dot: IxPropTypes.bool,
  color: IxPropTypes.string,
}

export type BadgeProps = ExtractInnerPropTypes<typeof backTopProps>
export type BadgePublicProps = ExtractPublicPropTypes<typeof backTopProps>
export type BadgeComponent = DefineComponent<Omit<HTMLAttributes, keyof BadgePublicProps> & BadgePublicProps>
export type BadgeInstance = InstanceType<DefineComponent<BadgeProps>>
