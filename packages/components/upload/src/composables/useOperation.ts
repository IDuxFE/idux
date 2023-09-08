/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadContext } from '../token'
import type { UploadFile, UploadFilesProps } from '../types'

import { callEmit } from '@idux/cdk/utils'

import { getTargetFile, getTargetFileIndex } from '../utils/files'

export interface FileOperation {
  abort: (file: UploadFile) => void
  retry: (file: UploadFile) => void
  download: (file: UploadFile) => void
  preview: (file: UploadFile) => void
  remove: (file: UploadFile) => void
}

export function useOperation(listProps: UploadFilesProps, context: UploadContext): FileOperation {
  const { fileList, props: uploadProps, abort: _abort, upload, setViewerVisible, updateFiles } = context
  const abort = (file: UploadFile) => {
    _abort(file)
  }

  const retry = (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    upload(file)
    callEmit(listProps.onRetry, file)
  }

  const download = (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    callEmit(listProps.onDownload, file)
  }

  const preview = (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    if (!listProps.onPreview && file.thumbUrl) {
      setViewerVisible(true, file.thumbUrl)
      return
    }
    callEmit(listProps.onPreview, file)
  }

  const remove = async (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    const curFile = getTargetFile(file, fileList.value)
    if (!curFile) {
      return
    }
    const allRemove = callEmit(listProps.onRemove, curFile)
    if (allRemove === false) {
      return
    }
    if (allRemove instanceof Promise) {
      const result = await allRemove
      if (result === false) {
        return
      }
    }
    if (curFile.status === 'uploading') {
      abort(curFile)
    }
    const preFiles = [...fileList.value]
    preFiles.splice(getTargetFileIndex(curFile, fileList.value), 1)
    updateFiles(preFiles, true)
  }

  return {
    abort,
    retry,
    download,
    preview,
    remove,
  }
}
