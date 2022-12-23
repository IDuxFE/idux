/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, customRef, watch } from 'vue'

import { getBoxSizingData } from '../utils/getBoxSizingData'
import { measureTextarea } from '../utils/measureTextarea'

/**
 * get a computedRef of line height of `<textarea>`
 *
 * @param textareaRef reference of a textarea element
 * @return ComputedRef of line height
 */
export function useLineHeight(textareaRef: Ref<HTMLTextAreaElement | undefined>): Ref<number> {
  let lineHeight = 0

  return customRef((track, trigger) => {
    watch(textareaRef, () => {
      lineHeight = calcTextareaLineHeight(textareaRef.value)
      trigger()
    })

    return {
      get() {
        if (!textareaRef.value) {
          return 0
        }

        const value = lineHeight || (lineHeight = calcTextareaLineHeight(textareaRef.value))
        track()
        return value
      },
      set() {
        // this is readonly, no setter provided
      },
    }
  })
}

function calcTextareaLineHeight(textarea: HTMLTextAreaElement | undefined): number {
  if (!textarea) {
    return 0
  }

  if (!textarea.parentNode) {
    return 0
  }

  return measureTextarea(
    textarea,
    el => {
      const rows = el.rows
      const { paddingSize } = getBoxSizingData(el)

      el.rows = 1
      el.value = 'x'
      const lineHeight = el.scrollHeight - paddingSize
      el.rows = rows

      return lineHeight > 0 ? lineHeight : 0
    },
    false,
  )
}
