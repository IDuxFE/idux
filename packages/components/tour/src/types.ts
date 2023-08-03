/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperPlacement } from '@idux/cdk/popper'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, MaybeElement } from '@idux/cdk/utils'
import type { ButtonProps } from '@idux/components/button'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { ɵOverlayPlacementDef } from '@idux/components/_private/overlay'

export interface TargetPositionInfo {
  windowWidth: number
  windowHeight: number
  x: number
  y: number
  width: number
  height: number
  radius: number
}

export interface TargetGap {
  offset?: number
  radius?: number
}

export interface TourMaskOptions {
  color?: string
  class?: string
}

export type TargetGetter = () => MaybeElement | null | Promise<MaybeElement | null>

export interface TourStep {
  title: string
  description?: string
  gap?: number | TargetGap
  mask?: boolean | TourMaskOptions
  target?: MaybeElement | null | string | TargetGetter
  placement?: PopperPlacement
  showArrow?: boolean
  nextButton?: ButtonProps | boolean
  nextButtonText?: string
  prevButton?: ButtonProps | boolean
  prevButtonText?: string
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  beforeEnter?: () => void | Promise<void>
  afterLeave?: () => void | Promise<void>
}

export type ResolvedTourStep = Pick<TourStep, 'title' | 'description' | 'beforeEnter' | 'afterLeave'> & {
  target: () => HTMLElement | null | Promise<HTMLElement | null>
  nextButton: ButtonProps | null
  prevButton: ButtonProps | null
  gap: TargetGap
  index: number
} & Required<
    Omit<
      TourStep,
      'title' | 'description' | 'target' | 'gap' | 'beforeEnter' | 'afterLeave' | 'nextButton' | 'prevButton'
    >
  >

export const tourProps = {
  activeIndex: {
    type: Number,
    default: undefined,
  },
  visible: {
    type: Boolean,
    default: undefined,
  },

  closable: {
    type: Boolean,
    default: undefined,
  },
  closeOnClick: {
    type: Boolean,
    default: undefined,
  },
  closeOnEsc: {
    type: Boolean,
    default: undefined,
  },

  animatable: {
    type: Boolean,
    default: undefined,
  },
  gap: [Number, Object] as PropType<number | TargetGap>,
  mask: {
    type: [Boolean, Object] as PropType<boolean | TourMaskOptions>,
    default: true,
  },
  offset: Array as unknown as PropType<[number, number]>,
  overlayContainer: {
    type: [String, HTMLElement] as PropType<string | HTMLElement>,
    default: undefined,
  },
  placement: ɵOverlayPlacementDef,
  steps: Array as PropType<TourStep[]>,
  showArrow: {
    type: Boolean,
    default: undefined,
  },
  scrollIntoViewOptions: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
  },
  zIndex: Number,

  // events
  onChange: [Function, Array] as PropType<MaybeArray<(current: number, pre: number) => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  onFinish: [Function, Array] as PropType<MaybeArray<() => void>>,

  'onUpdate:activeIndex': [Function, Array] as PropType<MaybeArray<(activeIndex: number) => void>>,
  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
} as const

export type TourProps = ExtractInnerPropTypes<typeof tourProps>
export type TourPublicProps = ExtractPublicPropTypes<typeof tourProps>
export type TourComponent = DefineComponent<Omit<HTMLAttributes, keyof TourPublicProps> & TourPublicProps>
export type TourInstance = InstanceType<DefineComponent<TourProps>>
