/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'

import { type TableProps } from '../types'
import { type TableColumnMerged, type TableColumnMergedExpandable } from './useColumns'
import { type MergedData } from './useDataSource'

export function useExpandable(props: TableProps, flattedColumns: ComputedRef<TableColumnMerged[]>): ExpandableContext {
  const expandable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'expandable'),
  ) as ComputedRef<TableColumnMergedExpandable | undefined>

  const [expandedRowKeys, setExpandedRowKeys] = useControlledProp(props, 'expandedRowKeys', () => [])

  const handleExpandChange = (key: VKey, record: unknown) => {
    const { onChange, onExpand } = expandable.value || {}
    const tempKeys = [...expandedRowKeys.value]
    const index = tempKeys.indexOf(key)
    const expanded = index >= 0
    if (expanded) {
      tempKeys.splice(index, 1)
    } else {
      tempKeys.push(key)
    }
    callEmit(onExpand, !expanded, record)
    setExpandedRowKeys(tempKeys)
    callEmit(onChange, tempKeys)
  }

  const checkExpandDisabled = (data: MergedData) => {
    if (!expandable.value) {
      return true
    }

    /**
     * @deprecated customExpand
     */
    const { disabled, customExpand, slots } = expandable.value
    const { record } = data

    if (disabled?.(record)) {
      return true
    }

    return !(customExpand || slots?.expand || (data.children && data.children.length > 0))
  }

  return { expandable, expandedRowKeys, setExpandedRowKeys, checkExpandDisabled, handleExpandChange }
}

export interface ExpandableContext {
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>
  expandedRowKeys: ComputedRef<VKey[]>
  setExpandedRowKeys: (value: VKey[]) => void
  checkExpandDisabled: (data: MergedData) => boolean
  handleExpandChange: (key: VKey, record: unknown) => void
}
