/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FilesDataContext } from './useFilesData'
import type { FilteredFile, UploadProps } from '../types'

import { computed } from 'vue'

import { isArray, isNil } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { createUploadFile, filterFilesByAccept, filterFilesByMaxCount } from '../utils/files'

export function useFileSelect(
  props: UploadProps,
  filesDataContext: FilesDataContext,
): (files: File[]) => Promise<void> {
  const { fileList, updateFiles } = filesDataContext
  const accept = computed(() =>
    props.accept
      ?.split(',')
      .map(type => type.trim())
      .filter(Boolean),
  )
  const maxCount = computed(() => props.maxCount ?? 0)

  const filterSelectFiles = (files: File[]): [File[], FilteredFile[]] => {
    const [acceptedFiles, acceptFilteredFiles] = filterFilesByAccept(files, accept.value)
    const [countAllowdFiles, countFilteredFiles] = filterFilesByMaxCount(
      acceptedFiles,
      fileList.value.length,
      maxCount.value,
    )

    const filteredFiles: FilteredFile[] = [
      ...acceptFilteredFiles.map(file => ({ file, reason: 'acceptNotMatch' as const })),
      ...countFilteredFiles.map(file => ({ file, reason: 'maxCountExceeded' as const })),
    ]

    return [countAllowdFiles, filteredFiles]
  }

  const selecFiles = async (files: File[]) => {
    const [allowdFiles, filteredFiles] = filterSelectFiles(files)

    const onSelectResult = props.onSelect && (await callEmit(props.onSelect, allowdFiles, filteredFiles))

    /* eslint-disable indent */
    const resolvedAllowedFiles =
      isNil(onSelectResult) || onSelectResult === true
        ? allowdFiles
        : onSelectResult === false
          ? []
          : isArray(onSelectResult)
            ? onSelectResult
            : []
    /* eslint-enable indent */

    const uploadFiles = resolvedAllowedFiles.map(file => createUploadFile(file, { status: 'selected' }))

    if (
      filteredFiles.filter(file => file.reason === 'maxCountExceeded').length > 0 ||
      (props.maxCount === 1 && fileList.value.length > 0)
    ) {
      callEmit(props.onMaxCountExceeded)
    }

    if (props.maxCount === 1) {
      updateFiles(uploadFiles, true)
    } else {
      updateFiles(uploadFiles)
    }
  }

  return selecFiles
}
