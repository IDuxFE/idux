/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from '../../composables/useColumns'

import { type PropType, type VNodeChild, computed, defineComponent, inject } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  props: { columns: Array as PropType<TableColumnMerged[]>, isEmpty: Boolean },
  setup(props, { slots }) {
    const { clientWidth, mergedPrefixCls, hasFixed, scrollHorizontalOverflowed, scrollBarColumn } = inject(TABLE_TOKEN)!
    const columnCount = computed(() => props.columns?.length ?? 1)
    return () => {
      let children: VNodeChild = slots.default!()

      if (props.isEmpty ? scrollHorizontalOverflowed.value : hasFixed.value) {
        const scrollBar = scrollBarColumn.value
        children = (
          <div
            class={`${mergedPrefixCls.value}-fixed-row`}
            style={{
              width: convertCssPixel(clientWidth.value - (scrollBar ? scrollBar.width : 0)),
              position: 'sticky',
              left: 0,
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        )
      }
      return (
        <tr>
          <td colspan={columnCount.value}>{children}</td>
        </tr>
      )
    }
  },
})
