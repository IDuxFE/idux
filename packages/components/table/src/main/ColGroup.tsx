/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import { defineComponent, inject, normalizeClass } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../token'

export default defineComponent({
  props: { isFixedHolder: Boolean },
  setup(props) {
    const {
      flattedColumns,
      flattedColumnsWithScrollBar,
      columnWidthsWithScrollBar,
      mergedSelectableMenus,
      mergedPrefixCls,
    } = inject(TABLE_TOKEN)!

    return () => {
      const { isFixedHolder } = props
      const columns = isFixedHolder ? flattedColumnsWithScrollBar.value : flattedColumns.value

      // 所有列的宽度都不存在且没有特殊列的时候，跳过渲染
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (columns.every(column => !column.width && !column.type)) {
        return
      }

      const prefixCls = mergedPrefixCls.value
      const children = columns.map((column, colIndex) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { key, type } = column
        const mergedWidth = isFixedHolder ? columnWidthsWithScrollBar.value[colIndex] : column.width
        const className = type
          ? normalizeClass({
              [`${prefixCls}-col-${type}`]: true,
              [`${prefixCls}-col-with-dropdown`]: type === 'selectable' && mergedSelectableMenus.value.length > 0,
            })
          : undefined
        const style = mergedWidth ? `width: ${convertCssPixel(mergedWidth)}` : undefined
        return <col key={key} class={className} style={style}></col>
      })

      return <colgroup>{children}</colgroup>
    }
  },
})
