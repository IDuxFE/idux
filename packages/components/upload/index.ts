/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadComponent, UploadFilesComponent } from './src/types'

import UploadFiles from './src/List'
import Upload from './src/Upload'

const IxUpload = Upload as unknown as UploadComponent
const IxUploadFiles = UploadFiles as unknown as UploadFilesComponent

export { IxUpload, IxUploadFiles }

export type {
  UploadFilesType,
  UploadRequestMethod,
  UploadRequestStatus,
  UploadFileStatus,
  UploadProgressEvent,
  UploadFile,
  UploadRequestOption,
  UploadRequestChangeOption,
  UploadIconType,
  UploadInstance,
  UploadComponent,
  UploadPublicProps as UploadProps,
  UploadFilesInstance,
  UploadFilesComponent,
  UploadFilesPublicProps as UploadFilesProps,
} from './src/types'
