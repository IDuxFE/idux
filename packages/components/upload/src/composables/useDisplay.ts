/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadFilesProps, UploadFilesType, UploadProps } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef, ShallowRef, VNode } from 'vue'

import { computed, h, isProxy, normalizeClass, shallowRef } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { isImage } from '../util/fileHandle'

export function useCmpClasses(): ComputedRef<string> {
  const commonPrefix = useGlobalConfig('common')
  return computed(() => `${commonPrefix.prefixCls}-upload`)
}

export function useListClasses(props: UploadProps, type: UploadFilesType): ComputedRef<string> {
  const cpmClasses = useCmpClasses()
  return computed(() =>
    normalizeClass([
      `${cpmClasses.value}-list`,
      `${cpmClasses.value}-list-${type}`,
      { [`${cpmClasses.value}-list-disabled`]: props.disabled },
    ]),
  )
}

export function useIcon(props: UploadFilesProps): ComputedRef<IconsMap> {
  const uploadFilesConfig = useGlobalConfig('uploadFiles')
  return computed(() => props.icon ?? uploadFilesConfig.icon)
}

export function useSelectorVisible(
  props: UploadProps,
  listType: ComputedRef<UploadFilesType> | UploadFilesType,
): ComputedRef<boolean>[] {
  // imageCard自带selector，drag统一用外部
  const outerSelector = computed(
    () =>
      props.dragable ||
      (isProxy(listType) ? (listType as ComputedRef<UploadFilesType>).value !== 'imageCard' : listType !== 'imageCard'),
  )
  const imageCardSelector = computed(() => !outerSelector.value)
  return [outerSelector, imageCardSelector]
}

export interface UseThumb {
  revokeList: ShallowRef<(() => void)[]>
  getThumbNode: (file: UploadFile) => VNode | null
  revokeAll: () => void
}

export function useThumb(): UseThumb {
  const revokeList: ShallowRef<(() => void)[]> = shallowRef([])

  const getThumbNode = (file: UploadFile): VNode | null => {
    if (!file.thumbUrl && file.raw && isImage(file.raw)) {
      file.thumbUrl = window.URL.createObjectURL(file.raw)
      // 用于释放缩略图引用
      revokeList.value.push(() => {
        window.URL.revokeObjectURL(file.thumbUrl!)
        Reflect.deleteProperty(file, 'thumbUrl')
      })
    }
    if (!file.thumbUrl) {
      return null
    }
    return h('img', {
      src: file.thumbUrl,
      alt: file.name,
      style: { height: '100%', width: '100%' },
    })
  }

  const revokeAll = () => {
    revokeList.value.forEach(revokeFn => revokeFn())
    revokeList.value = []
  }

  return {
    revokeList,
    getThumbNode,
    revokeAll,
  }
}
