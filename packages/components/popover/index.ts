import type { App } from 'vue'

import IxPopover from './src/Popover.vue'

IxPopover.install = (app: App): void => {
  app.component(IxPopover.name, IxPopover)
}

export { IxPopover }
export * from './src/types'
