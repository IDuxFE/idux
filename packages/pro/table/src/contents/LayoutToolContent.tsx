/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { isObject } from 'lodash-es'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'

import LayoutToolTree from './LayoutToolTree'
import { proTableToken } from '../token'
import { type ProTableColumn, proTableLayoutToolProps } from '../types'

export default defineComponent({
  props: proTableLayoutToolProps,
  setup(props) {
    const {
      props: tableProps,
      config,
      locale,
      mergedPrefixCls,
      mergedColumns,
      setMergedColumns,
      mergedColumnMap,
      resetColumns,
    } = inject(proTableToken)!

    // 判断是否有子节点，处理tree展开节点样式
    const hasChildren = computed(() => mergedColumns.value.length !== mergedColumnMap.value.size)

    // 只需要判断第一层的即可
    const hiddenColumns = computed(() => mergedColumns.value.filter(column => column.visible === false))

    const mergedSearchable = computed(
      () =>
        props.searchable ??
        (isObject(tableProps.layoutTool) ? tableProps.layoutTool.searchable : config.layoutTool.searchable),
    )
    const [searchValue, setSearchValue] = useControlledProp(props, 'searchValue')

    const handleInput = (evt: Event) => {
      const inputValue = (evt.target as HTMLInputElement).value
      setSearchValue(inputValue)
    }

    const handleCheckAll = (checked: boolean) => {
      loopColumns(mergedColumns.value, column => {
        // undefined or true
        if (column.changeVisible !== false) {
          column.visible = checked
        }
      })
      handleFixedChange()
    }

    const handleFixedChange = () => {
      const { startColumns, centerColumns, endColumns } = groupColumns(mergedColumns.value)
      setMergedColumns([...startColumns, ...centerColumns, ...endColumns])
    }

    const handleVisibleChange = () => {
      setMergedColumns([...mergedColumns.value])
    }

    return () => {
      const { startColumns, centerColumns, endColumns } = groupColumns(mergedColumns.value)

      const hasStartFixed = startColumns.length > 0
      const hasEndFixed = endColumns.length > 0
      const withFixed = hasStartFixed || hasEndFixed

      const prefixCls = `${mergedPrefixCls.value}-layout-tool`
      const classes = normalizeClass({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-with-fixed`]: withFixed,
        [`${prefixCls}-with-children`]: hasChildren.value,
      })

      const { placeholder, all, reset, startPinTitle, noPinTitle, endPinTitle } = locale.table.layout
      const handleDrop = (key: 'start' | 'center' | 'end', columns: ProTableColumn[]) => {
        if (key === 'start') {
          setMergedColumns([...columns, ...centerColumns, ...endColumns])
        } else if (key === 'center') {
          setMergedColumns([...startColumns, ...columns, ...endColumns])
        } else {
          setMergedColumns([...startColumns, ...centerColumns, ...columns])
        }
      }

      const settingLength = mergedColumns.value.length
      const hiddenLength = hiddenColumns.value.length
      const checked = hiddenLength === 0 && settingLength !== 0
      const indeterminate = hiddenLength > 0 && hiddenLength !== settingLength
      const _searchValue = searchValue.value
      return (
        <div class={classes}>
          {mergedSearchable.value && (
            <div class={`${prefixCls}-search-wrapper`}>
              <ɵInput
                placeholder={props.placeholder ?? placeholder}
                size="sm"
                suffix="search"
                value={_searchValue}
                onInput={handleInput}
              />
            </div>
          )}
          <div class={`${prefixCls}-select-wrapper`}>
            <IxCheckbox checked={checked} indeterminate={indeterminate} label={all} onChange={handleCheckAll} />
            <IxButton size="sm" mode="link" onClick={resetColumns}>
              {reset}
            </IxButton>
          </div>
          <div class={`${prefixCls}-tree-wrapper`}>
            {hasStartFixed && (
              <LayoutToolTree
                key="start"
                columns={startColumns}
                searchValue={_searchValue}
                title={startPinTitle}
                onDrop={handleDrop}
                onFixedChange={handleFixedChange}
                onVisibleChange={handleVisibleChange}
              />
            )}
            {(!withFixed || centerColumns.length > 0) && (
              <LayoutToolTree
                key="center"
                columns={centerColumns}
                searchValue={_searchValue}
                title={withFixed ? noPinTitle : undefined}
                onDrop={handleDrop}
                onFixedChange={handleFixedChange}
                onVisibleChange={handleVisibleChange}
              />
            )}
            {hasEndFixed && (
              <LayoutToolTree
                key="end"
                columns={endColumns}
                searchValue={_searchValue}
                title={endPinTitle}
                onDrop={handleDrop}
                onFixedChange={handleFixedChange}
                onVisibleChange={handleVisibleChange}
              />
            )}
          </div>
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

function loopColumns(columns: ProTableColumn[] | undefined, cb: (column: ProTableColumn) => void) {
  if (!columns || columns.length === 0) {
    return
  }
  columns.forEach(column => {
    cb(column)
    if ('children' in column) {
      loopColumns(column.children!, cb)
    }
  })
}
