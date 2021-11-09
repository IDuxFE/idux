/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, onBeforeUnmount, ref, watch } from 'vue'

import { throttle } from 'lodash-es'

export interface ScrollVisibleContext {
  scrollVisible: ComputedRef<boolean>
  hideScroll: () => void
}

export function useScrollVisible(
  props: VirtualScrollProps,
  scrollTop: Ref<number>,
  scrollHeight: Ref<number>,
): ScrollVisibleContext {
  const visible = ref(false)

  const scrollVisible = computed(() => {
    if (props.height >= scrollHeight.value) {
      return false
    }
    return visible.value
  })

  let timer: number
  const hideScroll = throttle(() => {
    clearTimeout(timer)
    visible.value = true
    timer = setTimeout(() => (visible.value = false), 1200)
  }, 300)

  watch(scrollTop, hideScroll, { flush: 'post' })

  onBeforeUnmount(() => clearTimeout(timer))

  return { scrollVisible, hideScroll }
}
