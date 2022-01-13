/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UseThumb } from '../composables/useDisplay'
import type { FileOperation } from '../composables/useOperation'
import type { UploadFile, UploadProps } from '../types'
import type { IconsMap } from '../util/icon'
import type { Locale } from '@idux/components/i18n'
import type { ComputedRef } from 'vue'

import { defineComponent, inject, normalizeClass, onBeforeUnmount } from 'vue'

import { getLocale } from '@idux/components/i18n'
import { IxProgress } from '@idux/components/progress'
import { IxTooltip } from '@idux/components/tooltip'

import { useCmpClasses, useIcon, useListClasses, useThumb } from '../composables/useDisplay'
import { useOperation } from '../composables/useOperation'
import { uploadToken } from '../token'
import { uploadListProps } from '../types'
import { renderIcon, renderOprIcon } from '../util/icon'
import { showDownload, showErrorTip, showPreview, showProgress, showRetry } from '../util/visible'

export default defineComponent({
  name: 'IxUploadImageList',
  props: uploadListProps,
  setup(listProps) {
    const { props: uploadProps, files, upload, abort, onUpdateFiles, setViewerVisible } = inject(uploadToken)!
    const icons = useIcon(listProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses(uploadProps, 'image')
    const locale = getLocale('upload')
    const { getThumbNode, revokeAll } = useThumb()
    const fileOperation = useOperation(files, listProps, uploadProps, {
      abort,
      upload,
      onUpdateFiles,
      setViewerVisible,
    })

    onBeforeUnmount(revokeAll)

    return () =>
      files.value.length > 0 && (
        <ul class={listClasses.value}>
          {files.value.map(file =>
            renderItem(uploadProps, file, icons, cpmClasses, fileOperation, locale, getThumbNode),
          )}
        </ul>
      )
  },
})

function renderItem(
  uploadProps: UploadProps,
  file: UploadFile,
  icons: ComputedRef<IconsMap>,
  cpmClasses: ComputedRef<string>,
  fileOperation: FileOperation,
  locale: ComputedRef<Locale['upload']>,
  getThumbNode: UseThumb['getThumbNode'],
) {
  const fileClasses = normalizeClass([`${cpmClasses.value}-file`, `${cpmClasses.value}-file-${file.status}`])
  const fileNameClasses = normalizeClass([`${cpmClasses.value}-name`, `${cpmClasses.value}-name-pointer`])
  const errorTipNode = renderIcon('exclamation-circle', { class: `${cpmClasses.value}-icon-error` })
  const { retryNode, downloadNode, removeNode } = renderOprIcon(file, icons, cpmClasses, fileOperation, locale)
  return (
    <li class={fileClasses}>
      <div class={`${cpmClasses.value}-thumb-info`}>
        <span class={`${cpmClasses.value}-thumb`}>{getThumbNode(file)}</span>
        <span
          class={fileNameClasses}
          onClick={() => showPreview(file.status) && fileOperation.preview(file)}
          title={file.name}
        >
          {file.name}
        </span>
      </div>
      <div class={`${cpmClasses.value}-icon-wrap`}>
        {showErrorTip(file.status, file.errorTip) && <IxTooltip title={file.errorTip}>{errorTipNode}</IxTooltip>}
        {showRetry(file.status) && retryNode}
        {showDownload(file.status) && downloadNode}
        {removeNode}
      </div>
      {showProgress(file.status, file.percent) && (
        <IxProgress
          class={`${cpmClasses.value}-progress`}
          percent={file.percent}
          strokeColor="#20CC94"
          strokeWidth={2}
          hide-info
          {...(uploadProps.progress ?? {})}
        ></IxProgress>
      )}
    </li>
  )
}
