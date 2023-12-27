/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollEnabled } from '@idux/cdk/scroll'

import { type ComputedRef, computed } from 'vue'

import { type ColumnsContext } from './useColumns'
import { type ScrollContext } from './useScroll'
import { type TableProps } from '../types'

export function useTableLayout(
  props: TableProps,
  { hasEllipsis, hasFixed }: ColumnsContext,
  { scrollWidth, scrollHeight }: ScrollContext,
  isSticky: ComputedRef<boolean>,
  mergedVirtual: ComputedRef<VirtualScrollEnabled>,
  mergedAutoHeight: ComputedRef<boolean>,
): ComputedRef<'auto' | 'fixed'> {
  return computed(() => {
    if (props.tableLayout) {
      return props.tableLayout
    }
    if (scrollWidth.value && hasFixed.value) {
      return scrollWidth.value === 'max-content' ? 'auto' : 'fixed'
    }
    if (
      scrollHeight.value ||
      mergedAutoHeight.value ||
      isSticky.value ||
      hasEllipsis.value ||
      mergedVirtual.value.horizontal ||
      mergedVirtual.value.vertical
    ) {
      return 'fixed'
    }
    return 'auto'
  })
}
