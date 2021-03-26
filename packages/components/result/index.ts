import type { App } from 'vue'

import IxResult from './src/Result.vue'

IxResult.install = (app: App): void => {
  app.component(IxResult.name, IxResult)
}

export { IxResult }

export type { ResultComponent, ResultProps } from './src/types'
