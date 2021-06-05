import type { App } from 'vue'

import IxRate from './src/Rate.vue'

IxRate.install = (app: App): void => {
  app.component(IxRate.name, IxRate)
}

export { IxRate }

export type { RateInstance, RateProps } from './src/types'
