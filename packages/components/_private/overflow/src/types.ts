/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
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

export const overflowProps = {
  maxLabel: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.oneOf(['responsive'])]).def(Number.MAX_SAFE_INTEGER),
  getKey: IxPropTypes.func<(item: SafeAny) => VKey>().isRequired,
  prefixCls: IxPropTypes.string.isRequired,
  dataSource: IxPropTypes.array().def(() => []),
}

export type OverflowProps = ExtractInnerPropTypes<typeof overflowProps>
export type OverflowItemProps = ExtractInnerPropTypes<typeof overflowItemProps>
export type OverflowPublicProps = ExtractPublicPropTypes<typeof overflowProps>
export type OverflowComponent = DefineComponent<Omit<HTMLAttributes, keyof OverflowPublicProps> & OverflowPublicProps>
export type OverflowInstance = InstanceType<DefineComponent<OverflowProps>>
