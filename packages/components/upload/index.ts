/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadComponent, UploadListComponent } from './src/types'

import UploadList from './src/List'
import Upload from './src/Upload'

const IxUpload = Upload as unknown as UploadComponent
const IxUploadList = UploadList as unknown as UploadListComponent

export { IxUpload, IxUploadList }

export type {
  UploadRawFile,
  UploadListType,
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
  UploadListInstance,
  UploadListComponent,
  UploadListPublicProps as UploadListProps,
} from './src/types'
