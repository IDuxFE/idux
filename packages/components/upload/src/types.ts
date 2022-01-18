/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { ProgressProps } from '@idux/components/progress'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

type DataType = Record<string, unknown>
export type UploadRequestHeader = Record<string, string>
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'
export type UploadRequestStatus = 'loadstart' | 'progress' | 'abort' | 'error' | 'loadend'
export type UploadFileStatus = 'selected' | 'uploading' | 'error' | 'success' | 'abort'
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
export interface UploadFile {
  key: VKey
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
export interface UploadRequestChangeOption {
  file: UploadFile
  status: UploadRequestStatus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any
  event?: UploadProgressEvent
  error?: UploadRequestError
}

export const uploadProps = {
  files: IxPropTypes.array<UploadFile>().isRequired,
  accept: IxPropTypes.string,
  action: IxPropTypes.oneOfType([String, IxPropTypes.func<(file: UploadFile) => Promise<string>>()]).isRequired,
  dragable: IxPropTypes.bool,
  directory: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  maxCount: IxPropTypes.number,
  multiple: IxPropTypes.bool,
  progress: IxPropTypes.object<ProgressProps>(),
  name: IxPropTypes.string,
  customRequest: IxPropTypes.func<(option: UploadRequestOption) => { abort: () => void }>(),
  withCredentials: IxPropTypes.bool,
  requestData: IxPropTypes.oneOfType<DataType | ((file: UploadFile) => DataType | Promise<DataType>)>([
    Object,
    IxPropTypes.func<(file: UploadFile) => DataType | Promise<DataType>>(),
  ]),
  requestHeaders: IxPropTypes.object<UploadRequestHeader>(),
  requestMethod: IxPropTypes.oneOf(['POST', 'PUT', 'PATCH', 'post', 'put', 'patch']),
  'onUpdate:files': IxPropTypes.emit<(fileList: UploadFile[]) => void>(),
  onSelect: IxPropTypes.emit<(file: File[]) => boolean | File[] | Promise<boolean | File[]>>(),
  onBeforeUpload: IxPropTypes.emit<(file: UploadFile) => boolean | UploadFile | Promise<boolean | UploadFile>>(),
  onFileStatusChange: IxPropTypes.emit<(file: UploadFile) => void>(),
  onRequestChange: IxPropTypes.emit<(option: UploadRequestChangeOption) => void>(),
}
export type UploadProps = IxInnerPropTypes<typeof uploadProps>
export type UploadPublicProps = IxPublicPropTypes<typeof uploadProps>
export type UploadComponent = DefineComponent<Omit<HTMLAttributes, keyof UploadPublicProps> & UploadPublicProps>
export type UploadInstance = InstanceType<DefineComponent<UploadProps>>

export const uploadFilesProps = {
  type: IxPropTypes.oneOf<UploadFilesType>(['text', 'image', 'imageCard']),
  icon: IxPropTypes.object<Partial<Record<UploadIconType, string | VNode>>>(),
  onDownload: IxPropTypes.emit<(file: UploadFile) => void>(),
  onPreview: IxPropTypes.emit<(file: UploadFile) => void>(),
  onRemove: IxPropTypes.emit<(file: UploadFile) => boolean | Promise<boolean>>(),
  onRetry: IxPropTypes.emit<(file: UploadFile) => void>(),
}
export type UploadFilesProps = IxInnerPropTypes<typeof uploadFilesProps>
export type UploadFilesPublicProps = IxPublicPropTypes<typeof uploadFilesProps>
export type UploadFilesComponent = DefineComponent<
  Omit<HTMLAttributes, keyof UploadFilesPublicProps> & UploadFilesPublicProps
>
export type UploadFilesInstance = InstanceType<DefineComponent<UploadFilesProps>>
