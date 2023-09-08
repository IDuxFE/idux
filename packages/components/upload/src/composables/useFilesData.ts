/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadProps } from '../types'
import type { ComputedRef } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

import { getTargetFileIndex } from '../utils/files'

export interface FilesDataContext {
  fileList: ComputedRef<UploadFile[]>
  updateFiles: (files: UploadFile[], replace?: boolean) => void
}

export function useFilesData(props: UploadProps): FilesDataContext {
  const [fileList, setFileList] = useControlledProp(props, 'files')

  const updateFiles = (files: UploadFile[], replace = false) => {
    const newFileList = replace ? files : [...fileList.value]
    const statusChangeFiles: UploadFile[] = []

    files.forEach(file => {
      const index = getTargetFileIndex(file, fileList.value)
      const oldFile = fileList.value[index]

      if (index > -1 && !oldFile) {
        return
      }

      if (oldFile?.status !== file.status) {
        statusChangeFiles.push(file)
      }

      if (replace) {
        return
      }

      if (index === -1) {
        newFileList.push(file)
      } else {
        newFileList.splice(index, 1, file)
      }
    })

    setFileList(newFileList)

    statusChangeFiles.forEach(file => {
      callEmit(props.onFileStatusChange, file)
    })
  }

  return {
    fileList,
    updateFiles,
  }
}
