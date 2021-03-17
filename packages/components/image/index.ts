import { installComponent } from '@idux/components/core/utils'
import IxImage from './src/Image.vue'

IxImage.install = installComponent(IxImage)

export { IxImage }

export type { ImageComponent, ImageProps, ImageStatus } from './src/types'
