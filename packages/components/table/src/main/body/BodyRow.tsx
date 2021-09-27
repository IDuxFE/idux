import type { ComputedRef, Slots, VNodeTypes } from 'vue'
import type { Key, TableBodyRowProps, TableColumnExpandable, TableProps } from '../../types'
import type {
  TableColumnMerged,
  TableColumnMergedExpandable,
  TableColumnMergedSelectable,
} from '../../composables/useColumns'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { TABLE_TOKEN } from '../../token'
import { tableBodyRowProps } from '../../types'
import BodyCell from './BodyCell'
import BodyRowSingle from './BodyRowSingle'

export default defineComponent({
  props: tableBodyRowProps,
  setup(props) {
    const {
      props: tableProps,
      slots,
      flattedColumns,
      expandable,
      handleExpandChange,
      selectable,
      selectedRowKeys,
      indeterminateRowKeys,
      handleSelectChange,
      currentPageRowKeys,
      bodyRowTag,
    } = inject(TABLE_TOKEN)!

    const { expendDisabled, handleExpend, selectDisabled, handleSelect, clickEvents } = useEvents(
      props,
      tableProps,
      expandable,
      handleExpandChange,
      selectable,
      handleSelectChange,
      currentPageRowKeys,
    )

    const isSelected = computed(() => selectedRowKeys.value.includes(props.rowKey))
    const isIndeterminate = computed(() => indeterminateRowKeys.value.includes(props.rowKey))

    const classes = useClasses(props, tableProps, isSelected)
    return () => {
      const children = renderChildren(
        props,
        flattedColumns,
        expendDisabled,
        handleExpend,
        isSelected,
        isIndeterminate,
        selectDisabled,
        handleSelect,
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyRowTag = bodyRowTag.value as any
      const nodes = [
        <BodyRowTag class={classes.value} {...clickEvents.value}>
          {children}
        </BodyRowTag>,
      ]

      if (props.expanded) {
        const expandedContext = renderExpandedContext(props, slots, expandable.value)
        expandedContext && nodes.push(expandedContext)
      }
      return nodes
    }
  },
})

function useClasses(props: TableBodyRowProps, tableProps: TableProps, isSelected: ComputedRef<boolean>) {
  const rowClassName = computed(() => tableProps.rowClassName?.(props.record, props.rowIndex))
  return computed(() => {
    const prefixCls = 'ix-table-row'
    const { level, expanded } = props
    const computeRowClassName = rowClassName.value
    return {
      [`${prefixCls}-level-${level}`]: level > 0,
      [`${prefixCls}-selected`]: isSelected.value,
      [`${prefixCls}-expanded`]: expanded,
      [computeRowClassName as string]: !!computeRowClassName,
    }
  })
}

function useEvents(
  props: TableBodyRowProps,
  tableProps: TableProps,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
  handleExpandChange: (key: Key, record: unknown) => void,
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  handleSelectChange: (key: Key, record: unknown) => void,
  currentPageRowKeys: ComputedRef<{ enabledRowKeys: Key[]; disabledRowKeys: Key[] }>,
) {
  const expendDisabled = useExpandDisabled(props, tableProps, expandable)
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
    if (expendTrigger.value === 'click' && !expendDisabled.value) {
      handleExpend()
    }
    if (selectTrigger.value === 'click' && !selectDisabled.value) {
      handleSelect()
    }
  }

  const handleDblclick = () => {
    if (expendTrigger.value === 'dblclick' && !expendDisabled.value) {
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

  return { expendDisabled, handleExpend, selectDisabled, handleSelect, clickEvents }
}

function useExpandDisabled(
  props: TableBodyRowProps,
  tableProps: TableProps,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
) {
  return computed(() => {
    const column = expandable.value
    if (!column) {
      return true
    }
    const { disabled, customExpand } = column
    const { record, rowIndex } = props
    if (disabled?.(record, rowIndex)) {
      return true
    }
    return !(customExpand || record[tableProps.childrenKey]?.length > 0)
  })
}

function renderChildren(
  props: TableBodyRowProps,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  expendDisabled: ComputedRef<boolean>,
  handleExpend: () => void,
  isSelected: ComputedRef<boolean>,
  isIndeterminate: ComputedRef<boolean>,
  selectDisabled: ComputedRef<boolean>,
  handleSelect: () => void,
) {
  const children: VNodeTypes[] = []
  const { rowIndex, record } = props
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
      key,
    }
    if (type === 'expandable') {
      colProps.expanded = props.expanded
      colProps.disabled = expendDisabled.value
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

function renderExpandedContext(props: TableBodyRowProps, slots: Slots, expandable: TableColumnExpandable | undefined) {
  const { customExpand } = expandable || {}
  const { record, rowIndex } = props
  let expandedContext: VNodeTypes | null = null
  if (isFunction(customExpand)) {
    expandedContext = customExpand({ record, rowIndex })
  } else if (isString(customExpand) && slots[customExpand]) {
    expandedContext = slots[customExpand]!({ record, rowIndex })
  }
  return expandedContext ? <BodyRowSingle>{expandedContext}</BodyRowSingle> : null
}
