import type { ComputedRef, Ref } from 'vue'
import type { TableColumnExpandable, TableProps } from '../types'
import type { TableColumnExpandableMerged, TableColumnFlatted } from './useColumns'

import { computed, ref, watchEffect } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export interface ExpandableContext {
  expandable: ComputedRef<TableColumnExpandable | undefined>
  expandedRowKeys: Ref<(string | number)[]>
  handleExpandChange: (key: string | number, record: unknown) => void
}

export function useExpandable(props: TableProps, flattedColumns: ComputedRef<TableColumnFlatted[]>): ExpandableContext {
  const expandable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'expandable'),
  ) as ComputedRef<TableColumnExpandableMerged>

  const noop: (string | number)[] = []
  const expandedRowKeys = ref(noop)
  watchEffect(() => {
    expandedRowKeys.value = props.expandedRowKeys || noop
  })

  const handleExpandChange = (key: string | number, record: unknown) => {
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
