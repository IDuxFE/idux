/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadRequest } from './composables/useRequest'
import type { UploadFile, UploadProps } from './types'
import type { ComputedRef, InjectionKey } from 'vue'

export type UploadToken = {
  props: UploadProps
  files: ComputedRef<UploadFile[]>
  onUpdateFiles: (file: UploadFile[]) => void
  setSelectorVisible: (isShow: boolean) => void
} & UploadRequest

export const uploadToken: InjectionKey<UploadToken> = Symbol('UploadToken')
