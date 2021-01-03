export interface ImageProps {
  readonly src?: string
  readonly width?: string | number
  readonly height?: string | number
  readonly fallback?: string
  readonly preview?: boolean
  readonly alt?: string
  readonly fit?: string
}
export interface ImagePreviewProps {
  readonly previewSrc?: string
}
export type ImageStatus = 'loading' | 'loaded' | 'failed'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxImageComponent extends ImageProps {}
