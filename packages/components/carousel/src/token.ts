/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CarouselDotTrigger } from './types'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface CarouselContext {
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  mergedTrigger: ComputedRef<CarouselDotTrigger>
  unitWidth: ComputedRef<number>
  unitHeight: ComputedRef<number>
  goTo: (index: number) => void
  cleanAutoplay: () => void
}

export const carouselToken: InjectionKey<CarouselContext> = Symbol('carousel')
