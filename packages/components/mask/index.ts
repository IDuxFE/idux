import type { App } from 'vue'

import IxMask from './src/Mask.vue'

IxMask.install = (app: App): void => {
  app.component(IxMask.name, IxMask)
}

export { IxMask }

export type { MaskComponent, MaskProps } from './src/types'
