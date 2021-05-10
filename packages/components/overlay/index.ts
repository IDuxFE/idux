import type { App } from 'vue'

import IxOverlay from './src/Overlay.vue'

IxOverlay.install = (app: App): void => {
  app.component(IxOverlay.name, IxOverlay)
}

export { IxOverlay }

export type { OverlayComponent, OverlayProps } from './src/types'
