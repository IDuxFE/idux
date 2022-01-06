/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ImageComponent, ImageViewerComponent } from './src/types'

import Image from './src/Image'
import ImageViewer from './src/ImageViewer'

const IxImage = Image as unknown as ImageComponent
const IxImageViewer = ImageViewer as unknown as ImageViewerComponent

export { IxImage, IxImageViewer }

export type {
  ImageStatus,
  ImageInstance,
  ImageComponent,
  ImagePublicProps as ImageProps,
  ImageViewerInstance,
  ImageViewerComponent,
  ImageViewerPublicProps as ImageViewerProps,
} from './src/types'
