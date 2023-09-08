/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadDrag } from './composables/useDrag'
import type { FilesDataContext } from './composables/useFilesData'
import type { UploadRequest } from './composables/useRequest'
import type { UploadProps } from './types'
import type { Locale } from '@idux/components/locales'
import type { InjectionKey } from 'vue'

export interface UploadContext extends UploadRequest, UploadDrag, FilesDataContext {
  props: UploadProps
  locale: Locale
  selectFiles: (files: File[]) => Promise<void>
  setViewerVisible: (visible: boolean, imageSrc?: string) => void
  setSelectorVisible: (isShow: boolean) => void
}

export const uploadToken: InjectionKey<UploadContext> = Symbol('UploadToken')
