import type { App } from 'vue'

import IxImage from './src/Image.vue'

IxImage.install = (app: App): void => {
  app.component(IxImage.name, IxImage)
}

export { IxImage }

export type { ImageInstance, ImageProps, ImageStatus } from './src/types'
