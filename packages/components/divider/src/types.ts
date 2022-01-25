/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes } from 'vue'

import { type IxInnerPropTypes, IxPropTypes, type IxPublicPropTypes } from '@idux/cdk/utils'

export const dividerProps = {
  dashed: IxPropTypes.bool,
  label: IxPropTypes.string,
  labelPlacement: IxPropTypes.oneOf(['start', 'center', 'end'] as const),
  plain: IxPropTypes.bool,
  position: IxPropTypes.oneOf(['left', 'center', 'right'] as const),
  size: IxPropTypes.oneOf(['sm', 'md', 'lg'] as const),
  type: IxPropTypes.oneOf(['horizontal', 'vertical'] as const),
  vertical: IxPropTypes.bool,
}

export type DividerProps = IxInnerPropTypes<typeof dividerProps>
export type DividerPublicProps = IxPublicPropTypes<typeof dividerProps>
export type DividerComponent = DefineComponent<Omit<HTMLAttributes, keyof DividerPublicProps> & DividerPublicProps>
export type DividerInstance = InstanceType<DefineComponent<DividerProps>>
