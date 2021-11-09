/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableProps } from '../types'
import type { ColumnsContext } from './useColumns'
import type { ScrollContext } from './useScroll'
import type { ComputedRef } from 'vue'

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
    if (scrollHorizontal.value || isSticky.value || hasEllipsis.value || props.virtual) {
      return 'fixed'
    }
    return 'auto'
  })
}
