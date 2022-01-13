/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadToken } from '../token'
import type { UploadFile, UploadListProps, UploadProps } from '../types'
import type { ComputedRef } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { getTargetFile, getTargetFileIndex } from '../util/fileHandle'

export interface FileOperation {
  abort: (file: UploadFile) => void
  retry: (file: UploadFile) => void
  download: (file: UploadFile) => void
  preview: (file: UploadFile) => void
  remove: (file: UploadFile) => void
}

export function useOperation(
  files: ComputedRef<UploadFile[]>,
  listProps: UploadListProps,
  uploadProps: UploadProps,
  opr: Pick<UploadToken, 'abort' | 'upload' | 'onUpdateFiles' | 'setViewerVisible'>,
): FileOperation {
  const abort = (file: UploadFile) => {
    opr.abort(file)
  }

  const retry = (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    opr.upload(file)
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
      opr.setViewerVisible(true, file.thumbUrl)
      return
    }
    callEmit(listProps.onPreview, file)
  }

  const remove = async (file: UploadFile) => {
    if (uploadProps.disabled) {
      return
    }
    const curFile = getTargetFile(file, files.value)
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
    const preFiles = [...files.value]
    preFiles.splice(getTargetFileIndex(curFile, files.value), 1)
    opr.onUpdateFiles(preFiles)
  }

  return {
    abort,
    retry,
    download,
    preview,
    remove,
  }
}
