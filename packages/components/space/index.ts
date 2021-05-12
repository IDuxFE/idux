import type { App } from 'vue'

import IxSpace from './src/space'

IxSpace.install = (app: App): void => {
  app.component(IxSpace.name, IxSpace)
}

export { IxSpace }

export type { SpaceInstance, SpaceProps, SpaceAlign, SpaceDirection } from './src/types'

export type { SpaceSize } from '@idux/components/config'
