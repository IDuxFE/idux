/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type TagShape = 'round' | 'rect' | 'round-rect'

export const tagProps = {
  closable: IxPropTypes.bool,
  icon: IxPropTypes.string,
  color: IxPropTypes.string,
  checked: IxPropTypes.bool,
  checkable: IxPropTypes.bool,
  shape: IxPropTypes.oneOf<TagShape>(['round', 'rect', 'round-rect']),

  onClose: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type TagProps = IxInnerPropTypes<typeof tagProps>
export type TagPublicProps = IxPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>
