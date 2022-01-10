/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref, watch } from 'vue'

export interface ScrollVisibleContext {
  scrollVisible: ComputedRef<boolean>
  showScroll: () => void
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

  const showScroll = () => {
    visible.value = true
  }

  const hideScroll = () => {
    visible.value = false
  }

  watch(scrollTop, showScroll, { flush: 'post' })

  return { scrollVisible, showScroll, hideScroll }
}
