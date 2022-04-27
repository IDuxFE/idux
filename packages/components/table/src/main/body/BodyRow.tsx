/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type VNodeTypes, computed, defineComponent, inject, normalizeClass } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import {
  type TableColumnMerged,
  type TableColumnMergedExpandable,
  type TableColumnMergedSelectable,
} from '../../composables/useColumns'
import { FlattedData } from '../../composables/useDataSource'
import { TABLE_TOKEN } from '../../token'
import { type TableBodyRowProps, tableBodyRowProps } from '../../types'
import BodyCell from './BodyCell'

export default defineComponent({
  props: tableBodyRowProps,
  setup(props) {
    const {
      props: tableProps,
      mergedPrefixCls,
      flattedColumns,
      expandable,
      handleExpandChange,
      checkExpandDisabled,
      selectable,
      selectedRowKeys,
      indeterminateRowKeys,
      handleSelectChange,
      currentPageRowKeys,
    } = inject(TABLE_TOKEN)!

    const { expandDisabled, handleExpend, selectDisabled, handleSelect, clickEvents } = useEvents(
      props,
      expandable,
      checkExpandDisabled,
      handleExpandChange,
      selectable,
      handleSelectChange,
      currentPageRowKeys,
    )

    const isSelected = computed(() => selectedRowKeys.value.includes(props.rowKey))
    const isIndeterminate = computed(() => indeterminateRowKeys.value.includes(props.rowKey))

    const rowClassName = computed(() =>
      tableProps.rowClassName ? tableProps.rowClassName(props.record, props.rowIndex) : undefined,
    )
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-row`
      const { level, expanded } = props
      const computeRowClassName = rowClassName.value
      return normalizeClass({
        [`${prefixCls}-level-${level}`]: !!level,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-expanded`]: expanded,
        [computeRowClassName as string]: !!computeRowClassName,
      })
    })

    return () => {
      const customAdditionalFn = tableProps.customAdditional?.bodyRow
      const customAdditional = customAdditionalFn
        ? customAdditionalFn({ record: props.record, rowIndex: props.rowIndex })
        : undefined

      return (
        <tr class={classes.value} {...clickEvents.value} {...customAdditional}>
          {renderChildren(
            props,
            flattedColumns,
            expandDisabled.value,
            handleExpend,
            isSelected,
            isIndeterminate,
            selectDisabled,
            handleSelect,
          )}
        </tr>
      )
    }
  },
})

function useEvents(
  props: TableBodyRowProps,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
  checkExpandDisabled: (data: FlattedData) => boolean,
  handleExpandChange: (key: VKey, record: unknown) => void,
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  handleSelectChange: (key: VKey, record: unknown) => void,
  currentPageRowKeys: ComputedRef<{ enabledRowKeys: VKey[]; disabledRowKeys: VKey[] }>,
) {
  const expandDisabled = computed(() => checkExpandDisabled(props.rowData))
  const expendTrigger = computed(() => expandable.value?.trigger)
  const handleExpend = () => {
    const { rowKey, record } = props
    handleExpandChange(rowKey, record)
  }

  const selectDisabled = computed(() => currentPageRowKeys.value.disabledRowKeys.includes(props.rowKey))
  const selectTrigger = computed(() => selectable.value?.trigger)
  const handleSelect = () => {
    const { rowKey, record } = props
    handleSelectChange(rowKey, record)
  }

  const handleClick = () => {
    if (expendTrigger.value === 'click' && !expandDisabled.value) {
      handleExpend()
    }
    if (selectTrigger.value === 'click' && !selectDisabled.value) {
      handleSelect()
    }
  }

  const handleDblclick = () => {
    if (expendTrigger.value === 'dblclick' && !expandDisabled.value) {
      handleExpend()
    }
    if (selectTrigger.value === 'dblclick' && !selectDisabled.value) {
      handleSelect()
    }
  }

  const clickEvents = computed(() => {
    const onClick = expendTrigger.value === 'click' || selectTrigger.value === 'click' ? handleClick : undefined
    const onDblclick =
      expendTrigger.value === 'dblclick' || selectTrigger.value === 'dblclick' ? handleDblclick : undefined
    return { onClick, onDblclick }
  })

  return { expandDisabled, handleExpend, selectDisabled, handleSelect, clickEvents }
}

function renderChildren(
  props: TableBodyRowProps,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  expandDisabled: boolean,
  handleExpend: () => void,
  isSelected: ComputedRef<boolean>,
  isIndeterminate: ComputedRef<boolean>,
  selectDisabled: ComputedRef<boolean>,
  handleSelect: () => void,
) {
  const children: VNodeTypes[] = []
  const { rowIndex, record, level } = props
  flattedColumns.value.forEach((column, colIndex) => {
    const { type, colSpan: getColSpan, rowSpan: getRowSpan, key } = column
    const colSpan = getColSpan?.(record, rowIndex)
    const rowSpan = getRowSpan?.(record, rowIndex)
    if (colSpan === 0 || rowSpan === 0) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const colProps: any = {
      colSpan: colSpan === 1 ? undefined : colSpan,
      rowSpan: rowSpan === 1 ? undefined : rowSpan,
      rowIndex,
      colIndex,
      record,
      column,
      level,
      key,
    }
    if (type === 'expandable') {
      colProps.expanded = props.expanded
      colProps.disabled = expandDisabled
      colProps.handleExpend = handleExpend
    } else if (type === 'selectable') {
      colProps.selected = isSelected.value
      colProps.indeterminate = isIndeterminate.value
      colProps.disabled = selectDisabled.value
      colProps.handleSelect = handleSelect
    }
    children.push(<BodyCell {...colProps}></BodyCell>)
  })

  return children
}
