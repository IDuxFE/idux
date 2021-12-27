/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FileOperation } from '../composables/useOperation'
import type { UploadFile, UploadIconType } from '../types'
import type { Locale } from '@idux/components/i18n'
import type { ComputedRef, VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

const iconMap = {
  file: 'paper-clip',
  preview: 'zoom-in',
  download: 'download',
  remove: 'delete',
  retry: 'edit',
} as const

type IconNodeType = string | boolean | VNode
type Opr = 'previewNode' | 'retryNode' | 'downloadNode' | 'removeNode'

export type IconsMap = Partial<Record<UploadIconType, Exclude<IconNodeType, true>>>

export type OprIcons = Record<Opr, VNode | null>

export function getIconNode(icon: Exclude<IconNodeType, true>): VNode | null {
  if (icon === false) {
    return null
  }
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}

export function getIcons(iconProp: Partial<Record<UploadIconType, IconNodeType>>): IconsMap {
  const iconFormat = {} as IconsMap
  let icon: UploadIconType
  for (icon in iconProp) {
    // 默认值
    if (iconProp[icon] === true) {
      iconFormat[icon] = iconMap[icon]
    } else {
      iconFormat[icon] = iconProp[icon] as Exclude<IconNodeType, true>
    }
  }
  return iconFormat
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
  locale: ComputedRef<Locale['upload']>,
): OprIcons {
  const previewNode = renderIcon(icons.value.preview, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-preview`,
    onClick: () => fileOperation.preview(file),
    title: locale.value.preview,
  })
  const retryNode = renderIcon(icons.value.retry, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-retry`,
    onClick: () => fileOperation.retry(file),
    title: locale.value.retry,
  })
  const downloadNode = renderIcon(icons.value.download, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-download`,
    onClick: () => fileOperation.download(file),
    title: locale.value.download,
  })
  const removeNode = renderIcon(icons.value.remove, {
    class: `${cpmClasses.value}-icon-opr ${cpmClasses.value}-icon-remove`,
    onClick: () => fileOperation.remove(file),
    title: locale.value.remove,
  })

  return {
    previewNode,
    retryNode,
    downloadNode,
    removeNode,
  }
}
