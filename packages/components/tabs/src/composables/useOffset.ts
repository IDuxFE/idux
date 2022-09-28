/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface Offset {
  selectedElOffset: ComputedRef<number>
  syncSelectedElOffset: () => void
}

export function useSelectedElOffset(
  isHorizontal: ComputedRef<boolean>,
  navPreNextSize: ComputedRef<number>,
  selectedElRef: Ref<HTMLElement | null>,
): Offset {
  const [selectedLeft, setSelectedLeft] = useState(0)
  const [selectedTop, setSelectedTop] = useState(0)

  const selectedElOffset = computed(
    () => (isHorizontal.value ? selectedLeft.value : selectedTop.value) + navPreNextSize.value,
  )

  const syncSelectedElOffset = () => {
    setSelectedLeft(selectedElRef.value?.offsetLeft ?? 0)
    setSelectedTop(selectedElRef.value?.offsetTop ?? 0)
  }

  return {
    selectedElOffset,
    syncSelectedElOffset,
  }
}
