/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadProgressEvent, UploadProps, UploadRequestOption } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { Ref } from 'vue'

import { ref } from 'vue'

import { isFunction, isUndefined } from 'lodash-es'

import { callEmit, throwError } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { getTargetFile, getTargetFileIndex, setFileStatus } from '../util/file'
import defaultUpload from '../util/request'

export interface UploadRequest {
  fileUploading: Ref<UploadFile[]>
  abort: (file: UploadFile) => void
  startUpload: (file: UploadFile) => void
  upload: (file: UploadFile) => void
}

export function useRequest(props: UploadProps): UploadRequest {
  const fileUploading: Ref<UploadFile[]> = ref([])
  const aborts = new Map<VKey, () => void>([])
  const config = useGlobalConfig('upload')

  function abort(file: UploadFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    const curAbort = aborts.get(curFile.uid)
    curAbort?.()
    setFileStatus(curFile, 'abort', props.onFileStatusChange)
    fileUploading.value.splice(getTargetFileIndex(curFile, fileUploading.value), 1)
    aborts.delete(curFile.uid)
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'abort',
        file: { ...curFile },
      })
  }

  async function startUpload(file: UploadFile): Promise<void> {
    if (isUndefined(props.onBeforeUpload)) {
      await upload(file)
      return
    }
    const before = callEmit(props.onBeforeUpload, file)
    if (before instanceof Promise) {
      try {
        const result = await before
        if (result === true) {
          await upload(file)
          return
        }
        if (typeof result === 'object' && result) {
          await upload(result)
        }
      } catch (e) {
        setFileStatus(file, 'error', props.onFileStatusChange)
      }
    } else if (before === true) {
      await upload(file)
    } else if (typeof before === 'object') {
      await upload(before)
    }
  }

  async function upload(file: UploadFile) {
    if (!file.raw) {
      file.error = new Error('file error')
      setFileStatus(file, 'error', props.onFileStatusChange)
    }
    const action = await getAction(props, file)
    const requestData = await getRequestData(props, file)
    const requestOption = {
      file: file.raw,
      filename: props.name ?? config.name,
      withCredentials: props.withCredentials ?? config.withCredentials,
      action: action,
      requestHeaders: props.requestHeaders ?? {},
      requestMethod: props.requestMethod ?? config.requestMethod,
      requestData: requestData,
      onProgress: (e: UploadProgressEvent) => _onProgress(e, file),
      onError: (error: Error) => _onError(error, file),
      onSuccess: (res: Response) => _onSuccess(res, file),
    } as UploadRequestOption
    const uploadHttpRequest = props.customRequest ?? config.customRequest ?? defaultUpload

    setFileStatus(file, 'uploading', props.onFileStatusChange)
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'loadstart',
        file: { ...file },
      })
    file.percent = 0
    aborts.set(file.uid, uploadHttpRequest(requestOption)?.abort ?? (() => {}))
    fileUploading.value.push(file)
  }

  function _onProgress(e: UploadProgressEvent, file: UploadFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    curFile.percent = e.percent ?? 0
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'progress',
        file: { ...curFile },
        e,
      })
  }

  function _onError(error: Error, file: UploadFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    fileUploading.value.splice(getTargetFileIndex(curFile, fileUploading.value), 1)
    setFileStatus(curFile, 'error', props.onFileStatusChange)
    curFile.error = error
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        file: { ...curFile },
        status: 'error',
      })
  }

  function _onSuccess(res: Response, file: UploadFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    curFile.response = res
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'loadend',
        file: { ...curFile },
      })
    setFileStatus(curFile, 'success', props.onFileStatusChange)
    fileUploading.value.splice(getTargetFileIndex(curFile, fileUploading.value), 1)
  }

  return {
    fileUploading,
    abort,
    startUpload,
    upload,
  }
}

async function getAction(props: UploadProps, file: UploadFile) {
  if (!props.action) {
    throwError('components/upload', 'action not found.')
  }
  const action = isFunction(props.action) ? await props.action(file) : props.action
  return action
}

async function getRequestData(props: UploadProps, file: UploadFile) {
  const requestData = isFunction(props.requestData) ? await props.requestData(file) : props.requestData ?? {}
  return requestData
}
