import type { ComputedRef, Slots, VNodeTypes } from 'vue'
import type { Key, TableBodyRowProps, TableColumnExpandable, TableProps } from '../../types'
import type {
  TableColumnMergedBase,
  TableColumnMergedExpandable,
  TableColumnMerged,
  TableColumnMergedSelectable,
} from '../../composables/useColumns'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { tableToken } from '../../token'
import { tableBodyRowProps } from '../../types'
import BodyCol from './BodyCol'
import BodyRowSingle from './BodyRowSingle'
import BodyColExpandable from './BodyColExpandable'
import BodyCollSelectable from './BodyCollSelectable'

export default defineComponent({
  props: tableBodyRowProps,
  setup(props) {
    const {
      props: tableProps,
      slots,
      expandable,
      handleExpandChange,
      selectable,
      handleSelectChange,
      currentPageRowKeys,
      bodyRowTag,
    } = inject(tableToken)!

    const classes = useClasses(props, tableProps)
    const { expendDisabled, handleExpend, selectDisabled, handleSelect, clickEvents } = useEvents(
      props,
      expandable,
      handleExpandChange,
      selectable,
      handleSelectChange,
      currentPageRowKeys,
    )

    return () => {
      const children = renderChildren(props, expendDisabled, handleExpend, selectDisabled, handleSelect)

      const BodyRowTag = bodyRowTag.value as any
      const nodes = [
        <BodyRowTag class={classes.value} {...clickEvents.value}>
          {children}
        </BodyRowTag>,
      ]

      if (props.expanded) {
        const expandedContext = renderExpandedContext(expandable.value, props, slots)
        expandedContext && nodes.push(expandedContext)
      }
      return nodes
    }
  },
})

function useClasses(props: TableBodyRowProps, tableProps: TableProps) {
  const rowClassName = computed(() => tableProps.rowClassName?.(props.record, props.index))
  return computed(() => {
    const prefixCls = 'ix-table'
    const computeRowClassName = rowClassName.value
    const { level } = props
    return {
      [`${prefixCls}-level-${level}`]: level > 0,
      [computeRowClassName as string]: !!computeRowClassName,
    }
  })
}

function useEvents(
  props: TableBodyRowProps,
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>,
  handleExpandChange: (key: Key, record: unknown) => void,
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  handleSelectChange: (key: Key, record: unknown) => void,
  currentPageRowKeys: ComputedRef<{ enabledRowKeys: Key[]; disabledRowKeys: Key[] }>,
) {
  const expendDisabled = useExpandDisabled(props, expandable)
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

function useExpandDisabled(props: TableBodyRowProps, expandable: ComputedRef<TableColumnMergedExpandable | undefined>) {
  return computed(() => {
    const column = expandable.value
    if (!column) {
      return true
    }
    const { disabled, customExpand } = column
    const { record, index } = props
    if (disabled?.(record, index)) {
      return true
    }
    return !(customExpand || record[column.childrenKey]?.length > 0)
  })
}

function renderChildren(
  props: TableBodyRowProps,
  expendDisabled: ComputedRef<boolean>,
  handleExpend: () => void,
  selectDisabled: ComputedRef<boolean>,
  handleSelect: () => void,
) {
  const children: VNodeTypes[] = []
  const { columns, index, record } = props
  columns.forEach(column => {
    const colSpan = column.colSpan?.(record, index)
    const rowSpan = column.rowSpan?.(record, index)
    if (colSpan === 0 || rowSpan === 0) {
      return
    }
    if (column.type === 'expandable') {
      children.push(renderExpandCol(props, colSpan, rowSpan, expendDisabled.value, handleExpend))
    } else if (column.type === 'selectable') {
      children.push(renderSelectCol(props, colSpan, rowSpan, selectDisabled.value, handleSelect))
    } else {
      children.push(renderCol(props, column, colSpan, rowSpan))
    }
  })
  return children
}

function renderCol(
  props: TableBodyRowProps,
  column: TableColumnMergedBase,
  colSpan: number | undefined,
  rowSpan: number | undefined,
) {
  const { index, record } = props
  const colProps = {
    ...column,
    index,
    record,
    colSpan,
    rowSpan,
  }
  return <BodyCol {...colProps}></BodyCol>
}

function renderExpandCol(
  props: TableBodyRowProps,
  colSpan: number | undefined,
  rowSpan: number | undefined,
  disabled: boolean,
  handleExpend: () => void,
) {
  const { index, expanded, record, rowKey } = props
  const key = `${rowKey}-EXPAND`
  const colProps = { index, expanded, key, record, colSpan, rowSpan, handleExpend, disabled }
  return <BodyColExpandable {...colProps}></BodyColExpandable>
}

function renderExpandedContext(expandable: TableColumnExpandable | undefined, props: TableBodyRowProps, slots: Slots) {
  const { customExpand } = expandable || {}
  const { record, index } = props
  let expandedContext: VNodeTypes | null = null
  if (isFunction(customExpand)) {
    expandedContext = customExpand({ record, index })
  } else if (isString(customExpand) && slots[customExpand]) {
    expandedContext = slots[customExpand]!({ record, index })
  }
  return expandedContext ? <BodyRowSingle>{expandedContext}</BodyRowSingle> : null
}

function renderSelectCol(
  props: TableBodyRowProps,
  colSpan: number | undefined,
  rowSpan: number | undefined,
  disabled: boolean,
  handleSelect: () => void,
) {
  const { rowKey } = props
  const key = `${rowKey}-SELECT`
  const colProps = { key, colSpan, rowSpan, rowKey, disabled, handleSelect }
  return <BodyCollSelectable {...colProps}></BodyCollSelectable>
}
