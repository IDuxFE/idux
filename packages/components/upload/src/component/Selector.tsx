/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadDrag } from '../composables/useDrag'
import type { UploadToken } from '../token'
import type { UploadFileStatus, UploadProps } from '../types'
import type { UploadConfig } from '@idux/components/config'
import type { ComputedRef, Ref, ShallowRef } from 'vue'

import { computed, defineComponent, inject, nextTick, normalizeClass, ref, shallowRef, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { useCmpClasses } from '../composables/useDisplay'
import { useDrag } from '../composables/useDrag'
import { uploadToken } from '../token'
import { getFileInfo, getFilesAcceptAllow, getFilesCountAllow } from '../util/file'

export default defineComponent({
  name: 'IxUploadSelector',
  setup(props, { slots }) {
    const {
      props: uploadProps,
      onUpdateFiles,
      startUpload,
    } = inject(uploadToken, {
      props: {},
      onUpdateFiles: () => {},
      startUpload: () => {},
    } as unknown as UploadToken)
    const cpmClasses = useCmpClasses()
    const config = useGlobalConfig('upload')
    const dir = useDir(uploadProps, config)
    const multiple = useMultiple(uploadProps, config)
    const dragable = useDragable(uploadProps, config)
    const accept = useAccept(uploadProps)
    const maxCount = computed(() => uploadProps.maxCount ?? 0)
    const {
      allowDrag,
      dragOver,
      filesSelected: dragFilesSelected,
      onDrop,
      onDragOver,
      onDragLeave,
    } = useDrag(uploadProps)
    const [filesSelected, updateFilesSelected] = useFilesSelected(dragFilesSelected, allowDrag)
    const filesReady = useFilesAllowed(uploadProps, filesSelected, accept, maxCount)
    const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
    const inputClasses = computed(() => `${cpmClasses.value}-input`)
    const selectorClasses = useSelectorClasses(uploadProps, cpmClasses, dragable, dragOver)

    syncUploadHandle(uploadProps, filesReady, onUpdateFiles, startUpload)

    return () => {
      return (
        <div
          class={selectorClasses.value}
          onClick={() => onClick(fileInputRef, uploadProps)}
          onDragover={onDragOver}
          onDrop={onDrop}
          onDragleave={onDragLeave}
        >
          <input
            {...dir.value}
            class={inputClasses.value}
            type="file"
            ref={fileInputRef}
            accept={uploadProps.accept}
            multiple={multiple.value}
            onClick={e => e.stopPropagation()}
            onChange={() => onSelect(fileInputRef, updateFilesSelected)}
          />
          {slots.default?.()}
        </div>
      )
    }
  },
})

function useSelectorClasses(
  props: UploadProps,
  cpmClasses: ComputedRef<string>,
  dragable: ComputedRef<boolean>,
  dragOver: Ref<boolean>,
) {
  return computed(() =>
    normalizeClass({
      [`${cpmClasses.value}-selector`]: true,
      [`${cpmClasses.value}-selector-drag`]: dragable.value,
      [`${cpmClasses.value}-selector-disabled`]: props.disabled,
      [`${cpmClasses.value}-selector-dragover`]: dragOver.value,
    }),
  )
}

function useDir(props: UploadProps, config: UploadConfig) {
  const directoryCfg = { directory: 'directory', webkitdirectory: 'webkitdirectory' }
  return computed(() => (props.directory ?? config.directory ? directoryCfg : {}))
}

function useAccept(props: UploadProps) {
  return computed(() =>
    props.accept
      ?.split(',')
      .map(type => type.trim())
      .filter(type => type),
  )
}

function useMultiple(props: UploadProps, config: UploadConfig) {
  return computed(() => props.multiple ?? config.multiple)
}

function useDragable(props: UploadProps, config: UploadConfig) {
  return computed(() => props.dragable ?? config.dragable)
}

function useFilesSelected(
  dragFilesSelected: UploadDrag['filesSelected'],
  allowDrag: UploadDrag['allowDrag'],
): [ShallowRef<File[]>, (files: File[]) => void] {
  const filesSelected: ShallowRef<File[]> = shallowRef([])

  watch(dragFilesSelected, files => {
    if (allowDrag.value) {
      filesSelected.value = files
    }
  })

  function updateFilesSelected(files: File[]) {
    filesSelected.value = files
  }

  return [filesSelected, updateFilesSelected]
}

function useFilesAllowed(
  uploadProps: UploadProps,
  filesSelected: ShallowRef<File[]>,
  accept: ComputedRef<string[] | undefined>,
  maxCount: ComputedRef<number>,
) {
  const filesAllowed: ShallowRef<File[]> = shallowRef([])

  watch(filesSelected, files => {
    const filesCheckAccept = getFilesAcceptAllow(files, accept.value)
    filesAllowed.value = getFilesCountAllow(filesCheckAccept, uploadProps.files.length, maxCount.value)
  })

  return filesAllowed
}

// 选中文件变化就处理上传
function syncUploadHandle(
  uploadProps: UploadProps,
  filesReady: ShallowRef<File[]>,
  onUpdateFiles: UploadToken['onUpdateFiles'],
  startUpload: UploadToken['startUpload'],
) {
  watch(filesReady, async files => {
    if (files.length === 0) {
      return
    }
    const filesAfterHandle = uploadProps.onSelect ? await callEmit(uploadProps.onSelect, files) : files
    const filesReadyUpload = getFilesHandled(filesAfterHandle!, files)
    const filesFormat = getFormatFiles(filesReadyUpload, uploadProps, 'selected')
    const filesIds = filesFormat.map(file => file.uid)
    if (uploadProps.maxCount === 1) {
      callEmit(onUpdateFiles, filesFormat)
    } else {
      callEmit(onUpdateFiles, uploadProps.files.concat(filesFormat))
    }

    // 需要用props的files，已做了响应式处理，对status属性改变能够触发更新
    await nextTick(() => {
      uploadProps.files
        .filter(item => filesIds.includes(item.uid))
        .forEach(file => {
          startUpload(file)
        })
    })
  })
}

function onClick(fileInputRef: Ref<HTMLInputElement | null>, props: UploadProps) {
  if (props.disabled || !fileInputRef.value) {
    return
  }
  fileInputRef.value.value = ''
  fileInputRef.value.click()
}

function onSelect(fileInputRef: Ref<HTMLInputElement | null>, updateFilesSelected: (files: File[]) => void) {
  const files = Array.prototype.slice.call(fileInputRef.value?.files ?? []) as File[]
  updateFilesSelected(files)
}

// 文件对象初始化
function getFormatFiles(files: File[], props: UploadProps, status: UploadFileStatus) {
  return files.map(item => {
    const fileInfo = getFileInfo(item, { status })
    callEmit(props.onFileStatusChange, fileInfo)
    return fileInfo
  })
}

function getFilesHandled(handleResult: boolean | File[], allowedFiles: File[]) {
  if (handleResult === true) {
    return allowedFiles
  }
  if (handleResult === false) {
    return []
  }
  return handleResult
}
