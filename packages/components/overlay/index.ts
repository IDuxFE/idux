import type { App } from 'vue'

import IxOverlay from './src/overlay'

IxOverlay.install = (app: App): void => {
  app.component(IxOverlay.name, IxOverlay)
}

export { IxOverlay }

export type { OverlayComponent, OverlayProps } from './src/types'
