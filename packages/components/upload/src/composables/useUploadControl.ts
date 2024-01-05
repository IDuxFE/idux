/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadRequest } from './useRequest'
import type { UploadFile } from '../types'

import { type ComputedRef, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

import { getTargetFile } from '../utils/files'

export function useUploadControl(fileList: ComputedRef<UploadFile[]>, uploadRequest: UploadRequest): void {
  const { startUpload, abort } = uploadRequest

  const [proxyedFileList, setProxyedFileList] = useState<UploadFile[]>([...fileList.value])

  watch(
    fileList,
    _fileList => {
      setProxyedFileList([..._fileList])
    },
    {
      deep: true,
    },
  )

  watch(
    [proxyedFileList, () => proxyedFileList.value.length],
    ([currentFileList, currentLength], [preFileList, preLength]) => {
      if (currentLength === preLength && currentLength !== 1 && preLength !== 1) {
        return
      }

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
    },
  )
}
