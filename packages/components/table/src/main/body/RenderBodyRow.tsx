/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMergedExpandable } from '../../composables/useColumns'
import type { FlattedData } from '../../composables/useDataSource'
import type { TableBodyRowProps, TableColumnExpandable } from '../../types'
import type { Slots, VNodeChild, VNodeTypes } from 'vue'

import { isFunction, isString } from 'lodash-es'

import BodyRow from './BodyRow'
import BodyRowSingle from './BodyRowSingle'

export function renderBodyRow(
  item: FlattedData,
  rowIndex: number,
  slots: Slots,
  expandable: TableColumnMergedExpandable | undefined,
): VNodeTypes[] {
  const nodes: VNodeTypes[] = []
  const { expanded, level, record, rowKey } = item
  const rowProps = { key: rowKey, expanded, level, record, rowData: item, rowIndex, rowKey }
  nodes.push(<BodyRow {...rowProps} />)

  if (expanded) {
    const expandedContext = renderExpandedContext(rowProps, slots, expandable)
    expandedContext && nodes.push(expandedContext)
  }

  return nodes
}

function renderExpandedContext(props: TableBodyRowProps, slots: Slots, expandable: TableColumnExpandable | undefined) {
  const { customExpand } = expandable || {}
  const { record, rowIndex } = props
  let expandedContext: VNodeChild
  if (isFunction(customExpand)) {
    expandedContext = customExpand({ record, rowIndex })
  } else if (isString(customExpand) && slots[customExpand]) {
    expandedContext = slots[customExpand]!({ record, rowIndex })
  }
  return expandedContext && <BodyRowSingle>{expandedContext}</BodyRowSingle>
}
