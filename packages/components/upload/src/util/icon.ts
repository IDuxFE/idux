/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FileOperation } from '../composables/useOperation'
import type { UploadFile, UploadIconType } from '../types'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

type IconNodeType = string | VNode
type Opr = 'previewNode' | 'retryNode' | 'downloadNode' | 'removeNode'

export type IconsMap = Partial<Record<UploadIconType, IconNodeType>>

export type OprIcons = Record<Opr, VNode | null>

export function getIconNode(icon: Exclude<IconNodeType, true>): VNode | null {
  if (!icon) {
    return null
  }
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}

export function renderIcon(icon: IconsMap[keyof IconsMap] | undefined, props?: Record<string, unknown>): VNode | null {
  if (!icon) {
    return null
  }
  return h('span', props, [getIconNode(icon)])
}

export function renderOprIcon(
  file: UploadFile,
  icons: ComputedRef<IconsMap>,
  cpmClasses: ComputedRef<string>,
  fileOperation: FileOperation,
  locale: Locale,
): OprIcons {
  const previewNode = renderIcon(icons.value.preview, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-preview`,
    onClick: () => fileOperation.preview(file),
    title: locale.upload.preview,
  })
  const retryNode = renderIcon(icons.value.retry, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-retry`,
    onClick: () => fileOperation.retry(file),
    title: locale.upload.retry,
  })
  const downloadNode = renderIcon(icons.value.download, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-download`,
    onClick: () => fileOperation.download(file),
    title: locale.upload.download,
  })
  const removeNode = renderIcon(icons.value.remove, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-remove`,
    onClick: () => fileOperation.remove(file),
    title: locale.upload.remove,
  })

  return {
    previewNode,
    retryNode,
    downloadNode,
    removeNode,
  }
}
