/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */
import type { TableColumnMerged } from '../composables/useColumns'

import { type PropType, computed, defineComponent, inject, normalizeClass } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../token'

export default defineComponent({
  props: { isFixedHolder: Boolean, columns: Array as PropType<TableColumnMerged[]> },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      measuredColumnWidthMap,
      mergedSelectableMenus,
      mergedPrefixCls,
    } = inject(TABLE_TOKEN)!

    const resolvedColumns = computed(() => {
      const { isFixedHolder, columns } = props
      if (!columns) {
        return isFixedHolder ? flattedColumnsWithScrollBar.value : flattedColumns.value
      }

      return columns
    })

    return () => {
      // 所有列的宽度都不存在且没有特殊列的时候，跳过渲染
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (resolvedColumns.value.every(column => !column.width && !column.type)) {
        return
      }

      const prefixCls = mergedPrefixCls.value
      const children = resolvedColumns.value.map(column => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { key, type } = column
        const mergedWidth = props.isFixedHolder ? (measuredColumnWidthMap.value[key] ?? column.width) : column.width
        const className = type
          ? normalizeClass({
              [`${prefixCls}-col-${type}`]: true,
              [`${prefixCls}-col-with-dropdown`]: type === 'selectable' && mergedSelectableMenus.value.length > 0,
            })
          : undefined
        const style = {
          width: convertCssPixel(mergedWidth),
          // for proTable: resizable, minWidth and maxWidth
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          minWidth: convertCssPixel(column.minWidth),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          maxWidth: convertCssPixel(column.maxWidth),
        }
        return <col key={key} class={className} style={style}></col>
      })

      return <colgroup>{children}</colgroup>
    }
  },
})
