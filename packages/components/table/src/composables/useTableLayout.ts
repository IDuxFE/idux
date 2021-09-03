import type { ComputedRef } from 'vue'
import type { ColumnsContext } from './useColumns'
import type { ScrollContext } from './useScroll'
import type { TableProps } from '../types'

import { computed } from 'vue'

export function useTableLayout(
  props: TableProps,
  { hasEllipsis, hasFixed }: ColumnsContext,
  { scrollVertical, scrollX, scrollHorizontal }: ScrollContext,
  isSticky: ComputedRef<boolean>,
): ComputedRef<'auto' | 'fixed'> {
  return computed(() => {
    if (props.tableLayout) {
      return props.tableLayout
    }
    if (scrollVertical.value && hasFixed.value) {
      return scrollX.value === 'max-content' ? 'auto' : 'fixed'
    }
    if (scrollHorizontal.value || isSticky.value || hasEllipsis.value) {
      return 'fixed'
    }
    return 'auto'
  })
}
