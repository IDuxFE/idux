import type { App } from 'vue'

import IxDrawer from './src/Drawer.vue'

IxDrawer.install = (app: App): void => {
  app.component(IxDrawer.name, IxDrawer)
}

export { IxDrawer }

export type { DrawerInstance, DrawerProps } from './src/types'
