/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

export const backTopProps = {
  count: {
    type: [String, Number],
    default: 0,
  },
  showZero: {
    type: Boolean,
    default: undefined,
  },
  overflowCount: Number,
  dot: {
    type: Boolean,
    default: undefined,
  },
  color: String,
}

export type BadgeProps = ExtractInnerPropTypes<typeof backTopProps>
export type BadgePublicProps = ExtractPublicPropTypes<typeof backTopProps>
export type BadgeComponent = DefineComponent<Omit<HTMLAttributes, keyof BadgePublicProps> & BadgePublicProps>
export type BadgeInstance = InstanceType<DefineComponent<BadgeProps>>
