import type { DefineComponent } from 'vue'

export type ImageStatus = 'loading' | 'loaded' | 'failed'

export interface ImageProps {
  src?: string
  width?: string | number
  height?: string | number
  fallback?: string
  preview?: boolean
  alt?: string
  fit?: string
}

export type ImageComponent = InstanceType<DefineComponent<ImageProps>>

export interface ImagePreviewProps {
  previewSrc?: string
}
