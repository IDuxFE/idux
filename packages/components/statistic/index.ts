import type { StatisticComponent } from './src/types'

import Statistic from './src/Statistic.vue'

const IxStatistic = Statistic as unknown as StatisticComponent

export { IxStatistic }

export type { StatisticInstance, StatisticPublicProps as StatisticProps } from './src/types'
