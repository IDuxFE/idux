/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { ProgressProps } from '@idux/components/progress'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

type DataType = Record<string, unknown>
export type UploadRequestHeader = Record<string, string>
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'
export type UploadRequestStatus = 'loadstart' | 'progress' | 'abort' | 'error' | 'loadend'
export type UploadFileStatus = 'selected' | 'cancel' | 'uploading' | 'error' | 'success' | 'abort'
export type UploadFilesType = 'text' | 'image' | 'imageCard'
export type UploadIconType = 'file' | 'preview' | 'download' | 'remove' | 'retry'
export interface UploadProgressEvent extends ProgressEvent {
  percent?: number
}
export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}
export interface UploadFile<K = VKey> {
  key: K
  name: string
  raw?: File
  status?: UploadFileStatus
  error?: UploadRequestError
  errorTip?: string
  thumbUrl?: string
  percent?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any
}
export interface UploadRequestOption<T = unknown> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (error: UploadRequestError) => void
  onSuccess?: (body: T) => void
  name: string
  file: File
  withCredentials?: boolean
  action: string
  requestHeaders?: UploadRequestHeader
  requestMethod: UploadRequestMethod
  requestData?: DataType
}
export interface UploadRequestChangeOption<K = VKey> {
  file: UploadFile<K>
  status: UploadRequestStatus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any
  event?: UploadProgressEvent
  error?: UploadRequestError
}

export const uploadProps = {
  files: {
    type: Array as PropType<UploadFile[]>,
    default: [],
  },
  accept: String,
  action: {
    type: [String, Function] as PropType<string | ((file: UploadFile<any>) => Promise<string>)>,
    default: undefined,
  },
  dragable: {
    type: Boolean,
    default: undefined,
  },
  directory: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  maxCount: Number,
  multiple: {
    type: Boolean,
    default: undefined,
  },
  progress: Object as PropType<ProgressProps>,
  name: String,
  customRequest: Function as PropType<(option: UploadRequestOption<any>) => { abort: () => void }>,
  withCredentials: {
    type: Boolean,
    default: undefined,
  },
  requestData: [Object, Function] as PropType<DataType | ((file: UploadFile) => DataType | Promise<DataType>)>,
  requestHeaders: Object as PropType<UploadRequestHeader>,
  requestMethod: String as PropType<'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'>,
  'onUpdate:files': [Function, Array] as PropType<MaybeArray<(fileList: UploadFile<any>[]) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<(file: File[]) => boolean | File[] | Promise<boolean | File[]>>>,
  onBeforeUpload: [Function, Array] as PropType<
    MaybeArray<(file: UploadFile<any>) => boolean | UploadFile<any> | Promise<boolean | UploadFile<any>>>
  >,
  onFileStatusChange: [Function, Array] as PropType<MaybeArray<(file: UploadFile<any>) => void>>,
  onRequestChange: [Function, Array] as PropType<MaybeArray<(option: UploadRequestChangeOption<any>) => void>>,
} as const

export type UploadProps = ExtractInnerPropTypes<typeof uploadProps>
export type UploadPublicProps = ExtractPublicPropTypes<typeof uploadProps>
export type UploadComponent = DefineComponent<Omit<HTMLAttributes, keyof UploadPublicProps> & UploadPublicProps>
export type UploadInstance = InstanceType<DefineComponent<UploadProps>>

export const uploadFilesProps = {
  type: String as PropType<UploadFilesType>,
  icon: Object as PropType<Partial<Record<UploadIconType, string | VNode>>>,
  onDownload: [Function, Array] as PropType<MaybeArray<(file: UploadFile<any>) => void>>,
  onPreview: [Function, Array] as PropType<MaybeArray<(file: UploadFile<any>) => void>>,
  onRemove: [Function, Array] as PropType<MaybeArray<(file: UploadFile<any>) => boolean | Promise<boolean>>>,
  onRetry: [Function, Array] as PropType<MaybeArray<(file: UploadFile<any>) => void>>,
} as const

export type UploadFilesProps = ExtractInnerPropTypes<typeof uploadFilesProps>
export type UploadFilesPublicProps = ExtractPublicPropTypes<typeof uploadFilesProps>
export type UploadFilesComponent = DefineComponent<
  Omit<HTMLAttributes, keyof UploadFilesPublicProps> & UploadFilesPublicProps
>
export type UploadFilesInstance = InstanceType<DefineComponent<UploadFilesProps>>
