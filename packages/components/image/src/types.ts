import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type ImageStatus = 'loading' | 'loaded' | 'failed'

export const imageProps = {
  src: IxPropTypes.string.def(''),
  width: IxPropTypes.oneOfType([String, Number]),
  height: IxPropTypes.oneOfType([String, Number]),
  preview: IxPropTypes.bool.def(false),
  fallback: IxPropTypes.string,
  alt: IxPropTypes.string.def(''),
  objectFit: IxPropTypes.string.def('fill'),
}

export type ImageProps = IxInnerPropTypes<typeof imageProps>
export type ImagePublicProps = IxPublicPropTypes<typeof imageProps>
export type ImageComponent = DefineComponent<HTMLAttributes & typeof imageProps>
export type ImageInstance = InstanceType<DefineComponent<ImageProps>>

export const imagePreviewProps = {
  previewSrc: IxPropTypes.string.def(''),
}

export type ImagePreviewProps = IxInnerPropTypes<typeof imagePreviewProps>
export type ImagePreviewPublicProps = IxPublicPropTypes<typeof imagePreviewProps>
export type ImagePreviewComponent = DefineComponent<HTMLAttributes & typeof imagePreviewProps>
export type ImagePreviewInstance = InstanceType<DefineComponent<ImagePreviewProps>>
