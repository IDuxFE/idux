/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconInstance } from '@idux/components/icon'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

export interface NavRelatedElSize {
  navSize: ComputedRef<number>
  navWrapperSize: ComputedRef<number>
  navPreNextSize: ComputedRef<number>
  selectedElSize: ComputedRef<number>
  syncNavRelatedElSize: () => void
}

export function useNavRelatedElSize(
  isHorizontal: ComputedRef,
  navWrapperElRef: Ref<HTMLElement | null>,
  navElRef: Ref<HTMLElement | null>,
  navPreElRef: Ref<IconInstance | null>,
  selectedElRef: Ref<HTMLElement | null>,
): NavRelatedElSize {
  const navWrapperWidth = ref(0)
  const navWidth = ref(0)
  const navWrapperHeight = ref(0)
  const navHeight = ref(0)
  const navPreNextWidth = ref(0)
  const navPreNextHeight = ref(0)

  const navSize = computed(() => (isHorizontal.value ? navWidth.value : navHeight.value))

  const navWrapperSize = computed(() => (isHorizontal.value ? navWrapperWidth.value : navWrapperHeight.value))

  const navPreNextSize = computed(() => (isHorizontal.value ? navPreNextWidth.value : navPreNextHeight.value))

  const selectedElSize = computed(() => {
    if (isHorizontal.value) {
      return selectedElRef.value?.offsetWidth ?? 0
    } else {
      return selectedElRef.value?.offsetHeight ?? 0
    }
  })

  const syncNavRelatedElSize = () => {
    navPreNextWidth.value = navPreElRef.value?.$el.offsetWidth ?? 0
    navPreNextHeight.value = navPreElRef.value?.$el.offsetHeight ?? 0
    navWrapperWidth.value = (navWrapperElRef.value?.offsetWidth ?? 0) - navPreNextSize.value * 2
    navWidth.value = navElRef.value?.offsetWidth ?? 0
    navWrapperHeight.value = (navWrapperElRef.value?.offsetHeight ?? 0) - navPreNextSize.value * 2
    navHeight.value = navElRef.value?.offsetHeight ?? 0
  }

  return {
    navSize,
    navWrapperSize,
    navPreNextSize,
    selectedElSize,
    syncNavRelatedElSize,
  }
}

export function useVisibleSize(
  navWrapperSize: ComputedRef<number>,
  selectedElOffset: ComputedRef<number>,
  navOffset: Ref<number>,
): ComputedRef<number> {
  return computed(() => {
    return navWrapperSize.value - (selectedElOffset.value - navOffset.value)
  })
}
