/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { NumFormatter } from '@idux/components/config'

export const statisticProps = {
  formatter: Function as PropType<NumFormatter>,
  precision: Number,
  prefix: String,
  suffix: String,
  title: String,
  value: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
} as const

export type StatisticProps = ExtractInnerPropTypes<typeof statisticProps>
export type StatisticPublicProps = ExtractPublicPropTypes<typeof statisticProps>
export type StatisticComponent = DefineComponent<
  Omit<HTMLAttributes, keyof StatisticPublicProps> & StatisticPublicProps
>
export type StatisticInstance = InstanceType<DefineComponent<StatisticProps>>
