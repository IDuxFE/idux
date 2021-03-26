import type { App } from 'vue'

import IxProgress from './src/Progress.vue'

IxProgress.install = (app: App): void => {
  app.component(IxProgress.name, IxProgress)
}

export { IxProgress }

export type { ProgressComponent, ProgressProps } from './src/types'
