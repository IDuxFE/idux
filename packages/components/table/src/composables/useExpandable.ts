import type { ComputedRef, Ref } from 'vue'
import type { Key, TableProps } from '../types'
import type { TableColumnMergedExpandable, TableColumnMerged } from './useColumns'

import { computed, ref, watch } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export function useExpandable(props: TableProps, flattedColumns: ComputedRef<TableColumnMerged[]>): ExpandableContext {
  const expandable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'expandable'),
  ) as ComputedRef<TableColumnMergedExpandable | undefined>

  const expandedRowKeys = ref(props.expandedRowKeys)
  watch(
    () => props.expandedRowKeys,
    value => (expandedRowKeys.value = value),
  )

  const handleExpandChange = (key: Key, record: unknown) => {
    const { onChange, onExpand } = expandable.value || {}
    const index = expandedRowKeys.value.indexOf(key)
    const expanded = index >= 0
    if (expanded) {
      expandedRowKeys.value.splice(index, 1)
    } else {
      expandedRowKeys.value.push(key)
    }
    callEmit(onExpand, expanded, record)
    callEmit(onChange, expandedRowKeys.value)
    callEmit(props['onUpdate:expandedRowKeys'], expandedRowKeys.value)
  }

  return { expandable, expandedRowKeys, handleExpandChange }
}

export interface ExpandableContext {
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>
  expandedRowKeys: Ref<Key[]>
  handleExpandChange: (key: Key, record: unknown) => void
}
