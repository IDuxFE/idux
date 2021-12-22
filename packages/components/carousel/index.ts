/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CarouselComponent } from './src/types'

import Carousel from './src/Carousel'

const IxCarousel = Carousel as unknown as CarouselComponent

export { IxCarousel }

export type {
  CarouselInstance,
  CarouselComponent,
  CarouselPublicProps as CarouselProps,
  DotPlacement,
  DotTrigger,
} from './src/types'
