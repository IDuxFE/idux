/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const carouselProps = {
  autoplayTime: { type: Number, default: undefined },
  dotPlacement: { type: String as PropType<CarouselDotPlacement>, default: undefined },
  showArrow: { type: Boolean, default: undefined },
  trigger: { type: String as PropType<CarouselDotTrigger>, default: undefined },
  onChange: [Function, Array] as PropType<MaybeArray<(prevIndex: number, nextIndex: number) => void>>,
} as const

export interface CarouselBindings {
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export type CarouselProps = ExtractInnerPropTypes<typeof carouselProps>
export type CarouselPublicProps = ExtractPublicPropTypes<typeof carouselProps>
export type CarouselComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CarouselPublicProps> & CarouselPublicProps,
  CarouselBindings
>
export type CarouselInstance = InstanceType<DefineComponent<CarouselProps, CarouselBindings>>

export type CarouselDotPlacement = 'top' | 'start' | 'bottom' | 'end' | 'none'
export type CarouselDotTrigger = 'click' | 'hover'
