/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, Ref } from 'vue'

import { computed } from 'vue'

export interface Offset {
  selectedElOffset: ComputedRef<number>
}

export function useSelectedElOffset(
  isHorizontal: ComputedRef<boolean>,
  selectedElRef: Ref<HTMLElement | null>,
): Offset {
  const selectedElOffset = computed(() => {
    if (isHorizontal.value) {
      return selectedElRef.value?.offsetLeft ?? 0
    } else {
      return selectedElRef.value?.offsetTop ?? 0
    }
  })

  return {
    selectedElOffset,
  }
}
