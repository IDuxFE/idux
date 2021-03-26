import { installComponent } from '@idux/components/utils'
import IxStatistic from './src/Statistic.vue'

IxStatistic.install = installComponent(IxStatistic)

export { IxStatistic }

export type { StatisticComponent, StatisticProps } from './src/types'
