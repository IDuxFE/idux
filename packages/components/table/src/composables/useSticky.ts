import type { ComputedRef, Ref } from 'vue'
import type { TableProps, TableSticky } from '../types'

import { computed, ref } from 'vue'
import { isPlainObject } from 'lodash-es'

export function useSticky(props: TableProps): StickyContext {
  const isSticky = computed(() => !!props.sticky)

  const mergedSticky = computed(() => {
    const { sticky } = props
    const {
      offsetHead = 0,
      offsetFoot = 0,
      offsetScroll = 0,
      container = window,
    } = isPlainObject(sticky) ? (sticky as TableSticky) : {}

    return {
      offsetHead,
      offsetFoot,
      offsetScroll,
      container,
    }
  })

  const stickyScrollLeft = ref(0)

  return { isSticky, mergedSticky, stickyScrollLeft }
}

export interface StickyContext {
  isSticky: ComputedRef<boolean>
  mergedSticky: ComputedRef<Required<TableSticky>>
  stickyScrollLeft: Ref<number>
}
