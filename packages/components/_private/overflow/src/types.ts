/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const overflowProps = {
  maxLabelCount: IxPropTypes.oneOfType([IxPropTypes.number, IxPropTypes.oneOf(['responsive'])]).def(
    Number.MAX_SAFE_INTEGER,
  ),
  itemKey: IxPropTypes.string.isRequired,
  prefixCls: IxPropTypes.string.isRequired,
  dataSource: IxPropTypes.array().def(() => []),
}

export type OverflowProps = IxInnerPropTypes<typeof overflowProps>
export type OverflowPublicProps = IxPublicPropTypes<typeof overflowProps>
export type OverflowComponent = DefineComponent<Omit<HTMLAttributes, keyof OverflowPublicProps> & OverflowPublicProps>
export type OverflowInstance = InstanceType<DefineComponent<OverflowProps>>
