/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, ref, watch } from 'vue'

import { isNil } from 'lodash-es'

const zIndexCount = ref(0)

type UseZIndex = (
  controlZIndex: Ref<number | undefined>,
  commonZIndex: Ref<number>,
  visible: Ref<boolean>,
) => {
  currentZIndex: ComputedRef<number>
  nextZIndex: () => number
}
export const useZIndex: UseZIndex = (controlZIndex, commonZIndex, visible) => {
  const innerZIndex = ref(commonZIndex.value + zIndexCount.value)
  const currentZIndex = computed(() => controlZIndex.value ?? innerZIndex.value)
  const nextZIndex = () => {
    if (isNil(controlZIndex.value)) {
      innerZIndex.value = commonZIndex.value + zIndexCount.value
      zIndexCount.value++
    }
    return currentZIndex.value
  }

  watch(
    visible,
    newVisible => {
      if (newVisible) {
        nextZIndex()
      }
    },
    { immediate: true },
  )
  return { currentZIndex, nextZIndex }
}
