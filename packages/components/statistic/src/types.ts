/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { NumFormatter } from '@idux/components/config'

export const statisticProps = {
  formatter: IxPropTypes.func<NumFormatter>(),
  precision: IxPropTypes.number,
  prefix: IxPropTypes.string,
  suffix: IxPropTypes.string,
  title: IxPropTypes.string,
  value: IxPropTypes.oneOfType([String, Number]).def(''),
}

export type StatisticProps = ExtractInnerPropTypes<typeof statisticProps>
export type StatisticPublicProps = ExtractPublicPropTypes<typeof statisticProps>
export type StatisticComponent = DefineComponent<
  Omit<HTMLAttributes, keyof StatisticPublicProps> & StatisticPublicProps
>
export type StatisticInstance = InstanceType<DefineComponent<StatisticProps>>
