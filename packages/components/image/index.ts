import type { ImageComponent } from './src/types'

import Image from './src/Image.vue'

const IxImage = Image as unknown as ImageComponent

export { IxImage }

export type { ImageInstance, ImagePublicProps as ImageProps, ImageStatus } from './src/types'
