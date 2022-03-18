/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes, vKeyPropDef } from '@idux/cdk/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any

export interface ItemData {
  key: VKey
  [propName: string]: SafeAny
}

export const overflowItemProps = {
  prefixCls: IxPropTypes.string.isRequired,
  display: IxPropTypes.bool.def(true),
  itemKey: vKeyPropDef.isRequired,
  data: IxPropTypes.object<ItemData>(),
  onSizeChange: IxPropTypes.func<(itemEl: Element, key?: VKey) => void>(),
}

export type overflowItemProps = IxInnerPropTypes<typeof overflowItemProps>
export type OverflowItemPublicProps = IxPublicPropTypes<typeof overflowItemProps>
export type OverflowItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof OverflowItemPublicProps> & OverflowItemPublicProps
>
export type OverflowItemInstance = InstanceType<DefineComponent<overflowItemProps>>
