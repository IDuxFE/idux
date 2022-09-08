/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type ImageStatus = 'loading' | 'loaded' | 'failed'

export const imageViewerProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  activeIndex: Number,
  container: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  images: {
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
  zoom: {
    type: Array as PropType<number[]>,
    validator: (val: number[]) => val.length === 2,
  },
  loop: {
    type: Boolean,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @deprecated please use `container` instead'
   */
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  zIndex: Number,

  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  'onUpdate:activeIndex': [Function, Array] as PropType<MaybeArray<(curIndex: number) => void>>,
} as const

export const imageProps = {
  src: {
    type: String,
    required: true,
  },
  preview: {
    type: Boolean,
    default: undefined,
  },
  imageViewer: Object as PropType<ImageViewerProps>,
  onLoad: [Function, Array] as PropType<MaybeArray<(e: Event) => void>>,
  onError: [Function, Array] as PropType<MaybeArray<(e: Event) => void>>,
} as const

export type ImageProps = ExtractInnerPropTypes<typeof imageProps>
export type ImagePublicProps = ExtractPublicPropTypes<typeof imageProps>
export type ImageComponent = DefineComponent<Omit<HTMLAttributes, keyof ImagePublicProps> & ImagePublicProps>
export type ImageInstance = InstanceType<DefineComponent<ImageProps>>

export type ImageViewerProps = ExtractInnerPropTypes<typeof imageViewerProps>
export type ImageViewerPublicProps = Omit<ExtractPublicPropTypes<typeof imageViewerProps>, 'target'>
export type ImageViewerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ImageViewerPublicProps> & ImageViewerPublicProps
>
export type ImageViewerInstance = InstanceType<DefineComponent<ImageViewerProps>>

// private
export interface OprType {
  icon: string
  key: string
  opr: () => void
  visible: boolean
  disabled?: boolean
}

export type ScaleType = 'in' | 'out'
export type RotateType = 'left' | 'right'
export type GoType = 'previous' | 'next'
