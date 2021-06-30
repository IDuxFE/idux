import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

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

export type StatisticProps = IxInnerPropTypes<typeof statisticProps>
export type StatisticPublicProps = IxPublicPropTypes<typeof statisticProps>
export type StatisticComponent = DefineComponent<HTMLAttributes & typeof statisticProps>
export type StatisticInstance = InstanceType<DefineComponent<StatisticProps>>
