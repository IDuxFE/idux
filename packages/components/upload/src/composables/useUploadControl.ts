/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadRequest } from './useRequest'
import type { UploadFile } from '../types'

import { type ComputedRef, watch } from 'vue'

import { getTargetFile } from '../utils/files'

export function useUploadControl(fileList: ComputedRef<UploadFile[]>, uploadRequest: UploadRequest): void {
  const { startUpload, abort } = uploadRequest

  watch(fileList, (currentFileList, preFileList) => {
    currentFileList.forEach(file => {
      const preFile = getTargetFile(file, preFileList)

      if (!preFile && file.status === 'selected') {
        startUpload(file)
      }
    })

    preFileList.forEach(file => {
      const currentFile = getTargetFile(file, currentFileList)

      if (!currentFile && file.status === 'uploading') {
        abort(file)
      }
    })
  })
}
