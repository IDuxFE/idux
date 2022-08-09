/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { getBoxSizingData } from '@idux/cdk/utils'

import { measureTextarea } from './measureTextarea'

/**
 * get a computedRef of line height of `<textarea>`
 *
 * @param textareaRef reference of a textarea element
 * @return ComputedRef of line height
 */
export function useLineHeight(textareaRef: Ref<HTMLTextAreaElement | undefined>): ComputedRef<number> {
  return computed(() => calcTextareaLineHeight(textareaRef.value))
}

export function calcTextareaLineHeight(textarea: HTMLTextAreaElement | undefined): number {
  if (!textarea) {
    return 0
  }

  if (!textarea.parentNode) {
    return 0
  }

  return measureTextarea(textarea, el => {
    const rows = el.rows
    const { paddingSize } = getBoxSizingData(el)

    el.rows = 1
    const lineHeight = el.scrollHeight - paddingSize
    el.rows = rows

    return lineHeight
  })
}
