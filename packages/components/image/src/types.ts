/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export type ImageStatus = 'loading' | 'loaded' | 'failed'

const zoomValidator = {
  validator: (val: number[]) => val.length === 2,
  msg: 'zoom only accepts the length of the array is 2',
}

export const imageViewerProps = {
  visible: IxPropTypes.bool,
  activeIndex: IxPropTypes.number,
  images: IxPropTypes.array<string>().def([]),
  zoom: IxPropTypes.custom<number[]>(zoomValidator.validator, zoomValidator.msg),
  loop: IxPropTypes.bool,
  target: ɵPortalTargetDef,
  maskClosable: IxPropTypes.bool,

  'onUpdate:visible': IxPropTypes.emit<(visible: boolean) => void>(),
  'onUpdate:activeIndex': IxPropTypes.emit<(curIndex: number) => void>(),
}

export const imageProps = {
  src: IxPropTypes.string.isRequired,
  preview: IxPropTypes.bool,
  imageViewer: IxPropTypes.shape<ImageViewerProps>({ ...imageViewerProps, images: IxPropTypes.array<string>() }),
  onLoad: IxPropTypes.emit<(e: Event) => void>(),
  onError: IxPropTypes.emit<(e: Event) => void>(),
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
