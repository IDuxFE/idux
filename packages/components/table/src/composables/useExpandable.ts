/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'

import { type TableColumnMerged, type TableColumnMergedExpandable } from './useColumns'
import { type MergedData } from './useDataSource'
import { type TableProps } from '../types'

export interface ExpandableContext {
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>
  expandedRowKeys: ComputedRef<VKey[]>
  setExpandedRowKeys: (value: VKey[]) => void
  checkExpandDisabled: (data: MergedData) => boolean
  handleExpandChange: (key: VKey) => void
  setRowExpanded: (key: VKey, expanded: boolean) => void
}

export function useExpandable(
  props: TableProps,
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  getRecord: (key: VKey) => unknown | undefined,
): ExpandableContext {
  const expandable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'expandable'),
  ) as ComputedRef<TableColumnMergedExpandable | undefined>

  const [expandedRowKeys, setExpandedRowKeys] = useControlledProp(props, 'expandedRowKeys', () => [])

  const handleExpandChange = (key: VKey) => {
    setRowExpanded(key, !(expandedRowKeys.value.indexOf(key) >= 0))
  }

  const setRowExpanded = (key: VKey, expanded: boolean) => {
    const tempKeys = [...expandedRowKeys.value]
    const currentExpanded = tempKeys.includes(key)
    if (currentExpanded === expanded) {
      return
    }

    const index = tempKeys.indexOf(key)

    if (expanded) {
      tempKeys.push(key)
    } else {
      tempKeys.splice(index, 1)
    }

    const record = getRecord(key)

    const { onChange, onExpand } = expandable.value || {}
    callEmit(onExpand, expanded, record)
    setExpandedRowKeys(tempKeys)
    callEmit(onChange, tempKeys)
  }

  const checkExpandDisabled = (data: MergedData) => {
    if (!expandable.value) {
      return true
    }

    const { disabled, customExpand } = expandable.value
    const { record } = data

    if (disabled?.(record)) {
      return true
    }

    return !(customExpand || (data.children && data.children.length > 0))
  }

  return { expandable, expandedRowKeys, setExpandedRowKeys, checkExpandDisabled, setRowExpanded, handleExpandChange }
}
