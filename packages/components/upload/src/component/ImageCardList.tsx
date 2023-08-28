/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, normalizeClass, onBeforeUnmount } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { type Locale } from '@idux/components/locales'
import { IxProgress } from '@idux/components/progress'
import { IxTooltip } from '@idux/components/tooltip'

import FileSelector from './Selector'
import {
  UseThumb,
  useCmpClasses,
  useIcon,
  useListClasses,
  useSelectorVisible,
  useThumb,
} from '../composables/useDisplay'
import { type FileOperation, useOperation } from '../composables/useOperation'
import { uploadToken } from '../token'
import { UploadFile, type UploadFileStatus, type UploadProps, uploadFilesProps } from '../types'
import { type IconsMap, renderOprIcon } from '../util/icon'
import { showDownload, showErrorTip, showPreview, showProgress, showRetry } from '../util/visible'

export default defineComponent({
  name: 'IxUploadImageCardList',
  props: uploadFilesProps,
  setup(listProps) {
    const { props: uploadProps, locale, files, upload, abort, onUpdateFiles, setViewerVisible } = inject(uploadToken)!
    const icons = useIcon(listProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses(uploadProps, 'imageCard')
    const [, imageCardVisible] = useSelectorVisible(uploadProps, 'imageCard')
    const showSelector = useShowSelector(uploadProps, files, imageCardVisible)
    const { getThumbNode, revokeAll } = useThumb()
    const fileOperation = useOperation(files, listProps, uploadProps, {
      abort,
      upload,
      onUpdateFiles,
      setViewerVisible,
    })
    const selectorNode = renderSelector(cpmClasses)

    onBeforeUnmount(revokeAll)

    return () => (
      <ul class={listClasses.value}>
        {showSelector.value && selectorNode}
        {files.value.map(file => renderItem(uploadProps, file, icons, cpmClasses, fileOperation, locale, getThumbNode))}
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
  locale: Locale,
  getThumbNode: UseThumb['getThumbNode'],
) {
  const fileClasses = normalizeClass({
    [`${cpmClasses.value}-file`]: true,
    [`${cpmClasses.value}-file-${file.status}`]: !!file.status,
  })
  const uploadStatusNode = renderUploadStatus(uploadProps, file, locale, cpmClasses)
  const thumbNode = getThumbNode(file)
  const { retryNode, downloadNode, removeNode, previewNode } = renderOprIcon(
    file,
    icons,
    cpmClasses,
    fileOperation,
    locale,
  )
  return (
    <IxTooltip title={showErrorTip(file.status, file.errorTip) ? file.errorTip : ''}>
      <li class={fileClasses}>
        {showUploadStatus(file.status) ? uploadStatusNode : thumbNode}
        <div class={`${cpmClasses.value}-icon`}>
          {showPreview(file.status) && previewNode}
          {showRetry(file.status) && retryNode}
          {showDownload(file.status) && downloadNode}
          {removeNode}
        </div>
      </li>
    </IxTooltip>
  )
}

function renderUploadStatus(
  uploadProps: UploadProps,
  file: UploadFile,
  locale: Locale,
  cpmClasses: ComputedRef<string>,
) {
  const statusTitle = {
    error: locale.upload.error,
    uploading: locale.upload.uploading,
  } as Record<UploadFileStatus, string>
  const curTitle = file.status && statusTitle[file.status!]
  return (
    <div class={`${cpmClasses.value}-status`}>
      {curTitle && <div class={`${cpmClasses.value}-status-title`}>{curTitle}</div>}
      {showProgress(file.status, file.percent) && (
        <IxProgress
          class={`${cpmClasses.value}-progress`}
          strokeColor="#20CC94"
          percent={file.percent}
          strokeWidth={3}
          hide-info
          {...(uploadProps.progress ?? {})}
        ></IxProgress>
      )}
    </div>
  )
}

function renderSelector(cpmClasses: ComputedRef<string>) {
  return (
    <FileSelector class={`${cpmClasses.value}-selector`}>
      <IxIcon name="plus"></IxIcon>
    </FileSelector>
  )
}

function showUploadStatus(status?: UploadFileStatus) {
  return status && ['uploading', 'error'].includes(status)
}

function useShowSelector(
  uploadProps: UploadProps,
  files: ComputedRef<UploadFile[]>,
  imageCardVisible: ComputedRef<boolean>,
) {
  return computed(() => {
    const countLimit = !uploadProps.maxCount || files.value.length < uploadProps.maxCount
    return countLimit && imageCardVisible.value
  })
}
