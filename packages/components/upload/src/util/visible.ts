/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFileStatus } from '../types'

import { isNumber } from 'lodash-es'

export function showProgress(status?: UploadFileStatus, percent?: number): boolean {
  return status === 'uploading' && isNumber(percent)
}

export function showErrorTip(status?: UploadFileStatus, errorTip?: string): boolean {
  return status === 'error' && !!errorTip
}

export function showRetry(status?: UploadFileStatus): boolean {
  return status === 'error'
}

export function showDownload(status?: UploadFileStatus): boolean {
  return status === 'success'
}

export function showPreview(status?: UploadFileStatus): boolean {
  return status === 'success'
}
