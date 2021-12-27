/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadFileStatus } from '../types'

import { callEmit, uniqueId } from '@idux/cdk/utils'

export function getFileInfo(file: File, options: Partial<UploadFile> = {}): UploadFile {
  const uid = uniqueId()
  return {
    uid,
    name: file.name,
    raw: Object.assign(file, { uid }),
    percent: 0,
    ...options,
  }
}

export function getTargetFile(file: UploadFile, files: UploadFile[]): UploadFile | undefined {
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  return files.find(item => item[matchKey] === file[matchKey])
}

export function getTargetFileIndex(file: UploadFile, files: UploadFile[]): number {
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  return files.findIndex(item => item[matchKey] === file[matchKey])
}

export function isImage(file: File): boolean {
  return !!file.type && file.type.startsWith('image/')
}

export function setFileStatus(
  file: UploadFile,
  status: UploadFileStatus,
  onFileStatusChange?: ((file: UploadFile) => void) | ((file: UploadFile) => void)[],
): void {
  file.status = status
  onFileStatusChange && callEmit(onFileStatusChange, file)
}

export function getFilesAcceptAllow(filesSelected: File[], accept?: string[]): File[] {
  if (!accept || accept.length === 0) {
    return filesSelected
  }
  return filesSelected.filter(file => {
    const extension = file.name.indexOf('.') > -1 ? `.${file.name.split('.').pop()}` : ''
    const baseType = file.type.replace(/\/.*$/, '')
    return accept.some(type => {
      if (type.startsWith('.')) {
        return extension === type
      }
      if (/\/\*$/.test(type)) {
        return baseType === type.replace(/\/\*$/, '')
      }
      if (/^[^/]+\/[^/]+$/.test(type)) {
        return file.type === type
      }
      return false
    })
  })
}

export function getFilesCountAllow(filesSelected: File[], curFilesCount: number, maxCount?: number): File[] {
  if (!maxCount) {
    return filesSelected
  }
  // 当为 1 时，始终用最新上传的文件代替当前文件
  if (maxCount === 1) {
    return filesSelected.slice(0, 1)
  }
  const remainder = maxCount - curFilesCount
  if (remainder <= 0) {
    return []
  }
  if (remainder >= filesSelected.length) {
    return filesSelected
  }
  return filesSelected.slice(0, remainder)
}
