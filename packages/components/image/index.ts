/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ImageComponent } from './src/types'

import Image from './src/Image.vue'

const IxImage = Image as unknown as ImageComponent

export { IxImage }

export type { ImageInstance, ImagePublicProps as ImageProps, ImageStatus } from './src/types'
