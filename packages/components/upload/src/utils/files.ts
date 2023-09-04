/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'

import { uniqueId } from '@idux/cdk/utils'

export function createUploadFile(file: File, options: Partial<UploadFile> = {}): UploadFile {
  const key = uniqueId()
  return {
    key,
    name: file.name,
    raw: file,
    percent: 0,
    ...options,
  }
}

export function getTargetFile(file: UploadFile, files: UploadFile[]): UploadFile | undefined {
  const matchKey = file.key !== undefined ? 'key' : 'name'
  return files.find(item => item[matchKey] === file[matchKey])
}

export function getTargetFileIndex(file: UploadFile, files: UploadFile[]): number {
  const matchKey = file.key !== undefined ? 'key' : 'name'
  return files.findIndex(item => item[matchKey] === file[matchKey])
}

export function isImage(file: File): boolean {
  return !!file.type && file.type.startsWith('image/')
}

export function filterFilesByAccept(filesSelected: File[], accept?: string[]): [File[], File[]] {
  if (!accept || accept.length === 0) {
    return [filesSelected, []]
  }
  const isMatch = (file: File, type: string) => {
    const ext = `.${file.name.split('.').pop()}`.toLowerCase()
    const baseType = file.type.replace(/\/.*$/, '').toLowerCase()
    const _type = type.toLowerCase()
    if (_type.startsWith('.')) {
      return ext === _type
    }
    if (/\/\*$/.test(_type)) {
      return baseType === _type.replace(/\/\*$/, '')
    }
    if (/^[^/]+\/[^/]+$/.test(_type)) {
      return file.type.toLowerCase() === _type
    }
    return false
  }

  const accepted: File[] = []
  const filtered: File[] = []

  filesSelected.forEach(file => {
    if (accept.some(type => isMatch(file, type))) {
      accepted.push(file)
    } else {
      filtered.push(file)
    }
  })

  return [accepted, filtered]
}

export function filterFilesByMaxCount(
  filesSelected: File[],
  curFilesCount: number,
  maxCount?: number,
): [File[], File[]] {
  if (!maxCount) {
    return [filesSelected, []]
  }
  // 当为 1 时，始终用最新上传的文件代替当前文件
  if (maxCount === 1) {
    return [filesSelected.slice(0, 1), filesSelected.slice(1)]
  }

  const remainder = maxCount - curFilesCount
  if (remainder <= 0) {
    return [[], filesSelected]
  }

  if (remainder >= filesSelected.length) {
    return [filesSelected, []]
  }

  return [filesSelected.slice(0, remainder), filesSelected.slice(remainder)]
}
