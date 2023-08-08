/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type TableProps } from '../types'
import { type ColumnsContext } from './useColumns'
import { type ScrollContext } from './useScroll'

export function useTableLayout(
  props: TableProps,
  { hasEllipsis, hasFixed }: ColumnsContext,
  { scrollWidth, scrollHeight }: ScrollContext,
  isSticky: ComputedRef<boolean>,
  mergedAutoHeight: ComputedRef<boolean>,
): ComputedRef<'auto' | 'fixed'> {
  return computed(() => {
    if (props.tableLayout) {
      return props.tableLayout
    }
    if (scrollWidth.value && hasFixed.value) {
      return scrollWidth.value === 'max-content' ? 'auto' : 'fixed'
    }
    if (scrollHeight.value || mergedAutoHeight.value || isSticky.value || hasEllipsis.value || props.virtual) {
      return 'fixed'
    }
    return 'auto'
  })
}
