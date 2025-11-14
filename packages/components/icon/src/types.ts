/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const iconProps = {
  name: String,
  iconfont: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: [Boolean, Number, String] as PropType<boolean | string | number>,
    default: undefined,
  },
  color: String,
  size: [String, Number] as PropType<string | number>,
  ariaPressed: {
    type: String,
    default: undefined,
  },
} as const

export type IconProps = ExtractInnerPropTypes<typeof iconProps>
export type IconPublicProps = ExtractPublicPropTypes<typeof iconProps>
export type IconComponent = DefineComponent<Omit<HTMLAttributes, keyof IconPublicProps> & IconPublicProps>
export type IconInstance = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svg: string
}
