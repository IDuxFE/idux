import type { App } from 'vue'

import IxEmpty from './src/Empty.vue'

IxEmpty.install = (app: App): void => {
  app.component(IxEmpty.name, IxEmpty)
}

export { IxEmpty }

export type { EmptyInstance, EmptyProps } from './src/types'
