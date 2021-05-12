import type { App } from 'vue'

import IxSpin from './src/Spin.vue'

IxSpin.install = (app: App): void => {
  app.component(IxSpin.name, IxSpin)
}

export { IxSpin }

export type { SpinInstance, SpinProps } from './src/types'
