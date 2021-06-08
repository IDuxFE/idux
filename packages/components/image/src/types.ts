import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const imageProps = {
  src: IxPropTypes.string.def(''),
  width: IxPropTypes.oneOfType([String, Number]),
  height: IxPropTypes.oneOfType([String, Number]),
  preview: IxPropTypes.bool.def(false),
  fallback: IxPropTypes.string,
  alt: IxPropTypes.string.def(''),
  objectFit: IxPropTypes.string.def('fill'),
}

export type ImageProps = IxExtractPropTypes<typeof imageProps>

export type ImageInstance = InstanceType<DefineComponent<ImageProps>>

export const imagePreviewProps = {
  previewSrc: IxPropTypes.string.def(''),
}

export type ImagePreviewProps = IxExtractPropTypes<typeof imagePreviewProps>

export type ImagePreviewInstance = InstanceType<DefineComponent<ImagePreviewProps>>

export type ImageStatus = 'loading' | 'loaded' | 'failed'
