/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ImageStatus = 'loading' | 'loaded' | 'failed'

const zoomValidator = {
  validator: (val: number[]) => val.length === 2,
  msg: 'zoom only accepts the length of the array is 2',
}

export const imageViewerProps = {
  visible: {
    type: Boolean,
    default: undefined,
  },
  activeIndex: Number,
  images: {
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
  zoom: IxPropTypes.custom<number[]>(zoomValidator.validator, zoomValidator.msg),
  loop: {
    type: Boolean,
    default: undefined,
  },
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },

  'onUpdate:visible': [Function, Array] as PropType<MaybeArray<(visible: boolean) => void>>,
  'onUpdate:activeIndex': [Function, Array] as PropType<MaybeArray<(curIndex: number) => void>>,
}

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
}

export type ImageProps = ExtractInnerPropTypes<typeof imageProps>
export type ImagePublicProps = ExtractPublicPropTypes<typeof imageProps>
export type ImageComponent = DefineComponent<Omit<HTMLAttributes, keyof ImagePublicProps> & ImagePublicProps>
export type ImageInstance = InstanceType<DefineComponent<ImageProps>>

export type ImageViewerProps = ExtractInnerPropTypes<typeof imageViewerProps>
export type ImageViewerPublicProps = ExtractPublicPropTypes<typeof imageViewerProps>
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
