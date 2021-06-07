import type { DefineComponent } from 'vue'
import { NumFormatter } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const statisticProps = {
  formatter: IxPropTypes.func<NumFormatter>(),
  precision: IxPropTypes.number,
  prefix: IxPropTypes.string,
  suffix: IxPropTypes.string,
  title: IxPropTypes.string,
  value: IxPropTypes.oneOfType([String, Number]).def(''),
}

export type StatisticProps = IxExtractPropTypes<typeof statisticProps>

export type StatisticInstance = InstanceType<DefineComponent<StatisticProps>>
