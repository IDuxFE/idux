import type { App } from 'vue'

import IxStatistic from './src/Statistic.vue'

IxStatistic.install = (app: App): void => {
  app.component(IxStatistic.name, IxStatistic)
}

export { IxStatistic }

export type { StatisticComponent, StatisticProps } from './src/types'
