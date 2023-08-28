/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, Ref, type VNodeTypes, computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import BodyCell from './BodyCell'
import {
  type TableColumnMerged,
  type TableColumnMergedExpandable,
  type TableColumnMergedSelectable,
} from '../../composables/useColumns'
import { FlattedData } from '../../composables/useDataSource'
import { TABLE_TOKEN } from '../../token'
import { type TableBodyRowProps, tableBodyRowProps } from '../../types'

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

    const { expandDisabled, handleExpend, selectDisabled, handleSelect, isHover, attrs } = useEvents(
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

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-row`
      const { level, expanded } = props

      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-level-${level}`]: !!level,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-expanded`]: expanded,
      })
    })

    return () => {
      const customAdditionalFn = tableProps.customAdditional?.bodyRow
      const customAdditional = customAdditionalFn
        ? customAdditionalFn({ record: props.record, rowIndex: props.rowIndex })
        : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (tableProps.customTag?.bodyRow ?? 'tr') as any

      return (
        <Tag class={classes.value} {...attrs.value} {...customAdditional}>
          {renderChildren(
            props,
            flattedColumns,
            expandDisabled,
            handleExpend,
            isSelected,
            isIndeterminate,
            selectDisabled,
            handleSelect,
            isHover,
          )}
        </Tag>
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
  const showIndex = computed(() => selectable.value?.showIndex)
  const isHover = ref(false)
  const handleSelect = () => {
    const { rowKey, record } = props
    handleSelectChange(rowKey, record)
  }

  const handleClick = () => {
    expendTrigger.value === 'click' && handleExpend()
    selectTrigger.value === 'click' && handleSelect()
  }

  const handleDblclick = () => {
    expendTrigger.value === 'dblclick' && handleExpend()
    selectTrigger.value === 'dblclick' && handleSelect()
  }

  const handleMouseenter = () => (isHover.value = true)
  const handleMouseleave = () => (isHover.value = false)

  const attrs = computed(() => {
    const _expandDisabled = expandDisabled.value
    const _expendTrigger = expendTrigger.value
    const _selectDisabled = selectDisabled.value
    const _selectTrigger = selectTrigger.value

    const clickEnabled =
      (!_expandDisabled && _expendTrigger === 'click') || (!_selectDisabled && _selectTrigger === 'click')
    const dblclickEnabled =
      (!_expandDisabled && _expendTrigger === 'dblclick') || (!_selectDisabled && _selectTrigger === 'dblclick')
    const mouseEnabled = !_selectDisabled && showIndex.value

    let cursor = ''
    if (clickEnabled || dblclickEnabled) {
      cursor = 'pointer'
    } else if ((_expandDisabled && _expendTrigger) || (_selectDisabled && _selectTrigger)) {
      cursor = 'not-allowed'
    }

    return {
      style: cursor ? `cursor: ${cursor}` : undefined,
      onClick: clickEnabled ? handleClick : undefined,
      onDblclick: dblclickEnabled ? handleDblclick : undefined,
      onMouseenter: mouseEnabled ? handleMouseenter : undefined,
      onMouseleave: mouseEnabled ? handleMouseleave : undefined,
    }
  })

  return { expandDisabled, handleExpend, selectDisabled, handleSelect, isHover, attrs }
}

function renderChildren(
  props: TableBodyRowProps,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  expandDisabled: ComputedRef<boolean>,
  handleExpend: () => void,
  isSelected: ComputedRef<boolean>,
  isIndeterminate: ComputedRef<boolean>,
  selectDisabled: ComputedRef<boolean>,
  handleSelect: () => void,
  isHover: Ref<boolean>,
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
      colProps.disabled = expandDisabled.value
      colProps.handleExpend = handleExpend
    } else if (type === 'selectable') {
      colProps.selected = isSelected.value
      colProps.indeterminate = isIndeterminate.value
      colProps.disabled = selectDisabled.value
      colProps.handleSelect = handleSelect
      colProps.isHover = isHover.value
    }
    children.push(<BodyCell {...colProps}></BodyCell>)
  })

  return children
}
