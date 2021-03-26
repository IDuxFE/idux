import type { App } from 'vue'

import IxSwitch from './src/Switch.vue'

IxSwitch.install = (app: App): void => {
  app.component(IxSwitch.name, IxSwitch)
}

export { IxSwitch }
export type { SwitchComponent, SwitchProps } from './src/types'
