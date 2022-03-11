/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const maskProps = {
  mask: IxPropTypes.bool.def(true),
  transitionName: IxPropTypes.string.def('ix-fade'),
  visible: IxPropTypes.bool.def(true),
  zIndex: IxPropTypes.number,
}

export type MaskProps = ExtractInnerPropTypes<typeof maskProps>
export type MaskPublicProps = ExtractPublicPropTypes<typeof maskProps>
export type MaskComponent = DefineComponent<Omit<HTMLAttributes, keyof MaskPublicProps> & MaskPublicProps>
export type MaskInstance = InstanceType<DefineComponent<MaskProps>>
