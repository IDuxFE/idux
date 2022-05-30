/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, normalizeClass } from 'vue'

import { proTableToken } from '../token'
import { type ProTableColumn } from '../types'
import LayoutToolTree from './LayoutToolTree'

export default defineComponent({
  setup() {
    const { locale, mergedPrefixCls, mergedColumns, setMergedColumns } = inject(proTableToken)!

    return () => {
      const { startColumns, centerColumns, endColumns } = groupColumns(mergedColumns.value)

      const hasStartFixed = startColumns.length > 0
      const hasEndFixed = endColumns.length > 0
      const withFixed = hasStartFixed || hasEndFixed

      const prefixCls = `${mergedPrefixCls.value}-layout-tool-content`
      const classes = normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-with-fixed`]: withFixed,
      })
      const { startPinTitle, noPinTitle, endPinTitle } = locale.table.layout
      const handleDrop = (key: 'start' | 'center' | 'end', columns: ProTableColumn[]) => {
        if (key === 'start') {
          setMergedColumns([...columns, ...centerColumns, ...endColumns])
        } else if (key === 'center') {
          setMergedColumns([...startColumns, ...columns, ...endColumns])
        } else {
          setMergedColumns([...startColumns, ...centerColumns, ...columns])
        }
      }

      const handleFixedChange = () => {
        const { startColumns, centerColumns, endColumns } = groupColumns(mergedColumns.value)
        setMergedColumns([...startColumns, ...centerColumns, ...endColumns])
      }

      return (
        <div class={classes}>
          {hasStartFixed && (
            <LayoutToolTree
              key="start"
              columns={startColumns}
              title={startPinTitle}
              onDrop={handleDrop}
              onFixedChange={handleFixedChange}
            />
          )}
          {(!withFixed || centerColumns.length > 0) && (
            <LayoutToolTree
              key="center"
              columns={centerColumns}
              title={withFixed ? noPinTitle : undefined}
              onDrop={handleDrop}
              onFixedChange={handleFixedChange}
            />
          )}
          {hasEndFixed && (
            <LayoutToolTree
              key="end"
              columns={endColumns}
              title={endPinTitle}
              onDrop={handleDrop}
              onFixedChange={handleFixedChange}
            />
          )}
        </div>
      )
    }
  },
})
function groupColumns(mergedColumns: ProTableColumn[]) {
  const startColumns: ProTableColumn[] = []
  const endColumns: ProTableColumn[] = []
  const centerColumns: ProTableColumn[] = []

  mergedColumns.forEach(column => {
    const { fixed } = column
    if (fixed === 'start') {
      startColumns.push(column)
    } else if (fixed === 'end') {
      endColumns.push(column)
    } else {
      centerColumns.push(column)
    }
  })

  return { startColumns, endColumns, centerColumns }
}
