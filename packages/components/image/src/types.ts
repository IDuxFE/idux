import type { DefineComponent } from 'vue'

interface ImageOriginalProps {
  src?: string
  width?: string | number
  height?: string | number
  fallback?: string
  preview?: boolean
  alt?: string
  fit?: string
}
interface ImagePreviewOriginalProps {
  previewSrc?: string
}

export type ImageProps = Readonly<ImageOriginalProps>

export type ImagePreviewProps = Readonly<ImagePreviewOriginalProps>

export type ImageStatus = 'loading' | 'loaded' | 'failed'

export type IxImageComponent = InstanceType<DefineComponent<ImageProps>>
