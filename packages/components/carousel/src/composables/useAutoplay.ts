/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, computed, onBeforeUnmount, onMounted, watch } from 'vue'

import { type CarouselConfig } from '@idux/components/config'

import { type CarouselProps } from '../types'

export function useAutoplay(
  props: CarouselProps,
  config: CarouselConfig,
  activeIndex: Ref<number>,
  goTo: (index: number) => void,
): {
  startAutoplay: () => void
  cleanAutoplay: () => void
} {
  const mergedAutoplayTime = computed(() => props.autoplayTime ?? config.autoplayTime)

  let timer: number | null = null

  const cleanAutoplay = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  const startAutoplay = () => {
    cleanAutoplay()
    const autoplayTime = mergedAutoplayTime.value
    if (autoplayTime > 0) {
      timer = setTimeout(() => {
        goTo(activeIndex.value + 1)
      }, mergedAutoplayTime.value)
    }
  }

  onMounted(() => {
    watch(mergedAutoplayTime, startAutoplay, { immediate: true })
  })

  onBeforeUnmount(cleanAutoplay)

  return { startAutoplay, cleanAutoplay }
}
