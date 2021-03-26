import type { App } from 'vue'

import IxBackTop from './src/BackTop.vue'

IxBackTop.install = (app: App): void => {
  app.component(IxBackTop.name, IxBackTop)
}

export { IxBackTop }

export type { BackTopComponent, BackTopProps } from './src/types'
