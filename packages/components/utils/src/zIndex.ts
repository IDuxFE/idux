/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, ref, watch } from 'vue'

import { isFunction, isNil } from 'lodash-es'

let zIndexCount = 0

type UseZIndex = (
  controlZIndex: Ref<number | undefined>,
  configZIndex: Ref<number | (() => number)>,
  visible: Ref<boolean>,
) => ComputedRef<number>

export const useZIndex: UseZIndex = (controlZIndex, configZIndex, visible) => {
  const getZIndex = () => {
    const zIndex = configZIndex.value
    if (isFunction(zIndex)) {
      return zIndex()
    }
    return zIndex + zIndexCount++
  }

  const innerZIndex = ref(0)

  watch(
    visible,
    newVisible => {
      if (newVisible && isNil(controlZIndex.value)) {
        innerZIndex.value = getZIndex()
      }
    },
    { immediate: true },
  )

  return computed(() => controlZIndex.value ?? innerZIndex.value)
}
