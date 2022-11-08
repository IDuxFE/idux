/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, normalizeClass } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../token'

export default defineComponent({
  props: { isFixedHolder: Boolean },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      columnWidths,
      columnWidthsWithScrollBar,
      mergedSelectableMenus,
      mergedPrefixCls,
    } = inject(TABLE_TOKEN)!

    return () => {
      const { isFixedHolder } = props
      const columns = isFixedHolder ? flattedColumnsWithScrollBar.value : flattedColumns.value
      if (!columns.some(column => !!column.width || 'type' in column)) {
        return
      }

      const prefixCls = mergedPrefixCls.value
      const widths = isFixedHolder ? columnWidthsWithScrollBar.value : columnWidths.value
      const children = columns.map((column, colIndex) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { key, type } = column
        // resizable：对于固定表头，widths[colIndex] 的优先级高于 column.width， 其他情况则相反。
        const mergedWidth = isFixedHolder ? widths[colIndex] ?? column.width : column.width ?? widths[colIndex]
        const className = normalizeClass({
          [`${prefixCls}-col-${type}`]: !!type,
          [`${prefixCls}-selectable-with-dropdown`]: type === 'selectable' && mergedSelectableMenus.value.length > 0,
        })

        const style = mergedWidth ? { width: convertCssPixel(mergedWidth) } : undefined
        return <col key={key} class={className} style={style}></col>
      })

      return <colgroup>{children}</colgroup>
    }
  },
})
