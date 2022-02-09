/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'lg' | 'md' | 'sm'

export const spinProps = {
  strokeWidth: IxPropTypes.number,
  radius: IxPropTypes.number,
  duration: IxPropTypes.number,
  spinning: IxPropTypes.bool.def(true),
  rotate: IxPropTypes.bool.def(true),
  icon: IxPropTypes.string,
  tip: IxPropTypes.string,
  tipAlign: IxPropTypes.oneOf(['horizontal', 'vertical'] as const),
  size: IxPropTypes.oneOf(['lg', 'md', 'sm'] as const),
}

export type SpinProps = IxInnerPropTypes<typeof spinProps>
export type SpinPublicProps = IxPublicPropTypes<typeof spinProps>
export type SpinComponent = DefineComponent<Omit<HTMLAttributes, keyof SpinPublicProps> & SpinPublicProps>
export type SpinInstance = InstanceType<DefineComponent<SpinProps>>
