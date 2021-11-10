/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

import { ref } from 'vue'

export interface FormElementContext<T> {
  elementRef: Ref<T | undefined>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useFormElement<T extends HTMLElement = HTMLElement>(): FormElementContext<T> {
  const elementRef = ref<T>()

  const focus = (options?: FocusOptions) => {
    elementRef.value?.focus(options)
  }

  const blur = () => elementRef.value?.blur()

  return { elementRef, focus, blur }
}
