/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const iconProps = {
  iconfont: IxPropTypes.bool.def(false),
  name: IxPropTypes.string,
  rotate: IxPropTypes.oneOfType([Boolean, Number, String]),
}

export type IconProps = IxInnerPropTypes<typeof iconProps>
export type IconPublicProps = IxPublicPropTypes<typeof iconProps>
export type IconComponent = DefineComponent<Omit<HTMLAttributes, keyof IconPublicProps> & IconPublicProps>
export type IconInstance = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
