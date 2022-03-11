/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type DotPlacement = 'top' | 'start' | 'bottom' | 'end' | 'none'
const dotPlacement: DotPlacement[] = ['top', 'start', 'bottom', 'end', 'none']

export type DotTrigger = 'click' | 'hover'
const dotTrigger: DotTrigger[] = ['click', 'hover']

export const carouselProps = {
  autoplayTime: IxPropTypes.number,
  dotPlacement: IxPropTypes.oneOf<DotPlacement>(dotPlacement),
  showArrow: IxPropTypes.bool,
  trigger: IxPropTypes.oneOf<DotTrigger>(dotTrigger),
  onChange: IxPropTypes.emit<(prevIndex: number, nextIndex: number) => void>(),
}

export interface CarouselBindings {
  next: () => void
  prev: () => void
  goTo: (slideIndex: number) => void
}

export type CarouselProps = ExtractInnerPropTypes<typeof carouselProps>
export type CarouselPublicProps = ExtractPublicPropTypes<typeof carouselProps>
export type CarouselComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CarouselPublicProps> & CarouselPublicProps,
  CarouselBindings
>
export type CarouselInstance = InstanceType<DefineComponent<CarouselProps, CarouselBindings>>
